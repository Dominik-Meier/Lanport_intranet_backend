module.exports = app => {
    const lanparties = require("../controllers/lanparty.controller.js");

    var router = require("express").Router();

    // Retrieve all Lanparty
    router.get("/", lanparties.findAll);

    // Update a Lanparty with id
    router.put("/", lanparties.update);

    app.use('/api/lanparties', router);
};