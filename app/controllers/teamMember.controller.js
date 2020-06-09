const db = require("../models");
const TeamMember = db.teamMember;
const User = db.user;
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


exports.create = async (req, res) => {
    const teamMember = req.body;
    if (teamMember) {
        //TODO implement restrictions for adding to team
        // 1. same team 2. in other team 3. fun main tournament miss matiching 4. limit of accepted members
        const dbTeamMember = await TeamMember.findOne( {where: { teamId: teamMember.teamId, userId: teamMember.user.id}});

        if (dbTeamMember) {
            res.status(403).send('User already exits in this team');
        } else {
            const newTeamMember = {
                teamId: teamMember.teamId,
                userId: teamMember.user.id
            }
            let resTeamMember = await TeamMember.create(newTeamMember);
            resTeamMember = await TeamMember.findOne( {where: {id: resTeamMember.id}, include: [User]});
            res.status(200).send(resTeamMember);
        }

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


