module.exports = (sequelize, Sequelize) => {
    const AppComponent = sequelize.define("appComponent", {
        name: {
            type: Sequelize.STRING
        },
        usedComponent: {
            type: Sequelize.STRING
        },
        appRegisterComponentId: {
            type: Sequelize.INTEGER
        },
        data: {
           type: Sequelize.TEXT
        },
        activeForIntranet: {
            type: Sequelize.BOOLEAN
        },
        activeForBeamerPresentation: {
            type: Sequelize.BOOLEAN
        }
    }, {
        timestamps: false
    });

    return AppComponent;
};

