/*eslint-env node */

const Koa = require('koa'),
      Router = require('koa-router');

const linkList = [],
      mountList = [];

// TopPage
const appTop = require('./toppage.js');
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
appStatic = require('./staticlib.js');
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


/* sw-cache */
const appSWTest = require('../../sw_test');
mountList.push({
  mountPoint: '/sw_test',
  koaApp: appSWTest,
});
linkList.push({
  link: '/sw_test/',
  title: 'sw test',
  comment: 'service worker test page',
});

/* gph001 */
const appGHP001 = require('../../gph_001');
mountList.push({
  mountPoint: '/gph001',
  koaApp: appGHP001,
});
linkList.push({
  link: '/gph001/',
  title: 'ghp #001',
  comment: 'ghp',
});

/* cryptpack */
const appCryptpack = require('../../cryptpack/service');
mountList.push({
  mountPoint: '/cryptpack',
  koaApp: appCryptpack,
});
linkList.push({
  link: '/cryptpack/main.html',
  title: 'CryptPack',
  comment: 'CryptPack Services',
});

/* broklg */
mountList.push({
  mountPoint: '/broklog',
  koaApp: require('../../broklg'),
});
linkList.push({
  link: '/broklog/main.html',
  title: 'Broklog',
  comment: 'Broklog',
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

appTop.setLinkList(linkList);

module.exports =  mountList;
