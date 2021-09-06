const {addTournamentType} = require("../repo/TournamentTypeRepo");
const {logger} = require('../../app')
const {findAllTournamentsByTournamentType} = require("../repo/TournamentRepo");
const {deleteTournamentType} = require("../repo/TournamentTypeRepo");
const {updateTournamentType} = require("../repo/TournamentTypeRepo");
const {findAllTournamentTypes} = require("../repo/TournamentTypeRepo");

module.exports = {
    getAllTournamentTypes: getAllTournamentTypes,
    createTournamentType: createTournamentType,
    updateExistingTournamentTypes: updateExistingTournamentTypes,
    removeTournamentType: removeTournamentType
}

function getAllTournamentTypes() {
    return findAllTournamentTypes();
}

async function createTournamentType() {
    logger.info('create new tournamentType');
    await addTournamentType();
}

async function updateExistingTournamentTypes(tournamentTypes) {
    for (let tournamentType of tournamentTypes) {
        logger.info('update new tournamentType: '.concat(tournamentType.id));
        await updateTournamentType(tournamentType);
    }
}

async function removeTournamentType(id) {
    const tournaments = await findAllTournamentsByTournamentType(id);
    if (tournaments !== null && tournaments.length > 0) {
        throw 'TournamentType is null or used in tournaments!'
    } else {
        return deleteTournamentType(id);
    }
}