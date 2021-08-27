const db = require("../models");
const Tournament = db.tournament;
const TournamentType = db.tournamentType;
const Lanparty = db.lanparty;
const Gamemode = db.gamemode;
const Team = db.team;
const TournamentParticipant = db.tournamentParticipant;

module.exports = {
    findAllTournaments: findAllTournaments,
    findOneTournament: findOneTournament,
    findOneTournamentIncludeTeams: findOneTournamentIncludeTeams,
    findOneTournamentIncludeAll: findOneTournamentIncludeAll,
    createNewTournament: createNewTournament,
    updateExistingTournament: updateExistingTournament,
    deleteTournament: deleteTournament
}

async function findAllTournaments() {
    return Tournament.findAll({ include: [TournamentType, Lanparty, Gamemode]})
}

async function findOneTournament(id) {
    return Tournament.findOne({where:{id: id}, include: [TournamentType, Lanparty, Gamemode]})
}

async function findOneTournamentIncludeAll(id) {
    return Tournament.findOne({where:{id: id}, include: [TournamentType, Lanparty, Gamemode, TournamentParticipant, Team]})
}

async function findOneTournamentIncludeTeams(id) {
    console.log(id)
    return Tournament.findOne({where:{id: id}, include: [Team]})
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

async function deleteTournament(id) {
    const deletedTournament = await Tournament.findOne( {where: {id: id}});
    await Tournament.destroy({where: {id: id}});
    return deletedTournament;
}
