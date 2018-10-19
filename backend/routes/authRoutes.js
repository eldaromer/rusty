const Router = require('koa-router');
const router =  new Router();
const user = require('../db/userDB');

router.prefix('/auth');

router.get('/signup', async(ctx, next) => {
    user.createUser("eldaremily@gmail.com", "1234", (err) => {
        if (err) throw err;
    })
});

module.exports = router;