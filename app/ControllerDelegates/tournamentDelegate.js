const db = require("../models");
const Tournament = db.tournament;
const TournamentType = db.tournamentType;
const Lanparty = db.lanparty;
const Gamemode = db.gamemode;

module.exports = {
    getAllTournaments: getAllTournaments,
    updateAllTournaments: updateAllTournaments
}

function getAllTournaments() {
    return Tournament.findAll({ include: [TournamentType, Lanparty, Gamemode]});
}

async function updateAllTournaments(tournaments) {
    for (let tournament of tournaments) {
        if (tournament.id !== null) {
            console.log('update tournament');
            const DBTournament = {
                id: tournament.id,
                name: tournament.name,
                description: tournament.description,
                lanpartyId: tournament.lanparty.id,
                gamemodeId: tournament.gameMode.id,
                tournamentTypeId: tournament.tournamentType.id,
                teamRegistration: tournament.teamRegistration,
                numberOfParticipants: tournament.numberOfParticipants,
                published: tournament.published,
                started: tournament.started,
                startDate: tournament.startDate,
                endDate: tournament.endDate,
                registrationEndDate: tournament.registrationEndDate,
                finished: tournament.finished,
                awards: tournament.awards,
            };
            await Tournament.update(DBTournament, { where: {id: tournament.id}});
        } else {
            console.log('create new tournament');
            const newTournament = {
                name: tournament.name,
                description: tournament.description,
                lanpartyId: tournament.lanparty.id,
                gamemodeId: tournament.gameMode.id,
                tournamentTypeId: tournament.tournamentType.id,
                teamRegistration: tournament.teamRegistration,
                numberOfParticipants: tournament.numberOfParticipants,
                published: tournament.published,
                started: tournament.started,
                startDate: tournament.startDate,
                endDate: tournament.endDate,
                registrationEndDate: tournament.registrationEndDate,
                awards: tournament.awards,
            };
            await Tournament.create(newTournament);
        }
    }
}