module.exports = app => {
    const teams = require("../controllers/team.controller.js");

    var router = require("express").Router();

    router.get("/", teams.findAll);
    router.get("/tournament/:id", teams.findByTournament);
    router.post("/", teams.create);

    app.use('/api/teams', router);
};