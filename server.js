require('dotenv').config();
//Koa Imports

const Koa = require('koa');
const Router = require('koa-router');
const logger = require('koa-logger');
const bodyParser = require('koa-bodyparser');
const cors = require('@koa/cors');
const serve = require('koa-static');

const app = new Koa();

const router = require('./backend/routes/routes');

app.use(cors());
app.use(logger());
app.use(bodyParser());
app.use(router());

app.use(serve('./static'));

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