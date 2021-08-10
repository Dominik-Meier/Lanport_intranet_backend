const db = require("../models");
const {sendMsg} = require("../../app");
const Team = db.team;
const Tournament = db.tournament;
const TournamentType = db.tournamentType;
const Lanparty = db.lanparty;
const Gamemode = db.gamemode;
const TeamMembers = db.teamMember;
const User = db.user;
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

exports.findByTournament = async (req, res) => {
    const id = req.params.id;
    const resTeams = await Team.findAll( {where: {tournamentId: id}, include: [{model: Tournament, include: [TournamentType, Lanparty, Gamemode]}]})
    for (let team of resTeams) {
        const tm = await TeamMembers.findAll( {where: {teamId: team.id}, include: [User]});
        team.teamMembers = tm;
        team.setDataValue('teamMembers', tm);
    }
    console.log('findByTournament found teams: ', resTeams.length, resTeams);
    res.send(resTeams);
};

exports.findByUser = (req, res) => {
};


exports.create = async (req, res) =>  {
    team = req.body;
    if (team) {
        const newTeam = { name: team.name, pin: team.pin, tournamentId: team.tournament.id };
        const tournament = await Tournament.findOne( {where: {id: team.tournament.id}, include: [Team]});
        if (tournament.teams.length >= tournament.numberOfParticipants) {
            res.status(403).send('Maximum of teams reached for tournament');
        } else if (tournament.published === true ) {
            res.status(403).send('Tournament is not open for changes');
        } else {
            let createdTeam = await Team.create(newTeam);
            createdTeam = await Team.findOne({where: {id: createdTeam.id}, include: [{model: Tournament, include: [TournamentType, Lanparty, Gamemode]}]});

            const newTeamMember = { teamId: createdTeam.id, userId: team.teamMembers[0].user.id };
            let createdTeamMebmer = await TeamMembers.create(newTeamMember);
            createdTeamMebmer = await TeamMembers.findOne( {where: {id: createdTeamMebmer.id}, include: [User]});

            res.status(200).send();
            const teamEvent = {
                event: 'TeamCreatedEvent',
                data: JSON.stringify(createdTeam)
            }
            const teamMemberEvent = {
                event: 'TeamMemberJoinedEvent',
                data: JSON.stringify(createdTeamMebmer)
            }
            sendMsg(teamEvent);
            setTimeout(() => {sendMsg(teamMemberEvent)}, 250);
        }
    }
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


