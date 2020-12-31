const db = require("../models");
const TournamentParticipant = db.tournamentParticipant;
const User = db.user;
const Op = db.Sequelize.Op;


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
        // 1. same team 2. in other team 3. fun main tournament miss matiching 4. limit of accepted members
        const dbTournamentParticipant = await TournamentParticipant.findOne( {where: { tournamentId: tournamentParticipant.tournamentId, userId: tournamentParticipant.user.id}});

        if (dbTournamentParticipant) {
            res.status(403).send('User already exits in this tournament');
        } else {
            const newTournamentParticipant = {
                tournamentId: tournamentParticipant.tournamentId,
                userId: tournamentParticipant.user.id
            }
            let resTournamentParticipant = await TournamentParticipant.create(newTournamentParticipant);
            resTournamentParticipant = await TournamentParticipant.findOne( {where: {id: resTournamentParticipant.id}, include: [User]});
            res.status(200).send(resTournamentParticipant);
        }

    }

    res.status(200).send();
};


exports.delete = (req, res) => {
    console.log(req);
    const id = req.params.id;

    if(id !== null) {
        console.log('delete TournamentParticipant with id: ', id)
        TournamentParticipant.destroy({ where: {id: id}});
    }
    res.status(200).send();
};


