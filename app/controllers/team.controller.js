const db = require("../models");
const Team = db.team;
const Op = db.Sequelize.Op;


exports.findAll = (req, res) => {
    Team.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Teams."
            });
        });
};

exports.findByTournament = (req, res) => {
};

exports.findByUser = (req, res) => {
};


exports.create = (req, res) => {
    team = req.body;
    if (team) {
        const newTeam = {
            name: team.name,
            pin: team.pin
        }
        Team.create(newTeam);
    }

    res.status(200).send();
};


exports.update = (req, res) => {
    const team = req.body;

    if(team.id !== null) {
        console.log('update team')
        Team.update(team, { where: {id: team.id}});
    }
    res.status(200).send();
};


exports.delete = (req, res) => {
    const team = req.body;

    if(team.id !== null) {
        console.log('delete team')
        Team.destroy(team, { where: {id: team.id}});
    }
    res.status(200).send();
};


