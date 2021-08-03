module.exports = (sequelize, Sequelize) => {
    const Lanparty = sequelize.define("lanparty", {
        name: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notNull: true,
                len: [1,20]
            }
        },
        active: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            validate: {
                notNull: true
            }
        },
        startDate: {
            type: Sequelize.DATE,
            allowNull: false,
            validate: {
                notNull: true
            }
        },
        endDate: {
            type: Sequelize.DATE,
            allowNull: false,
            validate: {
                notNull: true
            }
        },
    }, {
        timestamps: false
    });

    return Lanparty;
};