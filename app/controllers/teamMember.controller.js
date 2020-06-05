const db = require("../models");
const TeamMember = db.teamMember;
const Op = db.Sequelize.Op;


exports.findAll = (req, res) => {
    TeamMember.findAll()
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

exports.findOne = (req, res) => {
};

exports.findByTournament = (req, res) => {
};

exports.findByTeam = (req, res) => {
};

exports.findByUser = (req, res) => {
};


exports.create = (req, res) => {
    const teamMember = req.body;
    if (teamMember) {
        const newTeamMember = {
            teamId: teamMember.team.id,
            userId: teamMember.user.id
        }
        TeamMember.create(newTeamMember);
    }

    res.status(200).send();
};


exports.update = (req, res) => {
    const teamMember = req.body;

    if(teamMember.id !== null) {
        console.log('update teamMember')
        TeamMember.update(teamMember, { where: {id: teamMember.id}});
    }
    res.status(200).send();
};


exports.delete = (req, res) => {
    const teamMember = req.body;

    if(teamMember.id !== null) {
        console.log('delete team')
        TeamMember.destroy(teamMember, { where: {id: teamMember.id}});
    }
    res.status(200).send();
};


