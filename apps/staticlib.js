/*eslint-env node */

const path = require('path'),
      Koa = require('koa'),
      Router = require('koa-router'),
      serv = require('koa-static-server');

const router = new Router();

function servf(rootdir, rootpath) {
  return (next) => {
    return serv({
      rootDir: path.join(__dirname, rootdir),
      rootPath: rootpath,
      index: 'index.html',
      //notFoundFile: './errorfiles/notFoundFile.html',
    }) (next).catch((e) =>{
      if (e.code === 'ENOENT') {
        console.log('ファイルが見つかりません。');
        console.log(e);
        return Promise.reject(new Error('ファイルが見つかりません。'));
      }
      return Promise.reject(e);
    });
  };
}

router.get('/common/*',servf('../../koa_service_common/static/common','/common'));
router.get('/*',servf('static', '/'));

const app = new Koa();

app
  .use(router.routes())
  .use(router.allowedMethods());

module.exports = app;
