/*eslint-env node */

const path = require('path'),
      Koa = require('koa'),
      serv = require('koa-static');

const app = new Koa();

app.use(serv(path.join(__dirname, '/static'), {
  index: 'index.html',
  extensions: ['html']
}));

module.exports = app;
