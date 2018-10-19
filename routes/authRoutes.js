const Router = require('koa-router');
const router =  new Router();

router.prefix('/auth');

router.get('/signup', async(ctx, next) => {
    ctx.body = {
        status: 'success'
    };
});

module.exports = router;