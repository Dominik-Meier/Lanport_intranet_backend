const db = require("../models");
const GameMode = db.gamemode;

module.exports = {
    findAllGameModes: findAllGameModes,
    updateGameMode: updateGameMode,
    createGameMode: createGameMode,
    deleteGameMode: deleteGameMode
}

async function findAllGameModes() {
    return GameMode.findAll()
}

async function updateGameMode(gameMode) {
    GameMode.update(gameMode, { where: {id: gameMode.id}})
}

async function createGameMode() {
    const newGameMode = {
        name: "GameMode Placeholder",
        game: "Game Placeholder",
        elimination: "Placeholder",
        teamSize: 0,
        rules: ""
    };
    return GameMode.create(newGameMode);
}

async function deleteGameMode(id) {
    const deletedGameMode = await GameMode.findOne( {where: {id: id}});
    await GameMode.destroy({where: {id: id}});
    return deletedGameMode;
}
