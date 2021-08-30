module.exports = app => {
    const tournamentTypes = require("../controllers/tournamenttype.controller.js");

    var router = require("express").Router();

    router.get("/", tournamentTypes.findAll);
    router.put("/", tournamentTypes.update);
    router.delete("/:id", tournamentTypes.delete);

    app.use('/api/tournamentTypes', router);
};