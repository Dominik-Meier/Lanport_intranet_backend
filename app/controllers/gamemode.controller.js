const db = require("../models");
const Gamemode = db.gamemode;
const Op = db.Sequelize.Op;

// Create and Save a new TournamentType
exports.create = (req, res) => {
    if (!req.body.name) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    const gamemode = {
        name: req.body.name,
        game: req.body.game,
        teamSize: req.body.teamSize,
        rules: req.body.rules,
    };

    Gamemode.create(gamemode)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Gamemode."
            });
        });

};

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

// Find a single Gamemode with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Gamemode.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Gamemode with id=" + id
            });
        });
};

// Update a Gamemode by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    Gamemode.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num === 1) {
                res.send({
                    message: "Gamemode was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Gamemode with id=${id}. Maybe Gamemode was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Gamemode with id=" + id
            });
        });
};

// Delete a Gamemode with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Gamemode.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num === 1) {
                res.send({
                    message: "Gamemode was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Gamemode with id=${id}. Maybe Gamemode was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Gamemode with id=" + id
            });
        });
};

