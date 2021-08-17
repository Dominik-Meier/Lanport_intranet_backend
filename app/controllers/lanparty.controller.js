const {catchSend500AndLogError} = require("../util/HelperFunctions");
const {deleteLanparty} = require("../ControllerDelegates/lanpartyDelegate");
const {updateOrCreateLanparty} = require("../ControllerDelegates/lanpartyDelegate");
const {getAllLanparties} = require("../ControllerDelegates/lanpartyDelegate");

exports.findAll = (req, res) => {
    getAllLanparties()
        .then( allLanparties => {
            if (allLanparties) {
                res.send(allLanparties);
            } else {
                res.status(404).send('No Lanparty Found');
            }
        })
        .catch(err => { catchSend500AndLogError(err, res); });
};

exports.update = (req, res) => {
    updateOrCreateLanparty(req.body)
        .then( () => { res.status(200).send(); })
        .catch(err => { catchSend500AndLogError(err, res); });
};

exports.delete = (req, res) => {
    const id = req.params.id;
    deleteLanparty(id)
        .then(res.status(200).send())
        .catch(err => { catchSend500AndLogError(err, res); });
};