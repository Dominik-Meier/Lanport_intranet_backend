const db = require("../models");
const {findOneUserById} = require("../repo/UserRepo");
const {findOneTeamById} = require("../repo/TeamRepo");
const {createNewTeamMember} = require("../repo/TeamMemberRepo");
const {deleteTeamMember} = require("../repo/TeamMemberRepo");
const {findOneTeamMemberById} = require("../repo/TeamMemberRepo");
const {findTeamMemberInAnyTeamByTournament} = require("../repo/TeamMemberRepo");
const {findOneTournament} = require("../repo/TournamentRepo");
const {findOneTeamMemberByTeamMember} = require("../repo/TeamMemberRepo");
const Team = db.team;
const TeamMember = db.teamMember;

module.exports = {
    createTeamMember: createTeamMember,
    createTeamMemberWithPin: createTeamMemberWithPin,
    removeTeamMember: removeTeamMember
}

function createTeamMember(team, teamMember, userId) {
    teamMember.teamId = team.id;
    return createTeamMemberWithPin(teamMember, team.pin, userId)
}

async function createTeamMemberWithPin(teamMember, pin, userId) {
    if (teamMember) {
        const user = await findOneUserById(userId);
        const dbTeamMember = await findOneTeamMemberByTeamMember(teamMember);
        const dbTeam = await findOneTeamById(teamMember.teamId);
        const tournament = await findOneTournament(dbTeam.tournamentId);
        const joinedOtherTeam = await findTeamMemberInAnyTeamByTournament(teamMember, tournament.id)
        if (dbTeamMember) {
            throw 'User already exits in this team';
        } else if (tournament.gamemode.teamSize <= dbTeam.teamMembers.length) {
            throw 'Team maximum size reached';
        } else if (tournament.started === true) {
            throw 'Tournament is not open for registration!';
        } else if (Date.parse(tournament.registrationEndDate) < Date.now()) {
            throw 'Registration phase has ended!'
        } else if (dbTeam.pin.toString() !== pin.toString()) {
            throw 'Pin does not match';
        } else if (joinedOtherTeam) {
            throw 'User is in other team for tournament';
        } else if (!user.payed) {
            throw 'Only payed user are allowed to register for tournaments';
        } else {
            return createNewTeamMember(teamMember);
        }
    } else {
        throw 'TeamMember not found';
    }
}

async function removeTeamMember(id) {
    if (id !== null) {
        let deletedTeamMember = await findOneTeamMemberById(id);
        const team = await Team.findOne( {where: {id: deletedTeamMember.teamId}, include: [TeamMember]});
        const tournament = await findOneTournament(team.tournamentId);

        if (tournament.started === true) {
            throw 'Tournament is not open for changes';
        } else {
            deletedTeamMember = await deleteTeamMember(id);
            return [deletedTeamMember, team];
        }
    } else {
        throw 'Not TeamMember with id';
    }

}
