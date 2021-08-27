const {findOneTournament} = require("../repo/TournamentRepo");
const {findAllTournaments} = require("../repo/TournamentRepo");
const {updateExistingTournament} = require("../repo/TournamentRepo");
const {createNewTournament} = require("../repo/TournamentRepo");

module.exports = {
    getAllTournaments: getAllTournaments,
    updateAllTournaments: updateAllTournaments,
    createTournament: createTournament
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
    const tournamentToRemove = await findOneTournament(id);
/*    const teamMembers = await
    const teams = await
    const tournamentParticipants = await*/
}