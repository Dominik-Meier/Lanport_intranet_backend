const fs = require('fs');

// Create and Save a new angularAppConfig
exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Body can not be empty!"
        });
        return;
    }

    fs.writeFileSync('angularAppConfig.json', JSON.stringify(req.body));
    const readfile = fs.readFileSync('angularAppConfig.json', 'utf-8');
    const resData = JSON.parse(readfile.toString());
    res.status(201).send(resData);
};



// Find a single angularAppConfig
exports.find = (req, res) => {
    const readfile = fs.readFileSync('angularAppConfig.json', 'utf-8');
    const resData = JSON.parse(readfile.toString());
    res.status(200).send(resData);
};

// Update a angularAppConfig
exports.update = (req, res) => {

};
