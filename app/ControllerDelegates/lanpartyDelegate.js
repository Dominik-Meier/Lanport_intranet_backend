const {updateExistingLanparty} = require("../repo/LanpartyRepo");
const {addLanparty} = require("../repo/LanpartyRepo");
const {findAllLanparties} = require("../repo/LanpartyRepo");
const {deleteLanparty} = require("../repo/LanpartyRepo");
const {findAllTournamentsByLanparty} = require("../repo/TournamentRepo");
const {logger} = require('../../app')

module.exports = {
    updateLanparty: updateLanparty,
    getAllLanparties: getAllLanparties,
    createLanparty:createLanparty,
    removeLanparty: removeLanparty
}

async function getAllLanparties() {
    return findAllLanparties();
}

async function createLanparty() {
    logger.info('create new party')
    await addLanparty();
}

async function updateLanparty(lanparties) {
    for (const lanparty of lanparties) {
        logger.info('update new party with id: ', lanparty.id)
        await updateExistingLanparty(lanparty);
    }
}

async function removeLanparty(id) {
    const tournament =  await findAllTournamentsByLanparty(id);
    if (tournament?.length > 0) {
        throw 'Lanparty is used in tournaments or null!'
    } else {
       return deleteLanparty(id);
    }
}
