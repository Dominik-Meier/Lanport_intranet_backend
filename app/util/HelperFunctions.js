module.exports = {
    createEventMsg: createEventMsg,
    catchSend500AndLogError: catchSend500AndLogError
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