const {grantAccess} = require("../util/roleBasedAccess");
module.exports = app => {
    const lanparties = require("../controllers/lanparty.controller.js");
    const auth = require("../util/auth")

    const router = require("express").Router();

    router.get("/", auth, lanparties.findAll);
    router.post("/", auth, grantAccess("mitglied"), lanparties.create)
    router.put("/", auth, grantAccess('mitglied'), lanparties.update);
    router.delete("/:id", auth, grantAccess('mitglied'), lanparties.delete);

    app.use('/api/lanparties', router);
};