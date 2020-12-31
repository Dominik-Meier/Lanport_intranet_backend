module.exports = app => {
    const tournamentParticipant = require("../controllers/tournamentParticipant.controller.js");

    var router = require("express").Router();

    router.get("/", tournamentParticipant.findAll);
    router.get("/tournament/:id", tournamentParticipant.findByTournament);
    router.get("/user/:id", tournamentParticipant.findByUser);

    router.post("/", tournamentParticipant.create);

    router.delete("/:id", tournamentParticipant.delete);

    app.use('/api/tournamentParticipants', router);
};