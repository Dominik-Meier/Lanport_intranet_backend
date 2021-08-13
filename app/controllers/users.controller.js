const db = require("../models");
const User = db.user;
const Session = db.session;
const Op = db.Sequelize.Op;
const internetAvailable = require("internet-available");
const request = require('request');
const {handleGetUserBySess} = require("../ControllerDelegates/userDelegate");
const {handleGetUserDevMode} = require("../ControllerDelegates/userDelegate");
const {config} = require('../../app')

const cookieJar = request.jar();

exports.findOne = async (req, res) => {
    if (config === 'dev') {
        handleGetUserDevMode(req.params.id)
            .then(devUser => {
                res.send(devUser);
            })
            .catch(err => res.status(401).send('no sess for user found'));
    } else {
        handleGetUserBySess(req.params.id)
            .then(user => {
                res.send(user);
            })
            .catch(err => {
                res.status(401).send('no sess for user found')
            });
    }
};

// Retrieve all users from the database.
exports.findAll = (req, res) => {
    const name = req.query.name;
    var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;

    User.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => { res.status(500).send('Server Error') });
};


