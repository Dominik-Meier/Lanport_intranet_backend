const {sendMsg} = require("../../app");
const {getAllTournaments} = require("../ControllerDelegates/tournamentDelegate");
module.exports = {
    createEventMsg: createEventMsg,
    catchSend500AndLogError: catchSend500AndLogError,
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

function getAllTournamentsAndSendEvent(res) {
    getAllTournaments()
        .then( allTournaments => {
            res.status(204).send();
            sendMsg(createEventMsg('TournamentsUpdatedEvent', allTournaments));
        })
        .catch(err => { catchSend500AndLogError(err, res); });
}