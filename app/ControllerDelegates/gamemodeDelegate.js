const {findAllTournamentsByGameMode} = require("../repo/TournamentRepo");
const {deleteGameMode} = require("../repo/GameModeRepo");
const {createGameMode} = require("../repo/GameModeRepo");
const {updateGameMode} = require("../repo/GameModeRepo");
const {findAllGameModes} = require("../repo/GameModeRepo");
const {logger} = require('../../app')

module.exports = {
    updateExistingGameModes: updateExistingGameModes,
    addGameMode: addGameMode,
    getAllGameModes: getAllGameModes,
    removeGameMode: removeGameMode
}

async function getAllGameModes() {
    return findAllGameModes();
}

async function addGameMode() {
    logger.info('create new gameMode')
    await createGameMode()
}

async function updateExistingGameModes(gameModes) {
    for (const gameMode of gameModes) {
        logger.info('update gameMode with id: ', gameMode.id);
        await updateGameMode(gameMode);
    }
}

async function removeGameMode(id) {
    const tournaments = await findAllTournamentsByGameMode(id);
    if (tournaments !== null && tournaments.length > 0) {
        throw 'GameMode is null or used in tournaments!'
    } else {
        return  deleteGameMode(id)
    }
}
