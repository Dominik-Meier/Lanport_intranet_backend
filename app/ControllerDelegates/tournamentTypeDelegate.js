const {findAllTournamentsByTournamentType} = require("../repo/TournamentRepo");
const {createTournamentType} = require("../repo/TournamentTypeRepo");
const {deleteTournamentType} = require("../repo/TournamentTypeRepo");
const {updateTournamentType} = require("../repo/TournamentTypeRepo");
const {findAllTournamentTypes} = require("../repo/TournamentTypeRepo");

module.exports = {
    getAllTournamentTypes: getAllTournamentTypes,
    updateOrCreateAllTournamentTypes: updateOrCreateAllTournamentTypes,
    removeTournamentType: removeTournamentType
}

function getAllTournamentTypes() {
    return findAllTournamentTypes();
}

async function updateOrCreateAllTournamentTypes(tournamentTypes) {
    for (let tournamentType of tournamentTypes) {
        if(tournamentType.id !== null) {
            await updateTournamentType(tournamentType);
        } else {
            await createTournamentType(tournamentType);
        }
    }
}

async function removeTournamentType(id) {
    const tournaments = await findAllTournamentsByTournamentType(id);
    console.log(tournaments)
    if (tournaments !== null && tournaments.length > 0) {
        throw 'TournamentType is null or used in tournaments!'
    } else {
        return deleteTournamentType(id);
    }
}