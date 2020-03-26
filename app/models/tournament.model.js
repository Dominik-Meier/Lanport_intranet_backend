module.exports = (sequelize, Sequelize) => {
    const Tournament = sequelize.define("tournament", {
        title: {
            type: Sequelize.STRING
        },
        description: {
            type: Sequelize.STRING
        },
        published: {
            type: Sequelize.BOOLEAN
        }
    });

    return Tournament;
};