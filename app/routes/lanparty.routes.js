module.exports = app => {
    const lanparties = require("../controllers/lanparty.controller.js");

    var router = require("express").Router();

    // Create a new Tutorial
    router.post("/", lanparties.create);

    // Retrieve all Tutorials
    router.get("/", lanparties.findAll);

    // Retrieve a single Tutorial with id
    router.get("/:id", lanparties.findOne);

    // Update a Tutorial with id
    router.put("/:id", lanparties.update);

    // Delete a Tutorial with id
    router.delete("/:id", lanparties.delete);

    // Create a new Tutorial
    router.delete("/", lanparties.deleteAll);

    app.use('/api/lanparties', router);
};