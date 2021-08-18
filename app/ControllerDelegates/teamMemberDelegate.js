const db = require("../models");
const Team = db.team;
const Tournament = db.tournament;
const TournamentType = db.tournamentType;
const Lanparty = db.lanparty;
const Gamemode = db.gamemode;
const TeamMember = db.teamMember;
const User = db.user;

module.exports = {
    createTeamMember: createTeamMember,
    createTeamMemberWithPin: createTeamMemberWithPin,
    deleteTeamMember: deleteTeamMember
}

function createTeamMember(team, teamMember) {
    teamMember.teamId = team.id;
    return createTeamMemberWithPin(teamMember, team.pin)
}

async function createTeamMemberWithPin(teamMember, pin) {
    if (teamMember) {
        const dbTeamMember = await TeamMember.findOne( {where: { teamId: teamMember.teamId, userId: teamMember.user.id}});
        const dbTeam = await Team.findOne( {where: { id: teamMember.teamId}, include: [TeamMember]});
        const allTournamentTeams = await Team.findAll( {where: {tournamentId: dbTeam.tournamentId}, include: [TeamMember]});
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
            throw 'User already exits in this team';
        } else if (tournament.gamemode.teamSize <= dbTeam.teamMembers.length) {
            throw 'Team maximum size reached';
        } else if (tournament.started === true) {
            throw 'Tournament is not open for registration!';
        } else if (dbTeam.pin.toString() !== pin.toString()) {
            throw 'Pin does not match';
        } else if (joinedOtherTeam) {
            throw 'User is in other team for tournament';
        } else {
            const newTeamMember = {
                teamId: teamMember.teamId,
                userId: teamMember.user.id
            }
            let resTeamMember = await TeamMember.create(newTeamMember);
            const createdTeamMember = await TeamMember.findOne({where: {id: resTeamMember.id}, include: [User]});
            return createdTeamMember;
        }
    } else {
        throw 'TeamMember not found';
    }
}

async function deleteTeamMember(id) {
    if (id !== null) {
        const deletedTeamMember = await TeamMember.findOne( {where: {id: id}, include: [User]});
        const team = await Team.findOne( {where: {id: deletedTeamMember.teamId}, include: [TeamMember]});
        const tournament = await Tournament.findOne( {where: {id: team.tournamentId}});

        if (tournament.started === true) {
            throw 'Tournament is not open for changes';
        } else {
            await TeamMember.destroy({where: {id: id}});
            return [deletedTeamMember, team];
        }
    } else {
        throw 'Not TeamMember with id';
    }

}
