const {createEventMsg} = require("../util/HelperFunctions");
const {removeTournamentType} = require("../ControllerDelegates/tournamentTypeDelegate");
const {sendMsg} = require("../../app");
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

exports.delete = (req, res) => {
    removeTournamentType(req.params.id)
        .then( deletedTournamentType => {
            res.status(204).send();
            console.log(deletedTournamentType);
            sendMsg(createEventMsg('TournamentTypeDeletedEvent', deletedTournamentType));
        })
        .catch(err => { sendStatusCodeAndLogError(res, err, 500, 'Error on delete TournamentTypes'); });
}


