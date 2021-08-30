module.exports = app => {
    const gamemodes = require("../controllers/gamemode.controller.js");

    var router = require("express").Router();

    router.get("/", gamemodes.findAll);
    router.put("/", gamemodes.update);
    router.delete("/:id", gamemodes.delete);

    app.use('/api/gamemodes', router);
};