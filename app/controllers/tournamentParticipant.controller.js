const db = require("../models");
const {createEventMsg} = require("../util/HelperFunctions");
const {createTournamentParticipant} = require("../ControllerDelegates/tournamentParticipantDelegate");
const {findAllTournamentParticipantsByTournament} = require("../ControllerDelegates/tournamentParticipantDelegate");
const {sendMsg} = require("../../app");
const TournamentParticipant = db.tournamentParticipant;
const User = db.user;
const Tournament = db.tournament;

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
    console.log("delete tournament participant");
    const id = req.params.id;
    if(id !== null) {
        console.log('delete TournamentParticipant with id: ', id)
        const tp = await TournamentParticipant.findOne( {where: {id: id}, include: [User]});
        await TournamentParticipant.destroy({ where: {id: id}});
        res.status(200).send();
        const event = {
            event: 'TournamentParticipantLeftEvent',
            data: JSON.stringify(tp)
        }
        sendMsg(event);
    } else {
        res.status(404).send();
    }
};


