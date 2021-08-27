module.exports = app => {
    const tournaments = require("../controllers/tournament.controller.js");

    var router = require("express").Router();

    router.get("/", tournaments.findAll);
    router.post("/", tournaments.addTournament);
    router.put("/", tournaments.updateAll);
    router.delete("/:id", tournaments.deleteTournament)

    app.use('/api/tournaments', router);
};