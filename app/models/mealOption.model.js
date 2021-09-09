module.exports = (sequelize, Sequelize) => {
    const MealOption = sequelize.define("mealOption", {
        name: {
            type: Sequelize.STRING,
        },
        mealId: {
            type: Sequelize.INTEGER,
        },
        infos: {
            type: Sequelize.STRING,
        },
    }, {
        timestamps: false
    });

    return MealOption;
};