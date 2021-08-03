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
        }
    }, {
        timestamps: false
    });

    return User;
};