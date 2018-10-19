const combineRouters = require('koa-combine-routers');

const authRouter = require('./authRoutes');
const gameRouter = require('./gameRoutes');

const router = combineRouters([authRouter, gameRouter]);

module.exports = router;