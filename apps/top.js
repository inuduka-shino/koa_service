/*eslint-env node */

import path from 'path';
import Koa from 'koa';
import Router from 'koa-router';
import ECT from 'ect';

const app = new Koa(),
      router = new Router();


const setTitle = (() => {
  const renderer = new ECT({
    watch: true,
    root : path.join(__dirname, '/views')
  });

  const data = {
    title : 'Hello, ECT World!'
  };

  router.get('/', (ctx) => {
    ctx.body = renderer.render('toppage.ect', data);
  });

  return (title) => {
    data.title = title;
  };
})();

app.use(router.routes());
app.use(router.allowedMethods());

export default {
   app,
   setTitle
 };
