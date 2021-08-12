module.exports = {
    createEventMsg: createEventMsg,
}

function createEventMsg(eventType, data) {
    return {
        event: eventType,
        data: JSON.stringify(data)
    }
}