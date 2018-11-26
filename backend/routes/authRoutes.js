const Router = require('koa-router');
const router =  new Router();
const user = require('../db/userDB');
const error = require('../error/Exception').Exception;
const bcrypt = require('bcrypt');
const auth = require('../auth/auth');

router.prefix('/auth');

router.post('/signup', async(ctx, next) => {

    let body = ctx.request.body;

    if (!body.username) throw new error(422, "Missing user name");
    if (!body.password) throw new error(422, "Missing password");

    let hashedPassword = await bcrypt.hash(body.password, 10);

    await user.createUser(body.username, hashedPassword);

    ctx.status(201);
    ctx.body = {
        status: "success"
    }
});

router.post('/login', async (ctx, next) => {

    console.log(ctx.cookies.get('access_token'));


    let body = ctx.request.body;

    if (!body.username) throw new error(422, "Missing user name");
    if (!body.password) throw new error(422, "Missing password");

    let row = (await user.findUser(body.username))[0];

    if (!row) throw new error(404, "User not found");

    const valid = await bcrypt.compare(body.password, row.passwordhash);

    if (!valid) throw new error(401, 'Invalid password');

    const token = await auth.generateToken(row);

    ctx.status = 200;
    ctx.body = {
        user: row,
        token: token
    }

});

module.exports = router;