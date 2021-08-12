module.exports = app => {
    const teamMembers = require("../controllers/teamMember.controller.js");

    var router = require("express").Router();

    router.post("/", teamMembers.create);
    router.delete("/:id", teamMembers.delete);

    app.use('/api/teamMembers', router);
};