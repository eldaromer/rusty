require('dotenv').config();
const errorHandler = require('./error/errorHandler.middleware').errorHandlerMiddleware;

//Koa Imports

const Koa = require('koa');
const logger = require('koa-logger');
const bodyParser = require('koa-bodyparser');
const cors = require('@koa/cors');
const serve = require('koa-static');
const angularProxy = require('koa-angular-proxy');

const app = new Koa();

const router = require('./routes/routes');

app.use(errorHandler);
app.use(cors());
app.use(logger());
app.use(bodyParser());
app.use(router());

app.use(angularProxy('./dist'));

//Socket.io Setup

let server = require('http').createServer(app.callback());
let io = require('socket.io')(server);

io.on('connection', sock => {
    io.clients((err, clients) => {
        if (err) throw err;
        console.log(clients);
    });
});

server.listen(3000, () => {
    console.log('App is running on port 3000');
}).setTimeout(10000);
