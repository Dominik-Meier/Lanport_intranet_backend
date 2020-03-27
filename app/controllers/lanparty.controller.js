const db = require("../models");
const Lanparty = db.lanparty;
const Op = db.Sequelize.Op;

// Create and Save a new lanparty
exports.create = (req, res) => {
    if (!req.body.name || !req.body.startDate || req.body.endDate) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    const lanparty = {
        name: req.body.name,
        active:  false,
        startDate: req.body.active ? req.body.active : null,
        endDate: req.body.active ? req.body.active : null,
    };

    Lanparty.create(lanparty)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the lanparty."
            });
        });

};

// Retrieve all lanparty from the database.
exports.findAll = (req, res) => {
    const name = req.query.name;
    var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;

    Lanparty.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving lanpartys."
            });
        });
};

// Find a single lanparty with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Lanparty.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving lanparty with id=" + id
            });
        });
};

// Update a lanparty by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    Lanparty.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num === 1) {
                res.send({
                    message: "lanparty was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update lanparty with id=${id}. Maybe lanparty was not found or req.body is empty!`
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

    Lanparty.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num === 1) {
                res.send({
                    message: "lanparty was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete lanparty with id=${id}. Maybe lanparty was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete lanparty with id=" + id
            });
        });
};

// Delete all lanparty from the database.
exports.deleteAll = (req, res) => {
    Lanparty.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} lanparty were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all lanparty."
            });
        });
};
