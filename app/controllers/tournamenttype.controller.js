const db = require("../models");
const {updateOrCreateAllTournamentTypes} = require("../ControllerDelegates/tournamentTypeDelegate");
const {getAllTournamentTypes} = require("../ControllerDelegates/tournamentTypeDelegate");
const TournamentType = db.tournamentType;
const Op = db.Sequelize.Op;

exports.findAll = (req, res) => {
    getAllTournamentTypes()
        .then( allTournamentTypes => {
            res.send(allTournamentTypes);
        })
        .catch(err => { res.status(500).send('Server Error') });
};

exports.update = (req, res) => {
    updateOrCreateAllTournamentTypes(req.body)
        .then(() => {
            res.status(200).send();
        })
        .catch(err => { res.status(500).send('Server Error') });
};


