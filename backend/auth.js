const jwt = require('jsonwebtoken');
const Promise = require('bluebird');


function generateToken (user) {

    return new Promise(function(resolve, reject) {
        jwt.sign(user, process.env.RUSTY_SECRET, {
            expiresIn: '2 days'
        }, function(err, decode) {
            if (err) {
                reject(err);
                return;
            }

            resolve(decode);
        })
    });
}

function verifyToken (token) {

    return new Promise(function(resolve, reject) {
        jwt.verify(token, process.env.RUSTY_SECRET, function (err, decoded) {
            if (err) {
                reject(err);
                return;
            }

            resolve(decoded);
        })
    });

}

module.exports = {
    generateToken: generateToken,
    verifyToken: verifyToken
};