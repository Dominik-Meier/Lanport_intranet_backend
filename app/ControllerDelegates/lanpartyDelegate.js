const db = require("../models");
const Lanparty = db.lanparty;

module.exports = {
    updateOrCreateLanparty: updateOrCreateLanparty,
    getAllLanparties: getAllLanparties,
    deleteLanparty: deleteLanparty
}

async function getAllLanparties() {
    return await Lanparty.findAll()
        .then(data => { return data })
        .catch(err => { res.status(500).send('Server Error') });
}

async function updateOrCreateLanparty(lanparties) {
    for (let lanparty of lanparties) {
        if(lanparty.id !== null) {
            console.log('update new party with id: ', id)
            await Lanparty.update(lanparty, { where: {id: lanparty.id}});
        } else {
            console.log('create new party')
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
