module.exports = app => {
    const gamemodes = require("../controllers/gamemode.controller.js");

    var router = require("express").Router();

    // Create a new Tutorial
    router.post("/", gamemodes.create);

    // Retrieve all Tutorials
    router.get("/", gamemodes.findAll);

    // Retrieve a single Tutorial with id
    router.get("/:id", gamemodes.findOne);

    // Update a Tutorial with id
    router.put("/:id", gamemodes.update);

    // Delete a Tutorial with id
    router.delete("/:id", gamemodes.delete);

    app.use('/api/gamemodes', router);
};