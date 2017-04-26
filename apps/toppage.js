/*eslint-env node */

import path from 'path';
import Koa from 'koa';
import Router from 'koa-router';
import ECT from 'ect';

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

export default {
   app,
   setLinkList
 };
