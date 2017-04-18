/*eslint-env node */
/*eslint no-console: off*/
'use strict';

import Koa from 'koa';
import http from 'http';

const app = new Koa();

// アクセスログ
app.use(async (ctx, next) => {
  const start = new Date;
  await next();
  const ms = new Date - start;
  console.log(`${ctx.method} ${ctx.url} ${ctx.status} - ${ms}ms `);
});

// エラーハンドリング
// TODO: BOOMを使ってみる
app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    ctx.body = { message: err.message };
    ctx.status = err.status || 500;
    console.log(err);
  }
});

// レスポンスを返す
app.use(async (ctx, next) => {
  ctx.body = 'Hello world!';
});

//app.listen(3000);
let port = 3000;
http.createServer(app.callback()).listen(port, () => {
  console.log(`start http service on ${port} port.`);

  console.log('ip address');
  const os=require('os');
  const interfaces = os.networkInterfaces();

  for (let dev in interfaces) {
    const devDetails = interfaces[dev];

    devDetails.forEach((detail) => {
      // console.log(devDetail);
      if (detail.family === 'IPv4') {
          console.log(detail.address);
      }
    });
  }

});
