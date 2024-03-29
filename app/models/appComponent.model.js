module.exports = (sequelize, Sequelize) => {
    const AppComponent = sequelize.define("appComponent", {
        name: {
            type: Sequelize.STRING
        },
        usedComponent: {
            type: Sequelize.STRING
        },
        appComponentId: {
            type: Sequelize.INTEGER
        },
        data: {
           type: Sequelize.TEXT
        },
        order: {
            type: Sequelize.INTEGER
        },
        activeForIntranet: {
            type: Sequelize.BOOLEAN
        },
        activeForBeamerPresentation: {
            type: Sequelize.BOOLEAN
        },
        icon: {
            type: Sequelize.STRING
        },
        beamerTimer: {
            type: Sequelize.INTEGER
        }
    }, {
        timestamps: false
    });

    return AppComponent;
};

