module.exports = app => {
    const users = require("../controllers/users.controller.js");

    const router = require("express").Router();

    router.get("/:id", users.findOne);

    app.use('/api/users', router);
};