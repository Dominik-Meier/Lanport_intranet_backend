module.exports = app => {
    const tournamentParticipant = require("../controllers/tournamentParticipant.controller.js");

    var router = require("express").Router();

    router.get("/tournament/:id", tournamentParticipant.findByTournament);
    router.post("/", tournamentParticipant.create);
    router.delete("/:id", tournamentParticipant.delete);

    app.use('/api/tournamentParticipants', router);
};