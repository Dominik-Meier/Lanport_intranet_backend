module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("user", {
        nickname: {
            type: Sequelize.STRING,
        },
        level: {
            type: Sequelize.STRING,
        }
    });

    return User;
};