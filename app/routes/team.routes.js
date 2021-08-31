module.exports = app => {
    const teams = require("../controllers/team.controller.js");
    const auth = require("../util/auth")

    const router = require("express").Router();

    router.get("/tournament/:id", auth, teams.findByTournament);
    router.post("/", auth, teams.create);

    app.use('/api/teams', router);
};