const Koa = require('koa');
const Router = require('koa-router');
const logger = require('koa-logger');
const bodyParser = require('koa-bodyparser');
const cors = require('@koa/cors');
const serve = require('koa-static');

const app = new Koa();

const router = new Router();

app.use(cors());
app.use(logger());
app.use(bodyParser());
app.use(router.routes());
app.use(router.allowedMethods());

app.use(serve('./static'));

router.get('/test', async(ctx, next) => {
    ctx.body = {
        status: 'ugh'
    }
});

app.listen(3000, () => {
    console.log('App is running on port 3000');
}).setTimeout(10000);