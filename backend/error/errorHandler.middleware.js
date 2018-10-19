const Exception = require('./Exception').Exception;
const errorCodes = require('pg-error-codes');

module.exports.errorHandlerMiddleware = async function errorHandlerMiddleware (ctx, next) {
    try {
        await next();
    } catch(err) {
        if (err instanceof Exception) {
            ctx.body = err.toObject();
            ctx.status = err.statusCode;
        } else {
            console.log(err);
            if (err.code) err.message = errorCodes[err.code];

            ctx.body = {
                statusCode: 500,
                message: err.message || 'Unexpected error.'
            };
            ctx.status = 500;
        }
    }
};