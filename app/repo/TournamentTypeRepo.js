const db = require("../models");
const TournamentType = db.tournamentType;

module.exports = {
    findAllTournamentTypes: findAllTournamentTypes,
    updateTournamentType: updateTournamentType,
    addTournamentType: addTournamentType,
    deleteTournamentType: deleteTournamentType
}

async function findAllTournamentTypes() {
    return TournamentType.findAll()
}

async function updateTournamentType(tournamentType) {
    TournamentType.update(tournamentType, { where: {id: tournamentType.id}})
}

async function addTournamentType() {
    const newTournamentType = { name: "Placeholder TournamentType" };
    return TournamentType.create(newTournamentType);
}

async function deleteTournamentType(id) {
    const deletedTournamentType = await TournamentType.findOne( {where: {id: id}});
    await TournamentType.destroy({where: {id: id}});
    return deletedTournamentType;
}
