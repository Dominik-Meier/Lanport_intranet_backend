const {findAllTournamentsByGameMode} = require("../repo/TournamentRepo");
const {deleteGameMode} = require("../repo/GameModeRepo");
const {createGameMode} = require("../repo/GameModeRepo");
const {updateGameMode} = require("../repo/GameModeRepo");
const {findAllGameModes} = require("../repo/GameModeRepo");

module.exports = {
    updateOrCreateGameMode: updateOrCreateGameMode,
    getAllGameModes: getAllGameModes,
    removeGameMode: removeGameMode
}

async function getAllGameModes() {
    return findAllGameModes();
}

async function updateOrCreateGameMode(gameModes) {
    for (const gameMode of gameModes) {
        if (gameMode.id !== null) {
            console.log('update gameMode with id: ', gameMode.id);
            await updateGameMode(gameMode);
        } else {
            console.log('create new gameMode')
            await createGameMode(gameMode)
        }
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
