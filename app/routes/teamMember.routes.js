module.exports = app => {
    const teamMembers = require("../controllers/teamMember.controller.js");
    const auth = require("../util/auth")

    const router = require("express").Router();

    router.post("/", auth, teamMembers.create);
    router.delete("/:id", auth, teamMembers.delete);

    app.use('/api/teamMembers', router);
};