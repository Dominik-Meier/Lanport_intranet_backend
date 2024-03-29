module.exports = (sequelize, Sequelize) => {
    const Gamemode = sequelize.define("gamemode", {
        name: {
            type: Sequelize.STRING
        },
        game: {
            type: Sequelize.STRING
        },
        elimination: {
            type: Sequelize.STRING
        },
        teamSize: {
            type: Sequelize.INTEGER
        },
        rules: {
            type: Sequelize.TEXT,
        }
    }, {
        timestamps: false
    });

    return Gamemode;
};

