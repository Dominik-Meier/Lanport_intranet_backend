module.exports = app => {
    const users = require("../controllers/users.controller.js");

    var router = require("express").Router();

    // Retrieve all users
    router.get("/", users.findAll);

    // Retrieve one user
    router.get("/:id", users.findOne);

    app.use('/api/users', router);
};