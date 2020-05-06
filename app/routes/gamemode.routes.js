module.exports = app => {
    const gamemodes = require("../controllers/gamemode.controller.js");

    var router = require("express").Router();

    // Retrieve all Tutorials
    router.get("/", gamemodes.findAll);

    // Update a Tutorial with id
    router.put("/", gamemodes.update);

    app.use('/api/gamemodes', router);
};