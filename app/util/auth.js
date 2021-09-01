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
                res.status(403).send('Authorization Forbidden - Error on token schema is not supported');
            }
        } else {
            res.status(403).send('Authorization Forbidden - Error on decode token schema could no be extracted');
        }

    } catch (err) {
        res.status(401).send('Not Authorized - Error on decode token or not valid / expired!');
    }
    return next();
}

module.exports = verifyToken;