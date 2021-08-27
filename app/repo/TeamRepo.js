const db = require("../models");
const Team = db.team;
const Tournament = db.tournament;
const TournamentType = db.tournamentType;
const Lanparty = db.lanparty;
const Gamemode = db.gamemode;
const TeamMember = db.teamMember;
const User = db.user;

module.exports = {
    findAllTeamsByTournament: findAllTeamsByTournament,
    findOneTeamById: findOneTeamById,
    createNewTeam: createNewTeam,
    deleteTeam: deleteTeam
}

async function findAllTeamsByTournament(tournamentId) {
    return Team.findAll( {
        where: {tournamentId: tournamentId},
            include: [
                {model: Tournament, include: [TournamentType, Lanparty, Gamemode]},
                {model: TeamMember, include: [User]}
            ]
        }
    );
}

async function findOneTeamById(id) {
    return Team.findOne( { where: { id: id}, include: [TeamMember, {model: Tournament, include: [TournamentType, Lanparty, Gamemode]} ] });
}

async function createNewTeam(team) {
    console.log('create new team: ', team);
    const newTeam = {name: team.name, pin: team.pin, tournamentId: team.tournament.id};
    let createdTeam = await Team.create(newTeam);
    return findOneTeamById(createdTeam.id);
}

async function deleteTeam(id) {
    const deletedTeam = await findOneTeamById(id);
    await Team.destroy({where: {id: id}});
    return deletedTeam;
}
