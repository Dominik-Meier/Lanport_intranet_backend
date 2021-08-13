const {deleteTournamentParticipant} = require("../ControllerDelegates/tournamentParticipantDelegate");
const {createEventMsg} = require("../util/HelperFunctions");
const {createTournamentParticipant} = require("../ControllerDelegates/tournamentParticipantDelegate");
const {findAllTournamentParticipantsByTournament} = require("../ControllerDelegates/tournamentParticipantDelegate");
const {sendMsg} = require("../../app");

exports.findByTournament = async (req, res) => {
    findAllTournamentParticipantsByTournament(req.params.id)
        .then(dbTournamentParticipant => {
            res.status(200).send(dbTournamentParticipant)
        })
        .catch(err => { res.status(500).send('Server Error') });
};

exports.create = async (req, res) => {
    createTournamentParticipant(req.body)
        .then( tournamentParticipant => {
            res.status(200).send(tournamentParticipant);
            sendMsg(createEventMsg('TournamentParticipantJoinedEvent', tournamentParticipant))
        })
        .catch(err => { res.status(403).send(err) });
};

exports.delete = async (req, res) => {
    deleteTournamentParticipant(req.params.id)
        .then( tournamentParticipant => {
            res.status(200).send();
            sendMsg(createEventMsg('TournamentParticipantLeftEvent', tournamentParticipant));
        })
        .catch(err => { res.status(403).send(err) });
};


