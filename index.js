/*eslint-env node */
'use strict';

import Koa from 'koa';
const app = new Koa();

// アクセスログ
app.use(async (ctx, next) => {
  const start = new Date;
  await next();
  const ms = new Date - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

// エラーハンドリング
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

app.listen(3000);
