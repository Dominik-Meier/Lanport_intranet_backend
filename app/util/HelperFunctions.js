const jwt = require("jsonwebtoken");
const {getAllTournamentTypes} = require("../ControllerDelegates/tournamentTypeDelegate");
const {getAllGameModes} = require("../ControllerDelegates/gamemodeDelegate");
const {getAllLanparties} = require("../ControllerDelegates/lanpartyDelegate");
const {sendMsg} = require("../../app");
const {getAllTournaments} = require("../ControllerDelegates/tournamentDelegate");
const {logger} = require('../../app')

module.exports = {
    createEventMsg: createEventMsg,
    catchSend500AndLogError: catchSend500AndLogError,
    sendStatusCodeAndLogError: sendStatusCodeAndLogError,
    getAllTournamentsAndSendEvent: getAllTournamentsAndSendEvent,
    getAllLanpartiesAndSendEvent: getAllLanpartiesAndSendEvent,
    getAllGameModesAndSendEvent: getAllGameModesAndSendEvent,
    getAllTournamentTypeAndSendEvent: getAllTournamentTypeAndSendEvent,
    getUserIdFromJwt: getUserIdFromJwt,
    getChallongeTournamentType: getChallongeTournamentType,
    countArray: countArray
}

function createEventMsg(eventType, data) {
    return {
        event: eventType,
        data: JSON.stringify(data)
    }
}

/**
 * sends the catched error as 500 status if no other res is send already
 * @param err which needs to be sent
 * @param res to send to the client
 */
function catchSend500AndLogError(err, res) {
    if (!res.headersSent) {
        logger.error(err);
        res.status(500).send('Server Error: '.concat(err));
    }
}

/**
 * Send the received err and status code to the client if no other res is sent already
 * @param res to sent to the client
 * @param err to sent to the client reported by this app
 * @param statusCode the accordingly status code
 * @param msg of the error
 */
function sendStatusCodeAndLogError(res, err, statusCode, msg) {
    if (!res.headersSent) {
        logger.error(res, err, statusCode, msg);
        res.status(statusCode).send({ 'server_error': err, 'server_message': msg });
    }
}

/**
 * As multiple delegates update tournament this is methode match all.
 * Has all information about all tournaments and sends the notification
 *
 * @param res
 */
function getAllTournamentsAndSendEvent(res) {
    getAllTournaments()
        .then( allTournaments => {
            res.status(204).send();
            sendMsg(createEventMsg('TournamentsUpdatedEvent', allTournaments));
        })
        .catch(err => { catchSend500AndLogError(err, res); });
}

function getAllLanpartiesAndSendEvent(res) {
    getAllLanparties()
        .then( allLanparties => {
            res.status(204).send();
            sendMsg(createEventMsg('LanpartiesUpdatedEvent', allLanparties));
        })
        .catch(err => { catchSend500AndLogError(err, res); });
}

function getAllGameModesAndSendEvent(res) {
    getAllGameModes()
        .then( allGameModes => {
            res.status(204).send();
            sendMsg(createEventMsg('GameModesUpdatedEvent', allGameModes));
        })
        .catch(err => { catchSend500AndLogError(err, res); });
}

function getAllTournamentTypeAndSendEvent(res) {
    getAllTournamentTypes()
        .then( allTournamentType => {
            res.status(204).send();
            sendMsg(createEventMsg('TournamentTypesUpdatedEvent', allTournamentType));
        })
        .catch(err => { catchSend500AndLogError(err, res); });
}

function getUserIdFromJwt(jwtToken) {
    return jwtToken ? jwt.verify(jwtToken.split(" ")[1].trim(), process.env.JWT_SECRET).user_id : null;
}

function getChallongeTournamentType(challongeTournamentType) {
    if (challongeTournamentType.toUpperCase() === 'SINGLE ELIMINATION') {
        return 'single elimination';
    } else if (challongeTournamentType.toUpperCase() === 'DOUBLE ELIMINATION') {
        return 'double elimination';
    } else if (challongeTournamentType.toUpperCase() === 'ROUND ROBIN') {
        return 'round robin';
    } else if (challongeTournamentType.toUpperCase() === 'SWISS') {
        return 'swiss';
    } else {
        throw 'Elimination must be one of single elimination / double elimination / round robin / swiss';
    }
}

function countArray(arr, searchTerm, predicate) {
    let counts = 0;
    for (const element of arr) {
        predicate(element, searchTerm) ? counts++ : counts;
    }
    return counts;
}