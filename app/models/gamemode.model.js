module.exports = (sequelize, Sequelize) => {
    const Gamemode = sequelize.define("gamemode", {
        name: {
            type: Sequelize.STRING
        },
        game: {
            type: Sequelize.STRING
        },
        teamSize: {
            type: Sequelize.INTEGER
        },
        rules: {
            type: Sequelize.STRING,
        }
    });

    return Gamemode;
};

