const {deleteTournament} = require("../repo/TournamentRepo");
const {findOneTournamentIncludeAll} = require("../repo/TournamentRepo");
const {findAllTournaments} = require("../repo/TournamentRepo");
const {updateExistingTournament} = require("../repo/TournamentRepo");
const {createNewTournament} = require("../repo/TournamentRepo");

module.exports = {
    getAllTournaments: getAllTournaments,
    updateAllTournaments: updateAllTournaments,
    createTournament: createTournament,
    removeTournament: removeTournament
}

async function getAllTournaments() {
    return findAllTournaments();
}

async function updateAllTournaments(tournaments) {
    for (let tournament of tournaments) {
        if (tournament.id !== null) {
            await updateExistingTournament(tournament);
        }
    }
}

async function createTournament() {
    await createNewTournament();
}

async function removeTournament(id) {
    const tournamentToRemove = await findOneTournamentIncludeAll(id);
    if (!tournamentToRemove.finished && (tournamentToRemove.teams.length > 0 || tournamentToRemove.tournamentParticipants.length > 0)) {
        throw 'Tournament has not finished yet and has teams or participants!'
    } else if (tournamentToRemove.finished) {
        return await deleteTournament(id);
    } else if (!tournamentToRemove.finished && (tournamentToRemove.teams.length === 0 || tournamentToRemove.tournamentParticipants.length === 0)) {
        return await deleteTournament(id)
    } else {
        throw 'Some unknown error happened on delete tournament.'
    }
}