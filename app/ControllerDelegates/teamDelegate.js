const db = require("../models");
const Team = db.team;
const Tournament = db.tournament;
const TournamentType = db.tournamentType;
const Lanparty = db.lanparty;
const Gamemode = db.gamemode;
const TeamMember = db.teamMember;
const User = db.user;

module.exports = {
    getAllTeams: getAllTeams,
    findTeamsByTournament: findTeamsByTournament,
    createTeam: createTeam,
    deleteTeam: deleteTeam
}

async function getAllTeams() {
    return await Team.findAll()
        .then(data => {
            return data
        })
        .catch(err => null);
}

async function findTeamsByTournament(id) {
    const resTeams = await Team.findAll( {where: {tournamentId: id}, include: [{model: Tournament, include: [TournamentType, Lanparty, Gamemode]}]})
    for (let team of resTeams) {
        const tm = await TeamMember.findAll( {where: {teamId: team.id}, include: [User]});
        team.teamMembers = tm;
        team.setDataValue('teamMembers', tm);
    }
    return resTeams;
}

async function createTeam(team) {
    if (team) {
        const newTeam = {name: team.name, pin: team.pin, tournamentId: team.tournament.id};
        const tournament = await Tournament.findOne({where: {id: team.tournament.id}, include: [Team]});
        if (tournament.teams.length >= tournament.numberOfParticipants) {
            throw 'Maximum of teams reached for tournament';
        } else if (tournament.started === true) {
            throw 'Tournament is not open for changes';
        } else {
            let createdTeam = await Team.create(newTeam);
            createdTeam = await Team.findOne({
                where: {id: createdTeam.id},
                include: [{model: Tournament, include: [TournamentType, Lanparty, Gamemode]}]
            });
            console.log(createdTeam);
            return createdTeam;
        }
    }
}

async function deleteTeam(id) {
    const teamToDelete = await Team.findOne({
        where: {id: id},
        include: [{model: TeamMember, include: [User]}, {model: Tournament, include: [TournamentType, Lanparty, Gamemode]}]
    });
    await Team.destroy({ where: {id: id}});
    return teamToDelete;
}