module.exports = (sequelize, Sequelize) => {
    const Session = sequelize.define("session", {
        sess: {
            type: Sequelize.STRING,
        },
        userId: {
            type: Sequelize.INTEGER,
        }
    }, {
        timestamps: false
    });

    return Session;
};