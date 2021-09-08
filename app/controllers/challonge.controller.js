const {updateChallongeTournament} = require("../ControllerDelegates/challongeDelegate");
const {startChallongeTournament} = require("../ControllerDelegates/challongeDelegate");
const {clearChallongeTournamentParticipants} = require("../ControllerDelegates/challongeDelegate");
const {getAllTournamentsAndSendEvent} = require("../util/HelperFunctions");
const {addChallongeTournamentParticipants} = require("../ControllerDelegates/challongeDelegate");
const {createChallongeTournament} = require("../ControllerDelegates/challongeDelegate");
const {sendStatusCodeAndLogError} = require("../util/HelperFunctions");

exports.getTournament = (req, res) => {
};

exports.create = (req, res) => {
    createChallongeTournament(req.params.id)
        .then( () => { res.status(204).send(); })
        .catch(err => { sendStatusCodeAndLogError(res, err, 500, 'Error on create challonge tournament'); });
};

exports.updateTournament = (req, res) => {
    updateChallongeTournament(req.params.id)
        .then( () => { res.status(204).send(); })
        .catch(err => { sendStatusCodeAndLogError(res, err, 500, 'Error on create challonge tournament'); });
};


exports.addParticipants = (req, res) => {
    addChallongeTournamentParticipants(req.params.id)
        .then( () => { getAllTournamentsAndSendEvent(res); })
        .catch(err => { sendStatusCodeAndLogError(res, err, 500, 'Error on create challonge tournament participants'); });
}

exports.startTournament = (req, res) => {
    startChallongeTournament(req.params.id)
        .then( () => { res.status(204).send(); })
        .catch(err => { sendStatusCodeAndLogError(res, err, 500, 'Error on start challonge tournament'); });
}

exports.deleteParticipants = (req, res) => {
    clearChallongeTournamentParticipants(req.params.id)
        .then(() => {getAllTournamentsAndSendEvent(res); })
        .catch(err => { sendStatusCodeAndLogError(res, err, 500, 'Error on delete challonge tournament participants'); });
}