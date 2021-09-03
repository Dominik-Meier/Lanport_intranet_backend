const {grantAccess} = require("../util/roleBasedAccess");
module.exports = app => {
    const gamemodes = require("../controllers/gamemode.controller.js");
    const auth = require("../util/auth")

    const router = require("express").Router();

    router.get("/", auth, gamemodes.findAll);
    router.post("/", auth, grantAccess('mitglied'), gamemodes.create);
    router.put("/", auth, grantAccess('mitglied'), gamemodes.update);
    router.delete("/:id", auth, grantAccess('mitglied'), gamemodes.delete);

    app.use('/api/gamemodes', router);
};