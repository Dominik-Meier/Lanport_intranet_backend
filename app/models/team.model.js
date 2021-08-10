module.exports = (sequelize, Sequelize) => {
    const Team = sequelize.define("team", {
        name: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notNull: true,
                len: [1,20]
            }
        },
        pin: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notNull: true,
                len: [4, 4],
            }
        },
        tournamentId: {
            type: Sequelize.INTEGER,
        },
    }, {
        timestamps: false
    });

    return Team;
};