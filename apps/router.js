/*eslint-env node */
import Router from 'koa-router';

const router = new Router();
var ECT = require('ect');
var renderer = ECT({ root : __dirname + '/views' });
var data = { title : 'Hello, ECT World!' };
var html = renderer.render('template.ect', data);

// top page
router.get('/', (ctx) => {
  ctx.body = html;
});

export default router;
