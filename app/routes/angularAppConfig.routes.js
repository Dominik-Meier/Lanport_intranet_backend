module.exports = app => {
    const angularAppConfig = require("../controllers/angularAppConfig.controller.js");
    const auth = require("../util/auth")

    const router = require("express").Router();

    router.get("/", auth, angularAppConfig.find);
    router.post("/", auth, angularAppConfig.create);
    router.delete("/appComponent/:id", auth, angularAppConfig.deleteAppComponent);
    router.post("/appComponent", auth, angularAppConfig.addAppComponent);

    app.use('/api/settings/angularAppConfig', router);
};