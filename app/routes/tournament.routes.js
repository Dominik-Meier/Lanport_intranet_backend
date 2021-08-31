module.exports = app => {
    const tournaments = require("../controllers/tournament.controller.js");
    const auth = require("../util/auth")

    const router = require("express").Router();

    router.get("/", auth, tournaments.findAll);
    router.post("/", auth, tournaments.addTournament);
    router.put("/", auth, tournaments.updateAll);
    router.delete("/:id", auth, tournaments.deleteTournament)

    app.use('/api/tournaments', router);
};