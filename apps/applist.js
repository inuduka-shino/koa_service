/*eslint-env node */

import path from 'path';
import Koa from 'koa';
import Router from 'koa-router';
import ECT from 'ect';

//const appList = [];

const appTop = new Koa(),
      appTop2 = new Koa();

const router1 = new Router(),
      router2 = new Router(),
      renderer = new ECT({
        watch: true,
        root : path.join(__dirname, '/views')
      }),
      data = {
        title : 'Hello, ECT World!'
      };

  router1.get('/', (ctx) => {
    ctx.body = renderer.render('toppage.ect', data);
  });
  router2.get('/', (ctx) => {
    ctx.body = 'router2';
  });


appTop.use(router1.routes());
appTop.use(router1.allowedMethods());
appTop2.use(router2.routes());

export default [
  {
    mountPoint: '/',
    koaApp: appTop,
    link: '/',
    title: 'Top Page',
    comment: 'Top Page',
  },
  {
    mountPoint: '/test',
    koaApp: appTop2,
    link: '/test',
    title: 'test',
    comment: 'test comment',
  },
];

//export default appList;
