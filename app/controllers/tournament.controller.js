const {updateAllTournaments} = require("../ControllerDelegates/tournamentDelegate");
const {getAllTournaments} = require("../ControllerDelegates/tournamentDelegate");

exports.findAll = (req, res) => {
    getAllTournaments()
        .then( allTournaments => {
            res.send(allTournaments);
        })
        .catch(err => { res.status(500).send('Server Error') });
};

exports.updateAll = (req, res) => {
    console.log(req.body);
    updateAllTournaments(req.body)
        .then( () => {
            res.status(200).send();
        })
        .catch(err => { res.status(500).send('Server Error') });

    res.status(200).send();
};