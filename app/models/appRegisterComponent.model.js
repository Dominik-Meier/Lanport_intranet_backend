module.exports = (sequelize, Sequelize) => {
    const AppRegisterComponent = sequelize.define("appRegisterComponent", {
        name: {
            type: Sequelize.STRING
        },
        usedComponent: {
            type: Sequelize.STRING
        },
        activeForIntranet: {
            type: Sequelize.BOOLEAN
        }
    }, {
        timestamps: false
    });

    return AppRegisterComponent;
};

