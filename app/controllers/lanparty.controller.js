const db = require("../models");
const Lanparty = db.lanparty;
const Op = db.Sequelize.Op;

// Retrieve all lanparty from the database.
exports.findAll = (req, res) => {
    const name = req.query.name;
    var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;

    Lanparty.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving lanpartys."
            });
        });
};

// Update a lanparty by the id in the request
exports.update = (req, res) => {
    console.log(req.body);

    for (let lanparty of req.body) {
        if(lanparty.id !== null) {
            console.log('update new party')
            Lanparty.update(lanparty, { where: {id: lanparty.id}});
        } else if (lanparty.id === null) {
            console.log('create new party')
            const newLanparty = {
                name: lanparty.name,
                active:  lanparty.active,
                startDate: lanparty.startDate,
                endDate: lanparty.endDate,
            };
            Lanparty.create(newLanparty);
        }
    }

    res.status(200).send();
};

