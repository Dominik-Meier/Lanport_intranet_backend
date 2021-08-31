const jwt = require("jsonwebtoken");
const config = process.env;

const verifyToken = (req, res, next) => {
    const token =  req.body.token || req.query.token || req.headers["authorization"];
    if (!token) throw 'Not authorized!';
    const splitToken = token.split(" ")
    try {
        if (splitToken.length === 2) {
            if (splitToken[0].toUpperCase() === 'BEARER') {
                req.user = jwt.verify(splitToken[1].trim(), config.JWT_SECRET);
            } else {
                throw 'Authentication schema not supported!'
            }
        } else {
            throw 'Authentication fail on validate schema!'
        }

    } catch (err) {
        throw 'Error on JWT decode: '.concat(err);
    }
    return next();
}

module.exports = verifyToken;