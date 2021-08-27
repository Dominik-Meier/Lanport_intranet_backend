const {sendStatusCodeAndLogError} = require("../util/HelperFunctions");
const {addAppComponent} = require("../ControllerDelegates/angularAppConfigDelegate");
const {deleteAppComponentById} = require("../ControllerDelegates/angularAppConfigDelegate");
const {catchSend500AndLogError} = require("../util/HelperFunctions");
const {readAppConfigFromDB} = require("../ControllerDelegates/angularAppConfigDelegate");
const {createEventMsg} = require("../util/HelperFunctions");
const {sendMsg} = require("../../app");
const {writeAppConfigToDB} = require("../ControllerDelegates/angularAppConfigDelegate");

exports.create = (req, res) => {
    writeAppConfigToDB(req.body.data)
        .then(() => { readAppConfigFromDBAndSendEvent(res); })
        .catch((err) => { sendStatusCodeAndLogError(res, err, 500, 'Error on write new app config'); });
};

exports.find = (req, res) => {
    readAppConfigFromDB()
        .then( allAppRegisterComponents => {
            res.status(200).send(allAppRegisterComponents);
        })
        .catch((err) => { sendStatusCodeAndLogError(res, err, 500, 'Error on read app config'); });
};

exports.deleteAppComponent = (req, res) => {
    deleteAppComponentById(req.params.id)
        .then( () => { readAppConfigFromDBAndSendEvent(res); })
        .catch((err) => { sendStatusCodeAndLogError(res, err, 500, 'Error on delete app config'); });
}

exports.addAppComponent = (req, res) => {
    addAppComponent(req.body.data)
        .then( () => { readAppConfigFromDBAndSendEvent(res); })
        .catch((err) => { sendStatusCodeAndLogError(res, err, 500, 'Error on read add appComponent config'); });
}

function readAppConfigFromDBAndSendEvent(res) {
    readAppConfigFromDB()
        .then(allAppRegisterComponents => {
            res.status(204).send();
            sendMsg(createEventMsg('AppConfigChangedEvent', allAppRegisterComponents)); })
        .catch((err) => { sendStatusCodeAndLogError(res, err, 500, 'Error on read app config'); });
}

