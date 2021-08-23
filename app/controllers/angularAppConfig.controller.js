const {deleteAppComponentById} = require("../ControllerDelegates/angularAppConfigDelegate");
const {catchSend500AndLogError} = require("../util/HelperFunctions");
const {readAppConfigFromDB} = require("../ControllerDelegates/angularAppConfigDelegate");
const {createEventMsg} = require("../util/HelperFunctions");
const {sendMsg} = require("../../app");
const {writeAppConfigToDB} = require("../ControllerDelegates/angularAppConfigDelegate");

exports.create = (req, res) => {
    writeAppConfigToDB(req.body.data)
        .then(() => {
            readAppConfigFromDB().then( allAppRegisterComponents => {
                res.status(200).send(allAppRegisterComponents);
                sendMsg(createEventMsg('AppConfigChangedEvent', allAppRegisterComponents));
            })
            .catch((err) => { catchSend500AndLogError(err, res); });
        })
        .catch((err) => { catchSend500AndLogError(err, res); });
};

exports.find = (req, res) => {
    readAppConfigFromDB()
        .then( allAppRegisterComponents => {
            res.status(200).send(allAppRegisterComponents);
        })
        .catch((err) => { catchSend500AndLogError(err, res); });
};

exports.deleteAppComponent = (req, res) => {
    deleteAppComponentById(req.params.id)
        .then( () => {
            readAppConfigFromDB()
                .then( allAppRegisterComponents => {
                    res.status(204).send();
                    sendMsg(createEventMsg('AppConfigChangedEvent', allAppRegisterComponents));
                })
                .catch((err) => { catchSend500AndLogError(err, res); });
        })
        .catch((err) => { catchSend500AndLogError(err, res); });
}

