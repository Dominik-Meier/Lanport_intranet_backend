const db = require("../models");
const Team = db.team;
const Tournament = db.tournament;
const TournamentType = db.tournamentType;
const Lanparty = db.lanparty;
const Gamemode = db.gamemode;
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

exports.findByTournament = (req, res) => {
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


