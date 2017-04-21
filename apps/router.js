/*eslint-env node */
/*eslint no-console: off */

import ECT from 'ect';
import Router from 'koa-router';
import path from 'path';

const router1 = new Router(),
      router2 = new Router(),
      renderer = new ECT({
        watch: true,
        root : path.join(__dirname, '/views')
      }),
      data = {
        title : 'Hello, ECT World!'
      };

// top page
router1.get('/', (ctx) => {
  ctx.body = renderer.render('toppage.ect', data);
});
router2.get('/', (ctx) => {
  ctx.body = 'router2';
});

export {
  router1,
  router2
};
