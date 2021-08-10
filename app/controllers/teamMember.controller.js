const db = require("../models");
const TeamMember = db.teamMember;
const Team = db.team;
const TournamentType = db.tournamentType;
const Lanparty = db.lanparty;
const Gamemode = db.gamemode;
const User = db.user;
const Tournament = db.tournament;
const {sendMsg} = require("../../app");


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
    const pin = req.query.pin;
    if (teamMember) {
        const dbTeamMember = await TeamMember.findOne( {where: { teamId: teamMember.teamId, userId: teamMember.user.id}});
        const dbTeam = await Team.findOne( {where: { id: teamMember.teamId}, include: [TeamMember]});
        const allTournamentTeams = await Team.findAll( {where: {tournamentId: dbTeam.tournamentId}, include: [TeamMember]})
        const tournament = await Tournament.findOne( {where: {id: dbTeam.tournamentId}, include: [Gamemode]});
        let joinedOtherTeam = false;

        for (let tournamentTeam of allTournamentTeams) {
            tournamentTeam.teamMembers.find( t => {
                if (t.userId === teamMember.user.id) {
                    joinedOtherTeam = true;
                }
            });
        }

        if (dbTeamMember) {
            res.status(403).send('User already exits in this team');
        } else if (tournament.gamemode.teamSize <= dbTeam.teamMembers.length) {
            res.status(403).send('Team maximum size reached');
        } else if (tournament.published === true) {
            res.status(403).send('Tournament is not open for registration!');
        } else if (dbTeam.pin.toString() !== pin.toString()) {
            res.status(403).send('Pin does not match');
        } else if (joinedOtherTeam) {
          res.status(403).send('User is in other team for tournament');
        } else {
            const newTeamMember = {
                teamId: teamMember.teamId,
                userId: teamMember.user.id
            }
            let resTeamMember = await TeamMember.create(newTeamMember);
            const createdTeamMebmer = await TeamMember.findOne( {where: {id: resTeamMember.id}, include: [User]});
            res.status(200).send();

            const teamMemberEvent = {
                event: 'TeamMemberJoinedEvent',
                data: JSON.stringify(createdTeamMebmer)
            }
            sendMsg(teamMemberEvent);
        }

    } else {
        res.status(404).send('TeamMember not found');
    }
};


exports.update = (req, res) => {
    const teamMember = req.body;

    if(teamMember.id !== null) {
        console.log('update teamMember')
        TeamMember.update(teamMember, { where: {id: teamMember.id}});
    }
    res.status(200).send();
};


exports.delete = async (req, res) => {
    const id = req.params.id;
    if(id !== null) {
        const deletedTeamMember = await TeamMember.findOne( {where: {id: id}, include: [User]});
        const team = await Team.findOne( {where: {id: deletedTeamMember.teamId}, include: [{model: TeamMember, include: [User]}, {model: Tournament, include: [TournamentType, Lanparty, Gamemode]}]});
        const tournament = await Tournament.findOne( {where: {id: team.tournamentId}, include: [Gamemode]});

        if (tournament.published === true) {
            res.status(403).send('Tournament is not open for changes');
        } else {
            await TeamMember.destroy({ where: {id: id}});

            res.status(200).send();

            const teamMemberEvent = {
                event: 'TeamMemberLeftEvent',
                data: JSON.stringify(deletedTeamMember)
            }
            sendMsg(teamMemberEvent);

            if (team.teamMembers.length === 1) {
                await Team.destroy({where: {id: team.id}})

                const teamDeletedEvent = {
                    event: 'TeamDeletedEvent',
                    data: JSON.stringify(team)
                }
                setTimeout(() => {sendMsg(teamDeletedEvent)}, 100);
            }
        }
    }
};


