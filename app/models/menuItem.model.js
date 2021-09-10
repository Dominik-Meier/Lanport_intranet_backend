module.exports = (sequelize, Sequelize) => {
    const MenuItem = sequelize.define("menuItem", {
        menuId: {
            type: Sequelize.INTEGER
        },
        mealId: {
            type: Sequelize.INTEGER,
        },

    }, {
        timestamps: false
    });

    return MenuItem;
};