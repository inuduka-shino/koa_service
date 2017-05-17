/*eslint-env node */
import appTop from './toppage.js';
import appStatic from './staticlib.js';
import appTategaki from './tategaki';

import Koa from 'koa';
import Router from 'koa-router';


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
const appTest = new Koa();
const router2 = new Router();

router2.get('/', (ctx) => {
  ctx.body = `router [${ctx.path}] !`;
});
router2.get('/A', (ctx) => {
  ctx.body = `router [${ctx.path}] !`;
});
router2.get('B', (ctx) => {
  // 到達しない
  // /test/B testB
  ctx.body = 'router B !';
});
router2.get('', (ctx) => {
  // 到達しない
  // /test test/
  ctx.body = 'router nullString !';
});

appTest.use(router2.routes());

mountList.push({
  mountPoint: '/test',
  koaApp: appTest,
});
linkList.push({
  link: '/test',
  title: 'test',
  comment: 'test comment',
});

// tategaki
mountList.push({
  mountPoint: '/tategaki',
  koaApp: appTategaki,
  //secOnly: true
});
linkList.push({
  //secLink: '/tategaki/tategaki',
  link: '/tategaki/tategaki',
  title: '縦書き',
  comment: '縦書き表示',
});

appTop.setLinkList(linkList);

export default mountList;
