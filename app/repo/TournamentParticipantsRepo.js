const db = require("../models");
const Tournament = db.tournament;
const User = db.user;
const TournamentParticipant = db.tournamentParticipant;
const {logger} = require('../../app')

module.exports = {
    findAllTournamentParticipantsByTournament: findAllTournamentParticipantsByTournament,
    findOneTournamentParticipant: findOneTournamentParticipant,
    createNewTournamentParticipant: createNewTournamentParticipant,
    deleteTournamentParticipant: deleteTournamentParticipant
}

async function findAllTournamentParticipantsByTournament(tournamentId) {
    return TournamentParticipant.findAll( { where: {tournamentId: tournamentId}, include: [User]});
}

async function findOneTournamentParticipant(id) {
    return TournamentParticipant.findOne( { where: { id: id}, include: [Tournament, User] });
}

async function createNewTournamentParticipant(tournamentParticipant) {
    logger.info('create new tournamentParticipant');
    const newTournamentParticipant = {
        tournamentId: tournamentParticipant.tournamentId,
        userId: tournamentParticipant.user.id
    }
    let resTournamentParticipant = await TournamentParticipant.create(newTournamentParticipant);
    return  TournamentParticipant.findOne({ where: {id: resTournamentParticipant.id}, include: [Tournament, User] });
}

async function deleteTournamentParticipant(id) {
    const deletedTournamentParticipant = await findOneTournamentParticipant(id);
    await TournamentParticipant.destroy({where: {id: id}});
    return deletedTournamentParticipant;
}