module.exports = app => {
    const angularAppConfig = require("../controllers/angularAppConfig.controller.js");

    var router = require("express").Router();

    // Retrieve angularAppConfig
    router.get("/", angularAppConfig.find);

    // Overwrite angularAppConfig
    router.post("/", angularAppConfig.create);

    // Update angularAppConfig
    router.put("/", angularAppConfig.update);

    app.use('/api/settings/angularAppConfig', router);
};