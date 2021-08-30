const db = require("../models");
const Lanparty = db.lanparty;
const {logger} = require('../../app')

module.exports = {
    updateOrCreateLanparty: updateOrCreateLanparty,
    getAllLanparties: getAllLanparties,
    deleteLanparty: deleteLanparty
}

async function getAllLanparties() {
    return Lanparty.findAll();
}

async function updateOrCreateLanparty(lanparties) {
    for (const lanparty of lanparties) {
        if(lanparty.id !== null) {
            logger.info('update new party with id: ', lanparty.id)
            await Lanparty.update(lanparty, { where: {id: lanparty.id}});
        } else {
            logger.info('create new party')
            const newLanparty = {
                name: lanparty.name,
                active:  lanparty.active,
                startDate: lanparty.startDate,
                endDate: lanparty.endDate,
            };
            await Lanparty.create(newLanparty);
        }
    }
}

async function deleteLanparty(id) {
    const lanparty = await Lanparty.findOne({where: {id: id}});
    if (lanparty) {
        return await Lanparty.destroy(lanparty, {where: {id: lanparty.id}});
    } else {
        return null;
    }
}
