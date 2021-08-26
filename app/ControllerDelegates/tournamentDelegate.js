const db = require("../models");
const {updateExistingTournament} = require("../repo/TournamentRepo");
const {createNewTournament} = require("../repo/TournamentRepo");
const Tournament = db.tournament;
const TournamentType = db.tournamentType;
const Lanparty = db.lanparty;
const Gamemode = db.gamemode;

module.exports = {
    getAllTournaments: getAllTournaments,
    updateAllTournaments: updateAllTournaments,
    createTournament: createTournament
}

function getAllTournaments() {
    return Tournament.findAll({ include: [TournamentType, Lanparty, Gamemode]});
}

async function updateAllTournaments(tournaments) {
    for (let tournament of tournaments) {
        if (tournament.id !== null) {
            await updateExistingTournament(tournament);
        }
    }
}

async function createTournament() {
    await createNewTournament();
}