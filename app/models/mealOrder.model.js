module.exports = (sequelize, Sequelize) => {
    const MealOrder = sequelize.define("mealOrder", {
        mealId: {
            type: Sequelize.INTEGER,
        },
        userId: {
            type: Sequelize.INTEGER,
        },
        status: {
            type: Sequelize.ENUM('ordered', 'progress', 'made', 'done')
        },
        extras: {
            type: Sequelize.STRING,
        },
        orderTime: {
            type: Sequelize.DATE
        }
    }, {
        timestamps: false
    });

    return MealOrder;
};