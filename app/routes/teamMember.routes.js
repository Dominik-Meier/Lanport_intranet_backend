module.exports = app => {
    const teamMembers = require("../controllers/teamMember.controller.js");

    var router = require("express").Router();

    router.get("/", teamMembers.findAll);
    router.get("/:id", teamMembers.findOne);
    router.get("/tournament/:id", teamMembers.findByTournament);
    router.get("/team/:id", teamMembers.findByTeam);
    router.get("/user/:id", teamMembers.findByUser);

    router.post("/", teamMembers.create);

    router.put("/:id", teamMembers.update);

    router.delete("/:id", teamMembers.delete);

    app.use('/api/teamMembers', router);
};