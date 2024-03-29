const {findOneUserById} = require("../repo/UserRepo");
const {deleteTeam} = require("../repo/TeamRepo");
const {findOneTournamentIncludeTeams} = require("../repo/TournamentRepo");
const {createNewTeam} = require("../repo/TeamRepo");
const {findAllTeamsByTournament} = require("../repo/TeamRepo");

module.exports = {
    findTeamsByTournament: findTeamsByTournament,
    createTeam: createTeam,
    removeTeam: removeTeam
}

async function findTeamsByTournament(id) {
    const resTeams = await findAllTeamsByTournament(id);
    return resTeams;
}

async function createTeam(team, userId) {
    if (team) {
        const tournament = await findOneTournamentIncludeTeams(team.tournament.id);
        const teams = await findAllTeamsByTournament(tournament.id);
        const user = await findOneUserById(userId);
        if (tournament.teams.length >= tournament.numberOfParticipants) {
            throw 'Maximum of teams reached for tournament';
        } else if (tournament.started === true) {
            throw 'Tournament is not open for changes';
        } else if (Date.parse(tournament.registrationEndDate) < Date.now()) {
            throw 'Registration phase has ended!'
        } else if (!user.payed) {
            throw 'Only payed user are allowed to register for tournaments';
        } else if (teams.find( x => x.name === team.name)) {
            throw 'Team name must be unique!'
        } else {
            return createNewTeam(team);
        }
    }
}

async function removeTeam(id) {
    return deleteTeam(id);
}