const {updateExistingTournamentTypes} = require("../ControllerDelegates/tournamentTypeDelegate");
const {createTournamentType} = require("../ControllerDelegates/tournamentTypeDelegate");
const {getAllTournamentTypeAndSendEvent} = require("../util/HelperFunctions");
const {createEventMsg} = require("../util/HelperFunctions");
const {removeTournamentType} = require("../ControllerDelegates/tournamentTypeDelegate");
const {sendMsg} = require("../../app");
const {sendStatusCodeAndLogError} = require("../util/HelperFunctions");
const {getAllTournamentTypes} = require("../ControllerDelegates/tournamentTypeDelegate");

exports.findAll = (req, res) => {
    getAllTournamentTypes()
        .then( allTournamentTypes => { res.send(allTournamentTypes); })
        .catch(err => { sendStatusCodeAndLogError(res, err, 500, 'Error on get TournamentTypes'); });
};

exports.create = (req, res) => {
    createTournamentType()
        .then( () => { getAllTournamentTypeAndSendEvent(res); })
        .catch(err => { sendStatusCodeAndLogError(res, err, 500, 'Error on create TournamentTypes'); });
}

exports.update = (req, res) => {
    updateExistingTournamentTypes(req.body)
        .then(() => { getAllTournamentTypeAndSendEvent(res); })
        .catch(err => { sendStatusCodeAndLogError(res, err, 500, 'Error on update TournamentTypes'); });
};

exports.delete = (req, res) => {
    removeTournamentType(req.params.id)
        .then( deletedTournamentType => {
            res.status(204).send();
            sendMsg(createEventMsg('TournamentTypeDeletedEvent', deletedTournamentType));
        })
        .catch(err => { sendStatusCodeAndLogError(res, err, 500, 'Error on delete TournamentTypes'); });
}


