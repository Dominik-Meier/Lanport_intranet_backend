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

async function createTeam(team) {
    if (team) {
        const tournament = await findOneTournamentIncludeTeams(team.tournament.id);
        console.log(tournament)
        if (tournament.teams.length >= tournament.numberOfParticipants) {
            throw 'Maximum of teams reached for tournament';
        } else if (tournament.started === true) {
            throw 'Tournament is not open for changes';
        } else {
            return createNewTeam(team);
        }
    }
}

async function removeTeam(id) {
    return deleteTeam(id);
}