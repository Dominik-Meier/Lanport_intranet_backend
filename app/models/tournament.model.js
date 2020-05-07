module.exports = (sequelize, Sequelize) => {
    const Tournament = sequelize.define("tournament", {
        name: {
            type: Sequelize.STRING
        },
        description: {
            type: Sequelize.STRING
        },
        lanpartyId: {
            type: Sequelize.INTEGER,
        },
        gamemodeId: {
            type: Sequelize.INTEGER,
        },
        tournamentTypeId: {
            type: Sequelize.INTEGER,
        },
        teamRegistration: {
            type: Sequelize.BOOLEAN,
        },
        numberOfParticipants: {
            type: Sequelize.INTEGER,
        },
        published: {
            type: Sequelize.BOOLEAN
        },
        started: {
            type: Sequelize.BOOLEAN,
        },
        startDate: {
            type: Sequelize.DATE,
        },
        finished: {
            type: Sequelize.BOOLEAN,
        },
    });

    return Tournament;
};

