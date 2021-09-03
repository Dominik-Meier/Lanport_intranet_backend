const {updateExistingGameModes} = require("../ControllerDelegates/gamemodeDelegate");
const {getAllGameModesAndSendEvent} = require("../util/HelperFunctions");
const {addGameMode} = require("../ControllerDelegates/gamemodeDelegate");
const {removeGameMode} = require("../ControllerDelegates/gamemodeDelegate");
const {createEventMsg} = require("../util/HelperFunctions");
const {sendMsg} = require("../../app");
const {sendStatusCodeAndLogError} = require("../util/HelperFunctions");
const {getAllGameModes} = require("../ControllerDelegates/gamemodeDelegate");


exports.findAll = (req, res) => {
    getAllGameModes()
        .then( allGameModes => { res.send(allGameModes); })
        .catch(err => { sendStatusCodeAndLogError(res, err, 500, 'Error on get gameModes'); });
};

exports.create = (req, res) => {
    addGameMode(req.body)
        .then( () => { getAllGameModesAndSendEvent(res); })
        .catch(err => { sendStatusCodeAndLogError(res, err, 500, 'Error on update gameMode'); });
};

exports.update = (req, res) => {
    updateExistingGameModes(req.body)
        .then( () => { getAllGameModesAndSendEvent(res); })
        .catch(err => { sendStatusCodeAndLogError(res, err, 500, 'Error on update gameMode'); });
};

exports.delete = (req, res) => {
    removeGameMode(req.params.id)
        .then( deletedGameMode => {
            res.status(204).send();
            sendMsg(createEventMsg('GameModeDeletedEvent', deletedGameMode)); })
        .catch(err => { sendStatusCodeAndLogError(res, err, 500, 'Error on delete gameMode'); });
};


