/*eslint-env node */
/*eslint no-console: off */

import ECT from 'ect';
import Router from 'koa-router';
import path from 'path';

const router = new Router(),
      renderer = new ECT({
        watch: true,
        root : path.join(__dirname, '/views')
      }),
      data = {
        title : 'Hello, ECT World!'
      };

// top page
router.get('/', (ctx) => {
  ctx.body = renderer.render('toppage.ect', data);
});

export default router;
