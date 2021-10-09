// Route dispatcher, define here a new route

module.exports = app => {
    require("./lanparty.routes")(app);
    require("./tournament.routes")(app);
    require("./gamemode.routes")(app);
    require("./tournamenttype.routes")(app);
    require("./angularAppConfig.routes")(app);
    require("./user.routes")(app);
    require("./team.routes")(app);
    require("./teamMember.routes")(app);
    require("./tournamentParticipant.routes")(app);
    require("./challonge.routes")(app);
    require("./feedback.routes")(app);
    require("./survey.routes")(app);
};