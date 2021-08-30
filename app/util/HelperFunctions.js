const {sendMsg} = require("../../app");
const {getAllTournaments} = require("../ControllerDelegates/tournamentDelegate");
module.exports = {
    createEventMsg: createEventMsg,
    catchSend500AndLogError: catchSend500AndLogError,
    sendStatusCodeAndLogError: sendStatusCodeAndLogError,
    getAllTournamentsAndSendEvent: getAllTournamentsAndSendEvent
}

function createEventMsg(eventType, data) {
    return {
        event: eventType,
        data: JSON.stringify(data)
    }
}

function catchSend500AndLogError(err, res) {
    console.error(err);
    res.status(500).send('Server Error: '.concat(err));
}

function sendStatusCodeAndLogError(res, err, statusCode, msg) {
    console.error(err);
    res.status(statusCode).send({ 'server_error': err, 'server_message': msg });
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