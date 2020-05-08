const db = require("../models");
const Tournament = db.tournament;
const TournamentType = db.tournamentType;
const Lanparty = db.lanparty;
const Gamemode = db.gamemode;
const Op = db.Sequelize.Op;

// Create and Save a new Tournament
exports.create = (req, res) => {
    if (!req.body.name) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    const tournament = {
        name: req.body.name,
        description: req.body.description,
        published: req.body.published ? req.body.published : false,
        lanpartyId: req.body.lanpartyId ? req.body.lanpartyId : null
    };

    Tournament.create(tournament)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the tournament."
            });
        });

};

// Retrieve all Tournaments from the database.
exports.findAll = (req, res) => {
    const name = req.query.name;
    var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;

    Tournament.findAll({ where: condition, include: [TournamentType, Lanparty, Gamemode]})
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Tournaments."
            });
        });
};

// Find a single Tournament with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Tournament.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Tournament with id=" + id
            });
        });
};

// Update a Tournament by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    Tournament.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num === 1) {
                res.send({
                    message: "Tournament was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Tournament with id=${id}. Maybe Tournament was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Tournament with id=" + id
            });
        });
};

// Update a Tournament by the id in the request
exports.updateAll = (req, res) => {
    console.log(req.body);

    for (let tournament of req.body) {
        if(tournament.id !== null) {
            console.log('update tournament');
            Tournament.update(tournament, { where: {id: tournament.id}});
        } else if (tournament.id === null) {
            console.log('create new tournament');
            const newTournament = {
                name: tournament.name,
                description: tournament.description,
                lanpartyId: tournament.lanparty.id,
                gamemodeId: tournament.gameMode.id,
                tournamentTypeId: tournament.tournamentType.id,
                teamRegistration: tournament.teamRegistration,
                numberOfParticipants: tournament.numberOfParticipants,
                published: tournament.published,
                started: tournament.started,
                startDate: tournament.startDate,
                finished: tournament.finished,
            };
            Tournament.create(newTournament);
        }
    }

    res.status(200).send();
};


// Find all published Tournaments
exports.findAllPublished = (req, res) => {
    Tournament.findAll({ where: { published: true } })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Tournaments."
            });
        });
};