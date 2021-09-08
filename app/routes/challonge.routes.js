const {grantAccess} = require("../util/roleBasedAccess");
module.exports = app => {
    const challonge = require("../controllers/challonge.controller.js");
    const auth = require("../util/auth")

    const router = require("express").Router();

    router.get("/:id", auth, grantAccess('mitglied'), challonge.getTournament);
    router.post("/:id", auth, grantAccess('mitglied'), challonge.create);
    router.put("/:id", auth, grantAccess('mitglied'), challonge.updateTournament);
    router.post("/:id/start", auth, grantAccess('mitglied'), challonge.startTournament);

    router.post("/:id/participants/", auth, grantAccess('mitglied'), challonge.addParticipants)
    router.delete("/:id/participants/", auth, grantAccess('mitglied'), challonge.deleteParticipants)

    app.use('/api/tournaments/challonge', router);
};