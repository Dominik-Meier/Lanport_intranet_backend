const {sendStatusCodeAndLogError} = require("../util/HelperFunctions");
const {getAllTournamentsAndSendEvent} = require("../util/HelperFunctions");
const {updateOrCreateAllTournamentTypes} = require("../ControllerDelegates/tournamentTypeDelegate");
const {getAllTournamentTypes} = require("../ControllerDelegates/tournamentTypeDelegate");

exports.findAll = (req, res) => {
    getAllTournamentTypes()
        .then( allTournamentTypes => {
            res.send(allTournamentTypes);
        })
        .catch(err => { sendStatusCodeAndLogError(res, err, 500, 'Error on get TournamentTypes'); });
};

exports.update = (req, res) => {
    updateOrCreateAllTournamentTypes(req.body)
        .then(() => { getAllTournamentsAndSendEvent(res); })
        .catch(err => { sendStatusCodeAndLogError(res, err, 500, 'Error on create / update TournamentTypes'); });
};


