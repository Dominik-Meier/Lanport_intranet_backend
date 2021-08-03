module.exports = (sequelize, Sequelize) => {
    const TournamentType = sequelize.define("tournamentType", {
        name: {
            type: Sequelize.STRING
        }
    }, {
        timestamps: false
    });

    return TournamentType;
};

