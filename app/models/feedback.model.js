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
        public: {
            type: Sequelize.BOOLEAN
        },
        anonymous: {
            type: Sequelize.BOOLEAN
        },
        userId: {
            type: Sequelize.INTEGER,
        },
    }, {
        timestamps: false
    });
    return Feedback;
};