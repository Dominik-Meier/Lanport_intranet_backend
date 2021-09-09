module.exports = (sequelize, Sequelize) => {
    const Meal = sequelize.define("meal", {
        name: {
            type: Sequelize.STRING,
        },
        startTime: {
            type: Sequelize.DATE,
        },
        endTime: {
            type: Sequelize.DATE,
        },
        lanpartyId: {
            type: Sequelize.INTEGER
        },
        infos: {
            type: Sequelize.STRING,
        },

    }, {
        timestamps: false
    });

    return Meal;
};