module.exports = app => {
    const gamemodes = require("../controllers/gamemode.controller.js");
    const auth = require("../util/auth")

    const router = require("express").Router();

    router.get("/", auth, gamemodes.findAll);
    router.put("/", auth, gamemodes.update);
    router.delete("/:id", auth, gamemodes.delete);

    app.use('/api/gamemodes', router);
};