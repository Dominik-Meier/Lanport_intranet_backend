const db = require("../models");
const Team = db.team;
const Tournament = db.tournament;
const TournamentType = db.tournamentType;
const Lanparty = db.lanparty;
const Gamemode = db.gamemode;
const TeamMember = db.teamMember;
const User = db.user;
const TournamentParticipant = db.tournamentParticipant;

module.exports = {
    getAllTournamentTypes: getAllTournamentTypes,
    updateOrCreateAllTournamentTypes: updateOrCreateAllTournamentTypes
}

function getAllTournamentTypes() {
    return TournamentType.findAll();
}

async function updateOrCreateAllTournamentTypes(tournamentTypes) {
    for (let tournamentType of tournamentTypes) {
        if(tournamentType.id !== null) {
             await TournamentType.update(tournamentType, { where: {id: tournamentType.id}});
        } else if (tournamentType.id === null) {
            const newTournamentType = {
                name: tournamentType.name,
            };
            await TournamentType.create(newTournamentType);
        }
    }
}