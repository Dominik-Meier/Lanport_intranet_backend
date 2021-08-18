const {catchSend500AndLogError} = require("../util/HelperFunctions");
const {getAllTournamentsAndSendEvent} = require("../util/HelperFunctions");
const {updateAllTournaments} = require("../ControllerDelegates/tournamentDelegate");
const {getAllTournaments} = require("../ControllerDelegates/tournamentDelegate");

exports.findAll = (req, res) => {
    getAllTournaments()
        .then( allTournaments => {
            res.send(allTournaments);
        })
        .catch(err => { catchSend500AndLogError(err, res); });
};

exports.updateAll = (req, res) => {
    updateAllTournaments(req.body)
        .then( () => {
            getAllTournamentsAndSendEvent(res);
        })
        .catch(err => { catchSend500AndLogError(err, res); });
};