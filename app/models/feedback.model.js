module.exports = (sequelize, Sequelize) => {
    const Feedback = sequelize.define("feedback", {
        wasGood: {
            type: Sequelize.TEXT
        },
        wasBad: {
            type: Sequelize.TEXT
        },
        suggestions: {
            type: Sequelize.TEXT
        },
        isPublic: {
            type: Sequelize.BOOLEAN
        },
        isAnonymous: {
            type: Sequelize.BOOLEAN
        },
        userId: {
            type: Sequelize.INTEGER,
        },
        lanpartyId: {
            type: Sequelize.INTEGER,
        },
    }, {
        timestamps: false
    });
    return Feedback;
};