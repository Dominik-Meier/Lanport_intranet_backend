const {findOneTournamentParticipantByUserIdAndTournament} = require("../repo/TournamentParticipantsRepo");
const {findOneUserById} = require("../repo/UserRepo");
const {deleteTournamentParticipant} = require("../repo/TournamentParticipantsRepo");
const {createNewTournamentParticipant} = require("../repo/TournamentParticipantsRepo");
const {findOneTournament} = require("../repo/TournamentRepo");
const {findAllTournamentParticipantsByTournament} = require("../repo/TournamentParticipantsRepo");
const {findOneTournamentParticipant} = require("../repo/TournamentParticipantsRepo");

module.exports = {
    getAllTournamentParticipantsByTournament: getAllTournamentParticipantsByTournament,
    createTournamentParticipant: createTournamentParticipant,
    removeTournamentParticipant: removeTournamentParticipant
}

function getAllTournamentParticipantsByTournament(tournamentId) {
    return findAllTournamentParticipantsByTournament(tournamentId);
}

async function createTournamentParticipant(tournamentParticipant, userId) {
    if (tournamentParticipant) {
        const user = await findOneUserById(userId);
        const dbTournamentParticipant = await findOneTournamentParticipantByUserIdAndTournament(userId, tournamentParticipant.tournamentId);
        const dbTournamentParticipants = await findAllTournamentParticipantsByTournament(tournamentParticipant.tournamentId);
        const tournament = await findOneTournament(tournamentParticipant.tournamentId);

        if (dbTournamentParticipant) {
            throw 'User already exits in this tournament';
        } else if (tournament.numberOfParticipants <= dbTournamentParticipants.length) {
            throw 'Limit of registration reached';
        } else if (tournament.started === true) {
            throw 'Tournament is not open for registration!';
        } else if (Date.parse(tournament.registrationEndDate) < Date.now()) {
            throw 'Registration phase has ended!'
        } else if (!user.payed) {
            throw 'Only payed user are allowed to register for tournaments';
        } else {
            return await createNewTournamentParticipant(tournamentParticipant);
        }
    }
}

async function removeTournamentParticipant(id) {
    const tp = await findOneTournamentParticipant(id);
    const tournament = await findOneTournament(tp.tournamentId);
    if (tournament.started === true) {
        throw 'Tournament is not open for changes';
    } else {
        return deleteTournamentParticipant(id);
    }
}

