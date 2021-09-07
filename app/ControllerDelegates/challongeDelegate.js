const {findOneTournament} = require("../repo/TournamentRepo");
const rp = require('request-promise');
const {findAllTeamsByTournament} = require("../repo/TeamRepo");
const {findAllTournamentParticipantsByTournament} = require("../repo/TournamentParticipantsRepo");
const {updateDBTournament} = require("../repo/TournamentRepo");
const {getChallongeTournamentType} = require("../util/HelperFunctions");

module.exports = {
    createChallongeTournament: createChallongeTournament,
    addChallongeTournamentParticipants: addChallongeTournamentParticipants
}

async function getAllTournaments() {
    return findAllTournaments();
}

async function createChallongeTournament(id) {
    const tournament = await findOneTournament(id);
    if (tournament.challongeId) {
        throw 'Tournament is already create us update instead.'
    } else if (tournament.numberOfParticipants < 4) {
        throw "Participants must be greater than 3."
    } else {
        const options = {
            method: 'POST',
            uri: 'https://api.challonge.com/v1/tournaments.json',
            headers: {'Accept': 'application/json'},
            json: true,
            body: {
                api_key: process.env.CHALLONGE_API_KEY,
                name: tournament.lanparty.name.concat('_').concat(tournament.name.toString()),
                tournament_type: getChallongeTournamentType(tournament.gamemode.elimination),
                url: tournament.lanparty.name.concat('_').concat(tournament.name.toString()),
                open_signup: false,
                hold_third_place_match: false,
                accept_attachments: false,
                hide_forum: true,
                private: true,
                signup_cap: tournament.numberOfParticipants
            }
        }


        await rp(options)
            .then( result => handleNewCreatedChallongeTournament(result, tournament))
            .catch( err => handleError(err));
    }
}

async function addChallongeTournamentParticipants(id) {
    const tournament = await findOneTournament(id);
    if (!tournament.challongeId) {
        throw 'Challonge tournament is not created yet.'
    } else if (!tournament.started) {
        throw 'Tournament needs to be started to add challonge participants'
    } else {
        if (tournament.challongeParticipantsAdded) {
            await clearChallongeTournamentParticipants(tournament.challongeId);
            tournament.challongeParticipantsAdded = false;
            await updateDBTournament(tournament);
        }

        const participantNames = [];
        if (tournament.teamRegistration) {
            const tournamentParticipants = await findAllTeamsByTournament(id);
            tournamentParticipants.forEach( tp => participantNames.push( {name: tp.name}));
        } else {
            const tournamentParticipants = await findAllTournamentParticipantsByTournament(tournament.id);
            tournamentParticipants.forEach( tp => participantNames.push({name: tp.user.nickname}));
        }

        const options = {
            method: 'POST',
            uri: 'https://api.challonge.com/v1/tournaments/'.concat(tournament.challongeId).concat('/participants/bulk_add.json'),
            headers: {'Accept': 'application/json'},
            json: true,
            body: {
                api_key: process.env.CHALLONGE_API_KEY,
                participants: participantNames,
            }
        }

        await rp(options)
            .then( async () => {
                tournament.challongeParticipantsAdded = true;
                await updateDBTournament(tournament);
            })
            .catch( err => handleError(err));
    }
}

async function clearChallongeTournamentParticipants(id) {
    const options = {
        method: 'DELETE',
        uri: 'https://api.challonge.com/v1/tournaments/'.concat(id.toString()).concat('/participants/clear.json'),
        headers: {'Accept': 'application/json'},
        json: true,
        body: {
            api_key: process.env.CHALLONGE_API_KEY
        }
    }

    await rp(options)
        .then( () => {})
        .catch( err => handleError(err));
}

async function handleNewCreatedChallongeTournament(res, tournament) {
    const challongeTournament = res.tournament;
    if (challongeTournament) {
        tournament.challongeId = challongeTournament.id;
        await updateDBTournament(tournament);
    }
}

function handleError(err) {
    throw 'error on challonge request';
}
