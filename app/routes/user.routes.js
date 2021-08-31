module.exports = app => {
    const users = require("../controllers/users.controller.js");

    const router = require("express").Router();

    router.get("/:id", users.findOne);
    router.post("/refreshToken", users.refreshToken);

    app.use('/api/users', router);
};