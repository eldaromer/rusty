const combineRouters = require('koa-combine-routers');

const authRouter = require('./authRoutes');

const router = combineRouters(authRouter);

module.exports = router;