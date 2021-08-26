const db = require("../models");
const Tournament = db.tournament;
const TournamentType = db.tournamentType;
const Lanparty = db.lanparty;
const Gamemode = db.gamemode;

module.exports = {
    createNewTournament: createNewTournament,
    updateExistingTournament: updateExistingTournament
}

async function createNewTournament() {
    console.log('create new tournament');
    const newTournament = {
        name: 'Placeholoder',
    };
    await Tournament.create(newTournament);
}

async function updateExistingTournament(tournament) {
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
}
