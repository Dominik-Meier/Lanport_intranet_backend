const {grantAccess} = require("../util/roleBasedAccess");
module.exports = app => {
    const tournamentTypes = require("../controllers/tournamenttype.controller.js");
    const auth = require("../util/auth")

    const router = require("express").Router();

    router.get("/", auth, tournamentTypes.findAll);
    router.post("/", auth, grantAccess('mitglied'), tournamentTypes.create);
    router.put("/", auth, grantAccess('mitglied'), tournamentTypes.update);
    router.delete("/:id", auth, grantAccess('mitglied'), tournamentTypes.delete);

    app.use('/api/tournamentTypes', router);
};