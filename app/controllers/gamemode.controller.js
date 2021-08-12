const db = require("../models");
const {deleteGameMode} = require("../ControllerDelegates/gamemodeDelegate");
const {updateOrCreateGameMode} = require("../ControllerDelegates/gamemodeDelegate");
const {getAllGameModes} = require("../ControllerDelegates/gamemodeDelegate");
const Gamemode = db.gamemode;
const Op = db.Sequelize.Op;


// Retrieve all Gamemode from the database.
exports.findAll = (req, res) => {
    getAllGameModes()
        .then( allGameModes => {
            if (allGameModes) {
                res.send(allGameModes);
            } else {
                res.status(404).send('No GameModes Found');
            }
        })
        .catch(err => { res.status(500).send('Server Error') });
};

// Update a Gamemode by the id in the request
exports.update = (req, res) => {
    updateOrCreateGameMode(req.body)
        .then( () => { res.status(200).send(); })
        .catch(err => { res.status(500).send('Server Error') });
};

exports.delete = (req, res) => {
    const id = req.params.id;
    deleteGameMode(id)
        .then(res.status(200).send())
        .catch(err => { res.status(500).send('Server Error') });
};


