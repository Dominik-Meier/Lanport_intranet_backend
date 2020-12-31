module.exports = (sequelize, Sequelize) => {
    const TournamentParticipant = sequelize.define("tournamentParticipant", {
        tournamentId: {
            type: Sequelize.INTEGER,
        },
        userId: {
            type: Sequelize.INTEGER,
        },
    });
    return TournamentParticipant;
};