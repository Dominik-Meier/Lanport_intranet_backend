module.exports = (sequelize, Sequelize) => {
    const MealOrderOption = sequelize.define("mealOrderOption", {
        mealOrderId: {
            type: Sequelize.INTEGER,
        },
        mealOptionId: {
            type: Sequelize.INTEGER,
        },
        isOrdered: {
            type: Sequelize.BOOLEAN,
        },
    }, {
        timestamps: false
    });

    return MealOrderOption;
};