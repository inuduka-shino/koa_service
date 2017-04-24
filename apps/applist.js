/*eslint-env node */
import appTop from './top.js';

import Koa from 'koa';
import Router from 'koa-router';

const appTop2 = new Koa();
const router2 = new Router();

router2.get('/', (ctx) => {
  ctx.body = 'router2';
});

appTop2.use(router2.routes());

const linkList = [],
      mountList = [];

// TopPage
mountList.push({
  mountPoint: '/',
  koaApp: appTop.app,
});
linkList.push({
  link: '/',
  title: 'Top Page',
  comment: 'Top Page',
});
// dummyPage
mountList.push({
  mountPoint: '/test',
  koaApp: appTop2,
});
linkList.push({
  link: '/test',
  title: 'test',
  comment: 'test comment',
});


appTop.setLinkList(linkList);

export default mountList;
