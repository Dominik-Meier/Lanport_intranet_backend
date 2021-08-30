const db = require("../models");
const TournamentType = db.tournamentType;

module.exports = {
    findAllTournamentTypes: findAllTournamentTypes,
    updateTournamentType: updateTournamentType,
    createTournamentType: createTournamentType,
    deleteTournamentType: deleteTournamentType
}

async function findAllTournamentTypes() {
    return TournamentType.findAll()
}

async function updateTournamentType(tournamentType) {
    TournamentType.update(tournamentType, { where: {id: tournamentType.id}})
}

async function createTournamentType(tournamentType) {
    const newTournamentType = { name: tournamentType.name };
    return TournamentType.create(newTournamentType);
}

async function deleteTournamentType(id) {
    const deletedTournamentType = await TournamentType.findOne( {where: {id: id}});
    await TournamentType.destroy({where: {id: id}});
    return deletedTournamentType;
}
