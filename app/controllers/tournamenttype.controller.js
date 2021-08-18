const {catchSend500AndLogError} = require("../util/HelperFunctions");
const {getAllTournamentsAndSendEvent} = require("../util/HelperFunctions");
const {updateOrCreateAllTournamentTypes} = require("../ControllerDelegates/tournamentTypeDelegate");
const {getAllTournamentTypes} = require("../ControllerDelegates/tournamentTypeDelegate");

exports.findAll = (req, res) => {
    getAllTournamentTypes()
        .then( allTournamentTypes => {
            res.send(allTournamentTypes);
        })
        .catch(err => { catchSend500AndLogError(err, res); });
};

exports.update = (req, res) => {
    updateOrCreateAllTournamentTypes(req.body)
        .then(() => { getAllTournamentsAndSendEvent(res); })
        .catch(err => { catchSend500AndLogError(err, res); });
};


