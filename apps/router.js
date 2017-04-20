import Router from 'koa-router';

const router = new Router();

// top page
router.get('/', (ctx) => {
  ctx.body = 'top page';
});

export default router;
