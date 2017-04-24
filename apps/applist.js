/*eslint-env node */

import Koa from 'koa';
import Router from 'koa-router';

import appTop from './top.js';

//const appList = [];

const appTop2 = new Koa();

const router2 = new Router();

router2.get('/', (ctx) => {
  ctx.body = 'router2';
});

appTop2.use(router2.routes());

appTop.setTitle('xxxxx');

export default [
  {
    mountPoint: '/',
    koaApp: appTop.app,
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
