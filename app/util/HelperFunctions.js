const jwt = require("jsonwebtoken");
const {sendMsg} = require("../../app");
const {getAllTournaments} = require("../ControllerDelegates/tournamentDelegate");
const {logger} = require('../../app')

module.exports = {
    createEventMsg: createEventMsg,
    catchSend500AndLogError: catchSend500AndLogError,
    sendStatusCodeAndLogError: sendStatusCodeAndLogError,
    getAllTournamentsAndSendEvent: getAllTournamentsAndSendEvent,
    getUserIdFromJwt: getUserIdFromJwt
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

function getUserIdFromJwt(jwtToken) {
    return jwtToken ? jwt.verify(jwtToken.split(" ")[1].trim(), process.env.JWT_SECRET).user_id : null;
}