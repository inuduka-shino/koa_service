/*eslint-env node */
/*eslint no-console: off*/

import http from 'http';
import https from 'https';
import fsp from './fs-promise.js';

import Koa from 'koa';
import mount from 'koa-mount';
import applist from './apps/applist.js';
import etag from 'koa-etag';
import conditionalGet from 'koa-conditional-get';


const app = new Koa();

// アクセスログ
app.use(async (ctx, next) => {
  const start = new Date();

  await next();

  const ms = new Date() - start;

  console.log(`${ctx.method} ${ctx.url} ${ctx.status} - ${ms}ms `);
});

// conditional-get
app.use(conditionalGet());

// add etags
app.use(etag());


// エラーハンドリング
// TODO: BOOMを使ってみる
app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    ctx.body = err.message;
    ctx.status = err.status || 500;
    console.log(err);
  }
});

// app mount
applist.forEach((appInfo) => {
  app.use(mount(appInfo.mountPoint, appInfo.koaApp));
});

function startWebServer(callback, port) {
  return new Promise((resolve) => {
    http.createServer(callback).listen(port, () => {
      resolve({port});
    });
  });
}

function startWebServerHttps(callback, port, opts) {
  return new Promise((resolve) => {
    https.createServer(opts, callback).listen(port, () => {
      resolve({port});
    });
  });
}
async function startSecWebServer(callback, port) {
  const [key,cert] = await Promise.all([
      fsp.readFilePromise('sec/server.key'),
      fsp.readFilePromise('sec/server.crt'),
    ]),
    info = await startWebServerHttps(
      callback,
      port,
      {
        key,
        cert,
      }
    );

  return info;
}

const os=require('os');

function getLocalIpAddressList() {
  const interfaces = os.networkInterfaces();
  const retList = [];

  Object.keys(interfaces).forEach((dev) => {
    const devDetails = interfaces[dev];

    devDetails.forEach((detail) => {
      // console.log(devDetail);
      if (detail.family === 'IPv4') {
          retList.push(detail.address);
      }
    });
  });

  return retList;
}

Promise.all([
  startWebServer(app.callback(), 3000),
  startSecWebServer(app.callback(), 3001)
]).then((infos) => {
    console.log(`start http service on ${infos[0].port} port.`);
    console.log(`start https service on ${infos[1].port} port.`);
    console.log('ip address');
    getLocalIpAddressList().forEach((ipAddress) => {
      console.log(ipAddress);
    });

  })
  .catch((err)=>{
    console.log('ERROR!!!');
    console.log(err);
  });
