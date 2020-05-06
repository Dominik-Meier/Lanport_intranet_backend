const db = require("../models");
const Gamemode = db.gamemode;
const Op = db.Sequelize.Op;


// Retrieve all Gamemode from the database.
exports.findAll = (req, res) => {
    const name = req.query.name;
    var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;

    Gamemode.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Gamemode."
            });
        });
};

// Update a Gamemode by the id in the request
exports.update = (req, res) => {

    for (let gameMode of req.body) {
        if(gameMode.id !== null) {
            console.log('update gameMode')
            Gamemode.update(gameMode, { where: {id: gameMode.id}});
        } else if (gameMode.id === null) {
            console.log('create new gameMode')
            const newGameMode = {
                name: gameMode.name,
                game:  gameMode.game,
                teamSize: gameMode.teamSize,
                rules: gameMode.rules,
            };
            Gamemode.create(newGameMode);
        }
    }

    Gamemode.findAll()
        .then( data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving lanpartys."
            });
        });
};


