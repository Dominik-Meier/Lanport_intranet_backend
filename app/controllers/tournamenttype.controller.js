const db = require("../models");
const TournamentType = db.tournamentType;
const Op = db.Sequelize.Op;

// Create and Save a new TournamentType
exports.create = (req, res) => {
    if (!req.body.name) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    const type = {
        name: req.body.name,
    };

    TournamentType.create(type)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the TournamentType."
            });
        });

};

// Retrieve all TournamentType from the database.
exports.findAll = (req, res) => {
    const name = req.query.name;
    var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;

    TournamentType.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving TournamentType."
            });
        });
};

// Find a single TournamentType with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    TournamentType.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving TournamentType with id=" + id
            });
        });
};

// Update a TournamentType by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    TournamentType.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num === 1) {
                res.send({
                    message: "TournamentType was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update TournamentType with id=${id}. Maybe TournamentType was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Tournament with id=" + id
            });
        });
};

// Delete a lanparty with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    TournamentType.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num === 1) {
                res.send({
                    message: "TournamentType was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete TournamentType with id=${id}. Maybe TournamentType was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete TournamentType with id=" + id
            });
        });
};

