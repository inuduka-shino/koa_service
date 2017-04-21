/*eslint-env node */
/*eslint no-console: off*/

import http from 'http';

import Koa from 'koa';
import mount from 'koa-mount';
import {router1, router2} from './apps/router.js';

//import appTop from './apps/top.js';
//import appTop2 from './apps/top2.js';

const app = new Koa(),
      appTop = new Koa(),
      appTop2 = new Koa();

// アクセスログ
app.use(async (ctx, next) => {
  const start = new Date();

  await next();

  const ms = new Date() - start;

  console.log(`${ctx.method} ${ctx.url} ${ctx.status} - ${ms}ms `);
});

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


// レスポンスを返す
appTop.use(router1.routes());
appTop.use(router1.allowedMethods());
appTop2.use(router2.routes());

app.use(mount('/', appTop));
app.use(mount('/app2', appTop2));

function startWebServer(callback, port) {
  return new Promise((resolve) => {
    http.createServer(callback).listen(port, () => {
      resolve({
        port
      });
    });
  });
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

startWebServer(app.callback(), 3000)
  .then((info) => {
    console.log(`start http service on ${info.port} port.`);

    console.log('ip address');
    getLocalIpAddressList().forEach((ipAddress) => {
      console.log(ipAddress);
    });

  })
  .catch((err)=>{
    console.log('ERROR!!!');
    console.log(err);
  });
