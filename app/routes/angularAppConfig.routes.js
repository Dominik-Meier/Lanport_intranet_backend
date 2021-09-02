const {grantAccess} = require("../util/roleBasedAccess");
module.exports = app => {
    const angularAppConfig = require("../controllers/angularAppConfig.controller.js");
    const auth = require("../util/auth")

    const router = require("express").Router();

    router.get("/", auth, angularAppConfig.find);
    router.post("/", auth, grantAccess('mitglied'), angularAppConfig.create);
    router.delete("/appComponent/:id", auth, grantAccess('mitglied'), angularAppConfig.deleteAppComponent);
    router.post("/appComponent", auth, grantAccess('mitglied'), angularAppConfig.addAppComponent);

    app.use('/api/settings/angularAppConfig', router);
};