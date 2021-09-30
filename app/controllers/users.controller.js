const {handleRefreshToken} = require("../ControllerDelegates/userDelegate");
const {sendStatusCodeAndLogError} = require("../util/HelperFunctions");
const {handleGetUserBySess} = require("../ControllerDelegates/userDelegate");
const {handleGetUserDevMode} = require("../ControllerDelegates/userDelegate");
const {config} = require('../../app')

// TODO if user send jwt token with request skip creating new jwt
// refresh of token needs to be implemented first
exports.findOne = async (req, res) => {
    const userAgent = req.headers['user-agent'];
    if (config === 'dev') {
        handleGetUserDevMode(req.params.id)
            .then(user => res.send(user) )
            .catch(err => { sendStatusCodeAndLogError(res, err, 401, 'No sess for user found'); });
    } else {
        handleGetUserBySess(req.params.id, userAgent)
            .then(user => res.send(user))
            .catch(err => { sendStatusCodeAndLogError(res, err, 401, 'No sess for user found'); });
    }
};

exports.refreshToken = async (req, res) => {
    handleRefreshToken(req.body.refreshToken)
        .then( user => res.send(user))
        .catch( err => { sendStatusCodeAndLogError(res, err, 403, 'Error on refresh jwt token'); });

}


