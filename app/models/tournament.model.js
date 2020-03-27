module.exports = (sequelize, Sequelize) => {
    const Tournament = sequelize.define("tournament", {
        name: {
            type: Sequelize.STRING
        },
        description: {
            type: Sequelize.STRING
        },
        published: {
            type: Sequelize.BOOLEAN
        },
        lanpartyId: {
            type: Sequelize.INTEGER,
        },
        gamemodeId: {
            type: Sequelize.INTEGER,
        },
        tournamentTypeId: {
            type: Sequelize.INTEGER,
        }
    });

    return Tournament;
};

