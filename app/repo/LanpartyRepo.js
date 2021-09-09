const db = require("../models");
const Lanparty = db.lanparty;

module.exports = {
    findAllLanparties: findAllLanparties,
    findActiveLanparty: findActiveLanparty,
    updateExistingLanparty: updateExistingLanparty,
    addLanparty: addLanparty,
    deleteLanparty: deleteLanparty
}

async function findAllLanparties() {
    return Lanparty.findAll()
}

async function findActiveLanparty() {
    return Lanparty.findOne({where: {active: true}});
}

async function updateExistingLanparty(lanparty) {
    Lanparty.update(lanparty, { where: {id: lanparty.id}})
}

async function addLanparty(lanparty) {
    const newLanparty = {
        name: "Placeholder Lan",
        active: false,
        startDate: Date.now(),
        endDate: Date.now(),
    };
    return Lanparty.create(newLanparty);
}

async function deleteLanparty(id) {
    const deletedLanparty = await Lanparty.findOne( {where: {id: id}});
    await Lanparty.destroy({where: {id: id}});
    return deletedLanparty;
}
