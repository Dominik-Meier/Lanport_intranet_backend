module.exports = app => {
    const tournamentParticipant = require("../controllers/tournamentParticipant.controller.js");
    const auth = require("../util/auth")

    const router = require("express").Router();

    router.get("/tournament/:id", auth, tournamentParticipant.findByTournament);
    router.post("/", auth, tournamentParticipant.create);
    router.delete("/:id", auth, tournamentParticipant.delete);

    app.use('/api/tournamentParticipants', router);
};