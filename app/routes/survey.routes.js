const {grantAccess} = require("../util/roleBasedAccess");
module.exports = app => {
    const survey = require("../controllers/survey.controller.js");
    const auth = require("../util/auth")
    const router = require("express").Router();

    router.get("/:id", auth, grantAccess('guest'), survey.find);
    router.get("/", auth, grantAccess('guest'), survey.findAll);
    router.get("/statistic/:id", auth, grantAccess('guest'), survey.getStats);
    router.post("/answer/:id", auth, grantAccess('guest'), survey.postAnswer);
    router.post("/", auth, grantAccess('mitglied'), survey.create);
    router.delete("/:id", auth, grantAccess('mitglied'), survey.delete);

    app.use('/api/survey', router);
};