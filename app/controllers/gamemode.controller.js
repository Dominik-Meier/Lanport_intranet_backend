const {getAllTournamentsAndSendEvent} = require("../util/HelperFunctions");
const {catchSend500AndLogError} = require("../util/HelperFunctions");
const {deleteGameMode} = require("../ControllerDelegates/gamemodeDelegate");
const {updateOrCreateGameMode} = require("../ControllerDelegates/gamemodeDelegate");
const {getAllGameModes} = require("../ControllerDelegates/gamemodeDelegate");


exports.findAll = (req, res) => {
    getAllGameModes()
        .then( allGameModes => { res.send(allGameModes); })
        .catch(err => { catchSend500AndLogError(err, res); });
};

exports.update = (req, res) => {
    updateOrCreateGameMode(req.body)
        .then( () => { getAllTournamentsAndSendEvent(res); })
        .catch(err => { catchSend500AndLogError(err, res); });
};

exports.delete = (req, res) => {
    const id = req.params.id;
    deleteGameMode(id)
        .then(() => { getAllTournamentsAndSendEvent(res); })
        .catch(err => { catchSend500AndLogError(err, res); });
};


