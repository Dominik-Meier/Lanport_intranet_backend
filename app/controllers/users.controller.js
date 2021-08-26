const {sendStatusCodeAndLogError} = require("../util/HelperFunctions");
const {handleGetUserBySess} = require("../ControllerDelegates/userDelegate");
const {handleGetUserDevMode} = require("../ControllerDelegates/userDelegate");
const {config} = require('../../app')


exports.findOne = async (req, res) => {
    if (config === 'dev') {
        handleGetUserDevMode(req.params.id)
            .then(user => res.send(user) )
            .catch(err => { sendStatusCodeAndLogError(res, err, 401, 'No sess for user found'); });
    } else {
        handleGetUserBySess(req.params.id)
            .then(user => res.send(user))
            .catch(err => { sendStatusCodeAndLogError(res, err, 401, 'No sess for user found'); });
    }
};


