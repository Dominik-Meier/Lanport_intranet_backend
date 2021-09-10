const Sequelize = require("sequelize")
const {dbName, basePath} = require('../../app')

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: basePath.concat("/").concat(dbName).concat(".sqlite"),
    logging: false
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.lanparty = require("./lanparty.model.js") (sequelize, Sequelize);
db.gamemode = require("./gamemode.model.js") (sequelize, Sequelize);
db.tournamentType = require("./tournamenttype.model.js") (sequelize, Sequelize);
db.tournament = require("./tournament.model.js") (sequelize, Sequelize);
db.user = require("./user.model") (sequelize, Sequelize);
db.seat = require("./seat.model") (sequelize, Sequelize);
db.session = require("./session.model") (sequelize, Sequelize);
db.team = require("./team.model") (sequelize, Sequelize);
db.teamMember = require("./teamMember.model") (sequelize, Sequelize);
db.tournamentParticipant = require("./tournamentParticipant.model") (sequelize, Sequelize);
db.appComponent = require('./appComponent.model') (sequelize, Sequelize);
db.feedback = require('./feedback.model') (sequelize, Sequelize);
db.meal = require('./meal.model') (sequelize, Sequelize);
db.mealOption = require('./mealOption.model') (sequelize, Sequelize);
db.mealOrder = require('./mealOrder.model') (sequelize, Sequelize);
db.mealOrderOption = require('./mealOrderOption.model') (sequelize, Sequelize);
db.menu = require('./menu.model') (sequelize, Sequelize);
db.menuItem = require('./menuItem.model') (sequelize, Sequelize);

// Associations appComponent
db.appComponent.hasMany(db.appComponent, {as: 'appComponents'});

// Associations User
db.user.hasMany(db.seat);
db.seat.belongsTo(db.user);

db.lanparty.hasMany(db.seat);
db.seat.belongsTo(db.lanparty);

db.user.hasMany(db.session);
db.session.belongsTo(db.user);


// Associations Tournaments
db.lanparty.hasMany(db.tournament);
db.tournament.belongsTo(db.lanparty);

db.gamemode.hasMany(db.tournament);
db.tournament.belongsTo(db.gamemode);

db.tournamentType.hasMany(db.tournament);
db.tournament.belongsTo(db.tournamentType);


// Associations Teams
db.tournament.hasMany(db.team);
db.team.belongsTo(db.tournament);

db.team.hasMany(db.teamMember);
db.teamMember.belongsTo(db.team);

db.user.hasMany(db.teamMember);
db.teamMember.belongsTo(db.user);


// Associations TournamentParticipant
db.tournament.hasMany(db.tournamentParticipant);
db.tournamentParticipant.belongsTo(db.tournament);

db.user.hasMany(db.tournamentParticipant);
db.tournamentParticipant.belongsTo(db.user);

// Associations Feedback
db.user.hasMany(db.feedback);
db.feedback.belongsTo(db.user)

db.lanparty.hasMany(db.feedback);
db.feedback.belongsTo(db.lanparty);

// Associations Meals
db.meal.hasMany(db.mealOption);
db.mealOption.belongsTo(db.meal);

db.lanparty.hasMany(db.meal, {onDelete: 'cascade'});
db.meal.belongsTo(db.lanparty);

// Associations MealOrders
db.mealOrder.hasMany(db.mealOrderOption);
db.mealOrderOption.belongsTo(db.mealOrder);

db.user.hasMany(db.mealOrder);
db.mealOrder.belongsTo(db.user);

db.meal.hasMany(db.mealOrder);
db.mealOrder.belongsTo(db.meal);

db.mealOption.hasMany(db.mealOrderOption);
db.mealOrderOption.belongsTo(db.mealOption);

// Associations menu
db.menu.hasMany(db.menuItem, {onDelete: 'cascade'});
db.menuItem.belongsTo(db.menu);

db.lanparty.hasMany(db.menu);
db.menu.belongsTo(db.lanparty);

db.meal.hasMany(db.menuItem);
db.menuItem.belongsTo(db.meal);

module.exports = db;

