const {grantAccess} = require("../util/roleBasedAccess");
module.exports = app => {
    const feedback = require("../controllers/feedback.controller.js");
    const auth = require("../util/auth")

    const router = require("express").Router();

    router.get("/", auth, grantAccess('user'), feedback.getAll);
    router.get("/:id", auth, grantAccess('user'), feedback.getOne);
    router.post("/", auth, grantAccess('user'), feedback.create);
    router.put("/:id", auth, grantAccess('mitglied'), feedback.update);
    router.delete("/:id", auth, grantAccess('mitglied'), feedback.delete);

    app.use('/api/feedback', router);
};