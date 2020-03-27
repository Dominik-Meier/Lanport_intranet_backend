const dbConfigs = require("../config/db.config.js");
const Sequelize = require("sequelize")
const config = require('../../app');

let dbConfig;

if(config === 'dev') {
    dbConfig = dbConfigs.dev
} else if (config === 'testing') {
    dbConfig = dbConfigs.testing
} else if (config === 'prod') {
    dbConfig = dbConfigs.prod
} else {
    dbConfig = dbConfigs.dev
}


const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: false,

    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.lanparty = require("./lanparty.model.js") (sequelize, Sequelize);
db.gamemode = require("./gamemode.model.js") (sequelize, Sequelize);
db.tournamentType = require("./tournamenttype.model.js") (sequelize, Sequelize);
db.tournament = require("./tournament.model.js") (sequelize, Sequelize);

// Associations here
db.lanparty.hasMany(db.tournament);
db.tournament.belongsTo(db.lanparty);

db.gamemode.hasMany(db.tournament);
db.tournament.belongsTo(db.gamemode);

db.tournamentType.hasMany(db.tournament);
db.tournament.belongsTo(db.tournamentType);


module.exports = db;

