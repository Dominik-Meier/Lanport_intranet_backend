module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("user", {
        nickname: {
            type: Sequelize.STRING,
        },
        lanportUserId: {
            type: Sequelize.INTEGER,
        },
        registered: {
            type: Sequelize.BOOLEAN,
        },
        payed: {
            type: Sequelize.BOOLEAN,
        },
        seat: {
            type: Sequelize.STRING,
        },
        level: {
            type: Sequelize.STRING,
        },
        token: {
            type: Sequelize.STRING,
        },
        refreshToken: {
            type: Sequelize.STRING,
        }
    }, {
        defaultScope: {
            exclude: ['token', 'refreshToken']
        },
        timestamps: false
    });

    return User;
};