const jwt = require("jsonwebtoken");
const {sendStatusCodeAndLogError} = require("./HelperFunctions");
const config = process.env;

exports.grantAccess = function (neededRole) {
    return (req, res, next) => {
        const token =  req.body.token || req.query.token || req.headers["authorization"];
        const splitToken = token.split(" ")
        try {
            if (splitToken.length === 2) {
                if (splitToken[0].toUpperCase() === 'BEARER') {
                    const level = jwt.verify(splitToken[1].trim(), config.JWT_SECRET).level;
                    if (neededRole.toUpperCase() === 'GUEST' && (
                        level.toUpperCase() === 'GUEST' ||
                        level.toUpperCase() === 'MITGLIED' ||
                        level.toUpperCase() === 'ADMIN' ||
                        level.toUpperCase() === 'KASSIE' )) {
                        next();
                    } else if (neededRole.toUpperCase() === 'MITGLIED' && (
                        level.toUpperCase() === 'MITGLIED' ||
                        level.toUpperCase() === 'KASSIE' ||
                        level.toUpperCase() === 'ADMIN')) {
                        next();
                    } else if (neededRole.toUpperCase() === 'ADMIN' && level.toUpperCase() === 'ADMIN') {
                        next();
                    } else {
                        throw 'Access not granted';
                    }
                }
            }
        } catch (err) {
            sendStatusCodeAndLogError(res, err, 403, 'Role does not allow to perform action')
        }
    }
}