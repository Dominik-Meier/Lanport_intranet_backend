module.exports = app => {
    const tournamentTypes = require("../controllers/tournamenttype.controller.js");
    const auth = require("../util/auth")

    const router = require("express").Router();

    router.get("/", auth, tournamentTypes.findAll);
    router.put("/", auth, tournamentTypes.update);
    router.delete("/:id", auth, tournamentTypes.delete);

    app.use('/api/tournamentTypes', router);
};