module.exports = app => {
    const tournamentTypes = require("../controllers/tournamenttype.controller.js");

    var router = require("express").Router();

    router.get("/", tournamentTypes.findAll);
    router.put("/", tournamentTypes.update);

    app.use('/api/tournamentTypes', router);
};