const { jwtSecret } = require('./../../config/secret');
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const token = req.headers.authorization

    if(!token) {
        res.status(401).json({ message: 'You shall not pass! No token' })
    } else {
        jwt.verify(token, jwtSecret, (err, decoded) => {
            if(err) {
                res.status(401).json('we want GOOD token: '+ err.message)
            } else {
                req.decodedToken = decoded
                next();
            }
        })
    }
}