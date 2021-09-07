const {findOneTournament} = require("../repo/TournamentRepo");
const rp = require('request-promise');
const {updateExistingTournament} = require("../repo/TournamentRepo");

module.exports = {
    createChallongeTournament: createChallongeTournament
}

async function getAllTournaments() {
    return findAllTournaments();
}

async function createChallongeTournament(id) {
    const tournament = await findOneTournament(id);
    if (tournament.challongeId) {
        throw 'Tournament is already create us update instead.'
    } else {
        const options = {
            method: 'POST',
            uri: 'https://api.challonge.com/v1/tournaments.json',
            headers: {'Accept': 'application/json'},
            json: true,
            body: {
                api_key: process.env.CHALLONGE_API_KEY,
                name: 'Test tournament'
            }
        }

        await rp(options)
            .then( result => handleNewCreatedChallongeTournament(result, tournament))
            .catch( err => console.log(err));
    }
}

async function handleNewCreatedChallongeTournament(res, tournament) {
    const challongeTournament = res.tournament;
    if (challongeTournament) {
        tournament.challongeId = challongeTournament.id;
        await updateExistingTournament(tournament);
    }
}
