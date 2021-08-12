const db = require("../models");
const Tournament = db.tournament;
const TournamentType = db.tournamentType;
const Lanparty = db.lanparty;
const Gamemode = db.gamemode;
const Op = db.Sequelize.Op;

// Retrieve all Tournaments from the database.
exports.findAll = (req, res) => {
    const name = req.query.name;
    var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;

    Tournament.findAll({ where: condition, include: [TournamentType, Lanparty, Gamemode]})
        .then(data => {
            res.send(data);
        })
        .catch(err => { res.status(500).send('Server Error') });
};

// Find a single Tournament with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Tournament.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => { res.status(500).send('Server Error') });
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
        .catch(err => { res.status(500).send('Server Error') });
};

// Update a Tournament by the id in the request
exports.updateAll = (req, res) => {
    console.log(req.body);

    for (let tournament of req.body) {
        if(tournament.id !== null) {
            console.log('update tournament');
            const DBTournament = {
                id: tournament.id,
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
            Tournament.update(DBTournament, { where: {id: tournament.id}});
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
        .catch(err => { res.status(500).send('Server Error') });
};