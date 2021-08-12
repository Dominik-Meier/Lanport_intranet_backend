module.exports = app => {
    const tournaments = require("../controllers/tournament.controller.js");

    var router = require("express").Router();

    router.get("/", tournaments.findAll);
    router.put("/", tournaments.updateAll);

    app.use('/api/tournaments', router);
};