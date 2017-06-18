/*eslint-env node */

const Koa = require('koa'),
      Router = require('koa-router');

const appTop = require('./toppage.js'),
      appStatic = require('./staticlib.js');
//      appTategaki = require('./tategaki.js'),
//      appSWTest = require('./sw_test.js'),
//      appGHP001 = require('../../gph_001');

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

/* gph001
mountList.push({
  mountPoint: '/gph001',
  koaApp: appGHP001,
});
linkList.push({
  link: '/gph001',
  title: 'ghp #001',
  comment: 'ghp',
});
*/

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
/*
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
*/
// sw test
/*
mountList.push({
  mountPoint: '/sw_test',
  koaApp: appSWTest,
});
linkList.push({
  link: '/sw_test/',
  title: 'sw test',
  comment: 'service worker test page',
});
*/


appTop.setLinkList(linkList);

module.exports =  mountList;
