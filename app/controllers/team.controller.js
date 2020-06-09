const db = require("../models");
const Team = db.team;
const Tournament = db.tournament;
const TournamentType = db.tournamentType;
const Lanparty = db.lanparty;
const Gamemode = db.gamemode;
const TeamMembers = db.teamMember;
const User = db.user;
const Op = db.Sequelize.Op;


exports.findAll = (req, res) => {
    Team.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Teams."
            });
        });
};

exports.findByTournament = async (req, res) => {
    const id = req.params.id;
    const resTeams = await Team.findAll( {where: {tournamentId: id}, include: [{model: Tournament, include: [TournamentType, Lanparty, Gamemode]}]})
    for (let team of resTeams) {
        const tm = await TeamMembers.findAll( {where: {teamId: team.id}, include: [User]});
        team.teamMembers = tm;
        team.setDataValue('teamMembers', tm);
    }
    console.log('findByTournament found teams: ', resTeams.length, resTeams);
    res.send(resTeams);
};

exports.findByUser = (req, res) => {
};


exports.create = async (req, res) =>  {
    team = req.body;
    let result;
    console.log(team);
    if (team) {
        const newTeam = {
            name: team.name,
            pin: team.pin,
            tournamentId: team.tournament.id
        }
        const query = await Team.create(newTeam);
        const id = query.getDataValue('id');
        console.log(id);
        //result = await Team.findOne({where: {id: id}, include: [Tournament, TournamentType, Lanparty, Gamemode]});
        result = await Team.findOne({where: {id: id}, include: [{model: Tournament, include: [TournamentType, Lanparty, Gamemode]}]});
        console.log(result);
    }
    res.status(200).send(result);
};


exports.update = (req, res) => {
    const team = req.body;

    if(team.id !== null) {
        console.log('update team')
        Team.update(team, { where: {id: team.id}});
    }
    res.status(200).send();
};


exports.delete = (req, res) => {
    const team = req.body;

    if(team.id !== null) {
        console.log('delete team')
        Team.destroy(team, { where: {id: team.id}});
    }
    res.status(200).send();
};


