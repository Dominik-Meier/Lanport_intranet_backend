const {catchSend500AndLogError} = require("../util/HelperFunctions");
const {readAppConfigFromDB} = require("../ControllerDelegates/angularAppConfigDelegate");
const {createEventMsg} = require("../util/HelperFunctions");
const {sendMsg} = require("../../app");
const {writeAppConfigToDB} = require("../ControllerDelegates/angularAppConfigDelegate");

exports.create = (req, res) => {
    writeAppConfigToDB(req.body.data)
        .then(() => {
            readAppConfigFromDB().then( allAppRegisterComponents => {
                console.log(allAppRegisterComponents[0].appComponents);
                res.status(200).send(allAppRegisterComponents);
            })
            .catch((err) => { catchSend500AndLogError(err, res); });
        })
        .catch((err) => { catchSend500AndLogError(err, res); });
};

exports.find = (req, res) => {
    readAppConfigFromDB()
        .then( allAppRegisterComponents => {
            console.log(allAppRegisterComponents);
            res.status(200).send(allAppRegisterComponents);
        })
        .catch((err) => { catchSend500AndLogError(err, res); });
};

