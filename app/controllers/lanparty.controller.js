const {sendStatusCodeAndLogError} = require("../util/HelperFunctions");
const {deleteLanparty} = require("../ControllerDelegates/lanpartyDelegate");
const {updateOrCreateLanparty} = require("../ControllerDelegates/lanpartyDelegate");
const {getAllLanparties} = require("../ControllerDelegates/lanpartyDelegate");

// TODO implement Events
exports.findAll = (req, res) => {
    getAllLanparties()
        .then( allLanparties => { res.send(allLanparties); })
        .catch(err => { sendStatusCodeAndLogError(res, err, 500, 'Error on get lanparties'); });
};

exports.update = (req, res) => {
    updateOrCreateLanparty(req.body)
        .then( () => { res.status(200).send(); })
        .catch(err => { sendStatusCodeAndLogError(res, err, 500, 'Error on update lanparty'); });
};

exports.delete = (req, res) => {
    const id = req.params.id;
    deleteLanparty(id)
        .then(res.status(200).send())
        .catch(err => { sendStatusCodeAndLogError(res, err, 500, 'Error on delete lanparty'); });
};