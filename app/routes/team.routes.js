module.exports = app => {
    const teams = require("../controllers/team.controller.js");

    var router = require("express").Router();

    router.get("/", teams.findAll);
    router.get("/tournament/:id", teams.findByTournament);
    router.get("/user/:id", teams.findByUser);

    router.post("/", teams.create);

    router.put("/:id", teams.update);

    router.delete("/:id", teams.delete);

    app.use('/api/teams', router);
};