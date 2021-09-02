const {grantAccess} = require("../util/roleBasedAccess");
module.exports = app => {
    const tournaments = require("../controllers/tournament.controller.js");
    const auth = require("../util/auth")

    const router = require("express").Router();

    router.get("/", auth, tournaments.findAll);
    router.post("/", auth, grantAccess('mitglied'), tournaments.addTournament);
    router.put("/", auth, grantAccess('mitglied'), tournaments.updateAll);
    router.delete("/:id", auth, grantAccess('mitglied'), tournaments.deleteTournament);

    app.use('/api/tournaments', router);
};