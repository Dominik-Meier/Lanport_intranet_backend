module.exports = (sequelize, Sequelize) => {
    const Survey = sequelize.define("survey", {
        name: {
            type: Sequelize.STRING
        },
        lanpartyId: {
            type: Sequelize.INTEGER,
        },
        startDate: {
            type: Sequelize.DATE
        },
        endDate: {
            type: Sequelize.DATE
        }
    }, {
        timestamps: false
    });

    return Survey;
};

