/*eslint-env node */

const path = require('path'),
      Koa = require('koa'),
      Router = require('koa-router'),
      ECT = require('ect');

const app = new Koa(),
      router = new Router();


const setLinkList = (() => {
  const renderer = new ECT({
    watch: true,
    root : path.join(__dirname, '/views')
  });

  const data = {};

  router.get('/', (ctx) => {
    ctx.body = renderer.render('toppage.ect', data);
  });

  return (linkInfoList) => {
    data.toppageLinks = linkInfoList;
  };
})();

app.use(router.routes());
app.use(router.allowedMethods());

module.exports = {
   app,
   setLinkList
 };
