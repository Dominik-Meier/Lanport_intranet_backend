const {sendMsg} = require("../../app");
const {createEventMsg} = require("../util/HelperFunctions");
const {updateLanparty} = require("../ControllerDelegates/lanpartyDelegate");
const {createLanparty} = require("../ControllerDelegates/lanpartyDelegate");
const {getAllLanpartiesAndSendEvent} = require("../util/HelperFunctions");
const {sendStatusCodeAndLogError} = require("../util/HelperFunctions");
const {removeLanparty} = require("../ControllerDelegates/lanpartyDelegate");
const {getAllLanparties} = require("../ControllerDelegates/lanpartyDelegate");

// TODO implement Events
exports.findAll = (req, res) => {
    getAllLanparties()
        .then( allLanparties => { res.send(allLanparties); })
        .catch(err => { sendStatusCodeAndLogError(res, err, 500, 'Error on get lanparties'); });
};

exports.create = (req , res) => {
    createLanparty()
        .then( () => getAllLanpartiesAndSendEvent(res) )
        .catch(err => { sendStatusCodeAndLogError(res, err, 500, 'Error on create Lanparty'); })
}

exports.update = (req, res) => {
    updateLanparty(req.body)
        .then( () => getAllLanpartiesAndSendEvent(res) )
        .catch(err => { sendStatusCodeAndLogError(res, err, 500, 'Error on update lanparty'); });
};

exports.delete = (req, res) => {
    const id = req.params.id;
    removeLanparty(id)
        .then( deletedLanparty => {
            res.status(200).send();
            sendMsg(createEventMsg('LanpartyDeletedEvent', deletedLanparty)); })
        .catch(err => { sendStatusCodeAndLogError(res, err, 500, 'Error on delete lanparty'); });
};