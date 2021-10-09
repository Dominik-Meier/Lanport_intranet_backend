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
db.survey = require('./survey') (sequelize, Sequelize);
db.surveyQuestion = require('./surveyQuestion') (sequelize, Sequelize);
db.surveyQuestionOption = require('./surveyQuestionOption') (sequelize, Sequelize);
db.surveyQuestionUserAnswer = require('./surveyQuestionUserAnswer') (sequelize, Sequelize);

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

// Associations Survey

db.survey.hasMany(db.surveyQuestion, {onDelete: 'cascade'});
db.surveyQuestion.belongsTo(db.survey);

db.surveyQuestion.hasMany(db.surveyQuestionOption, {onDelete: 'cascade'});
db.surveyQuestionOption.belongsTo(db.surveyQuestion);

db.surveyQuestion.hasMany(db.surveyQuestionUserAnswer, {onDelete: 'cascade'});
db.surveyQuestionUserAnswer.belongsTo(db.surveyQuestion);

db.user.hasMany(db.surveyQuestionUserAnswer);
db.surveyQuestionUserAnswer.belongsTo(db.user);

db.surveyQuestionOption.hasMany(db.surveyQuestionUserAnswer);
db.surveyQuestionUserAnswer.belongsTo(db.surveyQuestionOption);

module.exports = db;

