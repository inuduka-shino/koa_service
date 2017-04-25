/*eslint-env node */

import path from 'path';
import Koa from 'koa';
import serv from 'koa-static';

const app = new Koa();

app.use(serv(path(__dirname, '/static')));
/*
app.use(serv(path(__dirname, '/static'), {
  index: 'index.html',
  extensions: ['html']
}));*/

export default app;
