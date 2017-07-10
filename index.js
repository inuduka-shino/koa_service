/*eslint-env node */
/*eslint no-console: off*/

const http = require('http'),
      https = require('https'),
      Koa = require('koa'),
      mount = require('koa-mount'),
      conditionalGet = require('koa-conditional-get'),
      //etag = require('koa-etag'),

      fsp = require('./fs-promise.js'),
      applist = require('./apps/applist.js');

const appPub = new Koa(),
      appSec= new Koa();

function startStopWatch() {
  const startTime = new Date();

  return {
    startTime,
    stop:()=>{
      return new Date() - startTime;
    }
  };
}

[appPub, appSec].forEach((app, idx)=>{
  // アクセスログ
  const type = ['http','https'];

  //eslint-disable-next-line max-statements
  app.use(async (ctx, next) => {
    const stopwatch = startStopWatch();
    let errInfo = null;
    const reqUrl = ctx.originalUrl;

    try {
      await next();
    } catch (err) {
      ctx.body = err.message;
      ctx.status = err.status || 500;
      errInfo = err;
    }
    //eslint-disable-next-line max-len
    console.log(`${stopwatch.startTime.toLocaleString()} ${type[idx]}:${ctx.method} ${reqUrl} ${ctx.status}(${ctx.message}) - ${stopwatch.stop()}ms `);

    if (errInfo) {
      console.log(errInfo);
    }
  });

  // conditional-get
  app.use(conditionalGet());
  // add etags
  //app.use(etag());
});

// app mount
applist.forEach((appInfo) => {
  if (!appInfo.SecOnly) {
    appPub.use(mount(appInfo.mountPoint, appInfo.koaApp));
  }
  appSec.use(mount(appInfo.mountPoint, appInfo.koaApp));
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
      fsp.readFilePromise('sec/server001/server.key'),
      fsp.readFilePromise('sec/server001/server.crt'),
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
  startWebServer(appPub.callback(), 3000),
  startSecWebServer(appSec.callback(), 3001)
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
