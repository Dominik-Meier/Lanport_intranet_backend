module.exports = app => {
    const lanparties = require("../controllers/lanparty.controller.js");

    var router = require("express").Router();

    router.get("/", lanparties.findAll);
    router.put("/", lanparties.update);
    router.put("/:id", lanparties.delete);

    app.use('/api/lanparties', router);
};