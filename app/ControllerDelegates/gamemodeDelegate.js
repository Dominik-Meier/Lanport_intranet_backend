const db = require("../models");
const Gamemode = db.gamemode;

module.exports = {
    updateOrCreateGameMode: updateOrCreateGameMode,
    getAllGameModes: getAllGameModes,
    deleteGameMode: deleteGameMode
}

async function getAllGameModes() {
    return await Gamemode.findAll()
        .then(data => {
            return data
        })
        .catch(err => null);
}

async function updateOrCreateGameMode(gameMode) {
    if (gameMode.id !== null) {
        console.log('update gameMode with id: ', id);
        await Gamemode.update(gameMode, { where: {id: gameMode.id}});
    } else {
        console.log('create new gameMode')
        const newGameMode = {
            name: gameMode.name,
            game:  gameMode.game,
            elimination: gameMode.elimination,
            teamSize: gameMode.teamSize,
            rules: gameMode.rules,
        };
        await Gamemode.create(newGameMode);
    }
}

async function deleteGameMode(id) {
    const gameMode = await Gamemode.findOne({where: {id: id}});
    if (gameMode) {
        return await Gamemode.destroy(gameMode, {where: {id: gameMode.id}});
    } else {
        return null;
    }
}
