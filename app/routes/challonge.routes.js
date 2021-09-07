const {grantAccess} = require("../util/roleBasedAccess");
module.exports = app => {
    const challonge = require("../controllers/challonge.controller.js");
    const auth = require("../util/auth")

    const router = require("express").Router();

    router.get("/:id", auth, grantAccess('mitglied'), challonge.getTournament);
    router.post("/:id", auth, grantAccess('mitglied'), challonge.create);
    router.put("/:id", auth, grantAccess('mitglied'), challonge.updateTournament);
    router.delete("/:id", auth, grantAccess('mitglied'), challonge.deleteTournament);

    router.post("/:id/participants/", auth, grantAccess('mitglied'), challonge.addParticipants)
    router.put("/:id/participants/", auth, grantAccess('mitglied'), challonge.updateParticipants)

    app.use('/api/tournaments/challonge', router);
};