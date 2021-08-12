const {readConfigFromFile} = require("../ControllerDelegates/angularAppConfigDelegate");
const {writeConfigFile} = require("../ControllerDelegates/angularAppConfigDelegate");

// Create and Save a new angularAppConfig
exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send('Body can not be empty!');
    } else {
        writeConfigFile(req.body);
        res.status(201).send(readConfigFromFile());
    }
};

// Find a single angularAppConfig
exports.find = (req, res) => {
    res.status(200).send(readConfigFromFile());
};

