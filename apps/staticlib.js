/*eslint-env node */

const path = require('path'),
      Koa = require('koa'),
      Router = require('koa-router'),
      serv = require('koa-static-server');

const router = new Router();

const servf = serv({
  rootDir: path.join(__dirname, 'static'),
  rootPath: '/',
  index: 'index.html',
  //notFoundFile: './errorfiles/notFoundFile.html',
});
router.get('/*',(next)=>{
    return servf(next).catch((e) =>{
      if (e.code === 'ENOENT') {
        console.log('ファイルが見つかりません。');
        console.log(e);
        return Promise.reject(new Error('ファイルが見つかりません。'));
      }
      return Promise.reject(e);
    });
});

const app = new Koa();

app
  .use(router.routes())
  .use(router.allowedMethods());

module.exports = app;
