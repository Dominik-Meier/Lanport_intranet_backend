module.exports = (sequelize, Sequelize) => {
    const Session = sequelize.define("session", {
        sess: {
            type: Sequelize.STRING,
        },
        userId: {
            type: Sequelize.INTEGER,
        }
    });

    return Session;
};