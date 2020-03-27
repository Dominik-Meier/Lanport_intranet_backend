module.exports = app => {
    const tournamentTypes = require("../controllers/tournamenttype.controller.js");

    var router = require("express").Router();

    // Create a new Tutorial
    router.post("/", tournamentTypes.create);

    // Retrieve all Tutorials
    router.get("/", tournamentTypes.findAll);

    // Retrieve a single Tutorial with id
    router.get("/:id", tournamentTypes.findOne);

    // Update a Tutorial with id
    router.put("/:id", tournamentTypes.update);

    // Delete a Tutorial with id
    router.delete("/:id", tournamentTypes.delete);

    app.use('/api/tournamentTypes', router);
};