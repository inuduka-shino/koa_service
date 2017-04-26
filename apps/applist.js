/*eslint-env node */
import appTop from './toppage.js';
import appStatic from './staticlib.js';

import Koa from 'koa';
import Router from 'koa-router';

const appTop2 = new Koa();
const router2 = new Router();

router2.get('/', (ctx) => {
  ctx.body = 'router2!';
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
// Static
mountList.push({
  mountPoint: '/lib',
  koaApp: appStatic,
});
linkList.push({
  link: '/lib/test/index.html',
  title: 'static file',
  comment: '/lib/test/index.html',
});
linkList.push({
  link: '/lib/test',
  title: 'static file',
  comment: '/lib/test',
});
linkList.push({
  link: '/lib/test/index2',
  title: 'static file',
  comment: '/lib/test/index2',
});

// dummyPage!
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
