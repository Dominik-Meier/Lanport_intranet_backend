module.exports = app => {
    const tournaments = require("../controllers/tournament.controller.js");

    var router = require("express").Router();

    // Create a new Tutorial
    router.post("/", tournaments.create);

    // Retrieve all Tutorials
    router.get("/", tournaments.findAll);

    // Retrieve all published Tutorials
    router.get("/published", tournaments.findAllPublished);

    // Retrieve a single Tutorial with id
    router.get("/:id", tournaments.findOne);

    // Update a Tutorial with id
    router.put("/:id", tournaments.update);

    // Delete a Tutorial with id
    router.delete("/:id", tournaments.delete);

    // Create a new Tutorial
    router.delete("/", tournaments.deleteAll);

    app.use('/api/tournaments', router);
};