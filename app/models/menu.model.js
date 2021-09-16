module.exports = (sequelize, Sequelize) => {
    const Menu = sequelize.define("menu", {
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
        cultivable: {
            type: Sequelize.INTEGER
        }
    }, {
        timestamps: false
    });

    return Menu;
};