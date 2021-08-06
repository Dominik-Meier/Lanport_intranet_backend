const db = require("../models");
const {sendMsg} = require("../../app");
const TournamentParticipant = db.tournamentParticipant;
const User = db.user;
const Tournament = db.tournament;


exports.findAll = (req, res) => {
    TournamentParticipant.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Teams."
            });
        });
};

exports.findByTournament = async (req, res) => {
    const tournamentId = req.params.id;
    console.log('log tournamentIdv: ', tournamentId);
    const dbTournamentParticipant = await TournamentParticipant.findAll( { where: {tournamentId: tournamentId}, include: [User]});
    console.log(dbTournamentParticipant);
    res.status(200).send(dbTournamentParticipant);
};

exports.findByUser = (req, res) => {
};


exports.create = async (req, res) => {
    const tournamentParticipant = req.body;
    if (tournamentParticipant) {
        //TODO implement restrictions for adding to team
        // 1. same team 2. in other team 3. fun main tournament miss matiching
        const dbTournamentParticipant = await TournamentParticipant.findOne( {where: { tournamentId: tournamentParticipant.tournamentId, userId: tournamentParticipant.user.id}, include: [Tournament]});
        const dbTournamentParticipants = await TournamentParticipant.findAll( { where: {tournamentId: tournamentParticipant.tournamentId}, include: [User]});
        const tournament = await Tournament.findOne({ where: {id: tournamentParticipant.tournamentId}});

        if (dbTournamentParticipant) {
            res.status(403).send('User already exits in this tournament');
        } else if (tournament.numberOfParticipants <= dbTournamentParticipants.length) {
            res.status(403).send('Limit of registration reached');
        } else {
            const newTournamentParticipant = {
                tournamentId: tournamentParticipant.tournamentId,
                userId: tournamentParticipant.user.id
            }
            let resTournamentParticipant = await TournamentParticipant.create(newTournamentParticipant);
            resTournamentParticipant = await TournamentParticipant.findOne( {where: {id: resTournamentParticipant.id}, include: [User]});
            res.status(200).send(resTournamentParticipant);
            const event = {
                event: 'TournamentParticipantJoinedEvent',
                data: JSON.stringify(resTournamentParticipant)
            }
            sendMsg(event);
        }

    }

    res.status(500).send();
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


