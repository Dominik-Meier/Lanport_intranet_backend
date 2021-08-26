const db = require("../models");
const Tournament = db.tournament;
const User = db.user;
const TournamentParticipant = db.tournamentParticipant;

module.exports = {
    findAllTournamentParticipantsByTournament: findAllTournamentParticipantsByTournament,
    createTournamentParticipant: createTournamentParticipant,
    deleteTournamentParticipant: deleteTournamentParticipant
}

function findAllTournamentParticipantsByTournament(tournamentId) {
    return TournamentParticipant.findAll( { where: {tournamentId: tournamentId}, include: [User]});
}

async function createTournamentParticipant(tournamentParticipant) {
    if (tournamentParticipant) {
        const dbTournamentParticipant = await TournamentParticipant.findOne( {where: { tournamentId: tournamentParticipant.tournamentId, userId: tournamentParticipant.user.id}, include: [Tournament]});
        const dbTournamentParticipants = await TournamentParticipant.findAll( { where: {tournamentId: tournamentParticipant.tournamentId}, include: [User]});
        const tournament = await Tournament.findOne({ where: {id: tournamentParticipant.tournamentId}});

        if (dbTournamentParticipant) {
            throw 'User already exits in this tournament';
        } else if (tournament.numberOfParticipants <= dbTournamentParticipants.length) {
            throw 'Limit of registration reached';
        } else if (tournament.started === true) {
            throw 'Tournament is not open for registration!';
        } else {
            const newTournamentParticipant = {
                tournamentId: tournamentParticipant.tournamentId,
                userId: tournamentParticipant.user.id
            }
            let resTournamentParticipant = await TournamentParticipant.create(newTournamentParticipant);
            resTournamentParticipant = await TournamentParticipant.findOne({ where: {id: resTournamentParticipant.id}, include: [User] });
            return resTournamentParticipant;
        }
    }
}

async function deleteTournamentParticipant(id) {
    const tp = await TournamentParticipant.findOne({where: {id: id}, include: [User]});
    const tournament = await Tournament.findOne({ where: {id: tp.tournamentId}});
    if (tournament.started === true) {
        throw 'Tournament is not open for changes';
    } else {
        await TournamentParticipant.destroy({where: {id: id}});
        return tp;
    }
}

