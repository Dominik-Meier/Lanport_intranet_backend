const {removeTournamentParticipant} = require("../ControllerDelegates/tournamentParticipantDelegate");
const {getAllTournamentParticipantsByTournament} = require("../ControllerDelegates/tournamentParticipantDelegate");
const {sendStatusCodeAndLogError} = require("../util/HelperFunctions");
const {createEventMsg} = require("../util/HelperFunctions");
const {createTournamentParticipant} = require("../ControllerDelegates/tournamentParticipantDelegate");
const {sendMsg} = require("../../app");

exports.findByTournament = async (req, res) => {
    getAllTournamentParticipantsByTournament(req.params.id)
        .then(dbTournamentParticipant => { res.status(200).send(dbTournamentParticipant); })
        .catch(err => { sendStatusCodeAndLogError(res, err, 500, 'Error on get TournamentParticipants'); });
};

exports.create = async (req, res) => {
    createTournamentParticipant(req.body)
        .then( tournamentParticipant => {
            res.status(200).send(tournamentParticipant);
            sendMsg(createEventMsg('TournamentParticipantJoinedEvent', tournamentParticipant))
        })
        .catch(err => { sendStatusCodeAndLogError(res, err, 500, 'Error on create TournamentParticipants'); });
};

exports.delete = async (req, res) => {
    removeTournamentParticipant(req.params.id)
        .then( tournamentParticipant => {
            console.log(tournamentParticipant);
            res.status(200).send();
            sendMsg(createEventMsg('TournamentParticipantLeftEvent', tournamentParticipant));
        })
        .catch(err => { sendStatusCodeAndLogError(res, err, 500, 'Error on delete TournamentParticipants'); });
};


