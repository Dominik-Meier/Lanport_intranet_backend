module.exports = app => {
    const angularAppConfig = require("../controllers/angularAppConfig.controller.js");

    var router = require("express").Router();

    router.get("/", angularAppConfig.find);
    router.post("/", angularAppConfig.create);
    router.delete("/appComponent/:id", angularAppConfig.deleteAppComponent);
    router.post("/appComponent", angularAppConfig.addAppComponent);

    app.use('/api/settings/angularAppConfig', router);
};