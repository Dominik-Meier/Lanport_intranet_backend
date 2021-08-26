const {sendStatusCodeAndLogError} = require("../util/HelperFunctions");
const {getAllTournamentsAndSendEvent} = require("../util/HelperFunctions");
const {updateAllTournaments} = require("../ControllerDelegates/tournamentDelegate");
const {getAllTournaments} = require("../ControllerDelegates/tournamentDelegate");

exports.findAll = (req, res) => {
    getAllTournaments()
        .then( allTournaments => { res.send(allTournaments); })
        .catch(err => { sendStatusCodeAndLogError(res, err, 500, 'Error on get Tournaments'); });
};

exports.updateAll = (req, res) => {
    updateAllTournaments(req.body)
        .then( () => { getAllTournamentsAndSendEvent(res); })
        .catch(err => { sendStatusCodeAndLogError(res, err, 500, 'Error on update Tournaments'); });
};