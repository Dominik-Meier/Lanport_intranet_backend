const db = require("../models");
const TournamentType = db.tournamentType;
const Op = db.Sequelize.Op;

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

// Update a TournamentType by the id in the request
exports.update = (req, res) => {

    for (let tournamentType of req.body) {
        if(tournamentType.id !== null) {
            console.log('update tournamentType')
            TournamentType.update(tournamentType, { where: {id: tournamentType.id}});
        } else if (tournamentType.id === null) {
            console.log('create new tournamentType')

            const newTournamentType = {
                name: tournamentType.name,
            };
            TournamentType.create(newTournamentType);
        }
    }

    res.status(200).send();
};


