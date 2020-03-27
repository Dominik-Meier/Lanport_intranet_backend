module.exports = (sequelize, Sequelize) => {
    const TournamentType = sequelize.define("tournamentType", {
        name: {
            type: Sequelize.STRING
        }
    });

    return TournamentType;
};

