const jwt = require("jsonwebtoken");
const {sendStatusCodeAndLogError} = require("./HelperFunctions");
const config = process.env;

exports.grantAccess = function (neededRole) {
    return async (req, res, next) => {
        const token =  req.body.token || req.query.token || req.headers["authorization"];
        const splitToken = token.split(" ")
        try {
            if (splitToken.length === 2) {
                if (splitToken[0].toUpperCase() === 'BEARER') {
                    const level = jwt.verify(splitToken[1].trim(), config.JWT_SECRET).level;
                    if (neededRole.toUpperCase() === 'MITGLIED' && (level.toUpperCase() === 'MITGLIED' || level.toUpperCase() === 'ADMIN')) {
                        return;
                    }
                    if (neededRole.toUpperCase() === 'ADMIN' && level.toUpperCase() === 'ADMIN') {
                        return;
                    }
                    throw 'Access not granted';
                }
            }
            return next();
        } catch (err) {
            sendStatusCodeAndLogError(res, err, 403, 'Role does not allow to perform action')
        }
    }
}