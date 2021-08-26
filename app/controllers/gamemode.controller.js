const {sendStatusCodeAndLogError} = require("../util/HelperFunctions");
const {getAllTournamentsAndSendEvent} = require("../util/HelperFunctions");
const {deleteGameMode} = require("../ControllerDelegates/gamemodeDelegate");
const {updateOrCreateGameMode} = require("../ControllerDelegates/gamemodeDelegate");
const {getAllGameModes} = require("../ControllerDelegates/gamemodeDelegate");


exports.findAll = (req, res) => {
    getAllGameModes()
        .then( allGameModes => { res.send(allGameModes); })
        .catch(err => { sendStatusCodeAndLogError(res, err, 500, 'Error on get gameModes'); });
};

exports.update = (req, res) => {
    updateOrCreateGameMode(req.body)
        .then( () => { getAllTournamentsAndSendEvent(res); })
        .catch(err => { sendStatusCodeAndLogError(res, err, 500, 'Error on update gameMode'); });
};

exports.delete = (req, res) => {
    const id = req.params.id;
    deleteGameMode(id)
        .then(() => { getAllTournamentsAndSendEvent(res); })
        .catch(err => { sendStatusCodeAndLogError(res, err, 500, 'Error on delete gameMode'); });
};


