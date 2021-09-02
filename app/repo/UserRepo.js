const db = require("../models");
const User = db.user;

module.exports = {
    findOneUserById: findOneUserById
}


async function findOneUserById(id) {
    return User.findOne( { where: { id: id}});
}


