module.exports = app => {
    const tournamentTypes = require("../controllers/tournamenttype.controller.js");

    var router = require("express").Router();

    // Retrieve all Tutorials
    router.get("/", tournamentTypes.findAll);

    // Update a Tutorial with id
    router.put("/", tournamentTypes.update);

    app.use('/api/tournamentTypes', router);
};