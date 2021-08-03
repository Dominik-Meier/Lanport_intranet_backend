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
            type: Sequelize.INTEGER,
            allowNull: false,
            validate: {
                notNull: true,
                min: 1000,
                max: 9999
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