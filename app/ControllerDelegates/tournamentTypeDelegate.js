const db = require("../models");
const TournamentType = db.tournamentType;

module.exports = {
    getAllTournamentTypes: getAllTournamentTypes,
    updateOrCreateAllTournamentTypes: updateOrCreateAllTournamentTypes
}

function getAllTournamentTypes() {
    return TournamentType.findAll();
}

async function updateOrCreateAllTournamentTypes(tournamentTypes) {
    for (let tournamentType of tournamentTypes) {
        if(tournamentType.id !== null) {
             await TournamentType.update(tournamentType, { where: {id: tournamentType.id}});
        } else {
            const newTournamentType = {
                name: tournamentType.name,
            };
            await TournamentType.create(newTournamentType);
        }
    }
}