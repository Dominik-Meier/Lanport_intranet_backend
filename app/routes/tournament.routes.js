module.exports = app => {
    const tournaments = require("../controllers/tournament.controller.js");

    var router = require("express").Router();

    // Retrieve all Tutorials
    router.get("/", tournaments.findAll);

    // Retrieve all published Tutorials
    router.get("/published", tournaments.findAllPublished);

    // Retrieve a single Tutorial with id
    router.get("/:id", tournaments.findOne);

    // Update a Tutorial with id
    router.put("/", tournaments.updateAll);

    // Update a Tutorial with id
    router.put("/:id", tournaments.update);

    app.use('/api/tournaments', router);
};