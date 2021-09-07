const {getAllTournamentsAndSendEvent} = require("../util/HelperFunctions");
const {addChallongeTournamentParticipants} = require("../ControllerDelegates/challongeDelegate");
const {createChallongeTournament} = require("../ControllerDelegates/challongeDelegate");
const {sendStatusCodeAndLogError} = require("../util/HelperFunctions");

exports.getTournament = (req, res) => {
/*    getAllTournaments()
        .then( allTournaments => { res.send(allTournaments); })
        .catch(err => { sendStatusCodeAndLogError(res, err, 500, 'Error on get Tournaments'); });*/
};

exports.create = (req, res) => {
    createChallongeTournament(req.params.id)
        .then( () => { res.status(204).send(); })
        .catch(err => { sendStatusCodeAndLogError(res, err, 500, 'Error on create challonge tournament'); });
};

exports.updateTournament = (req, res) => {

};

exports.deleteTournament = (req, res) => {
}

exports.addParticipants = (req, res) => {
    addChallongeTournamentParticipants(req.params.id)
        .then( () => { getAllTournamentsAndSendEvent(res); })
        .catch(err => { sendStatusCodeAndLogError(res, err, 500, 'Error on create challonge tournament participants'); });
}

exports.updateParticipants = (req, res) => {
}