module.exports = (sequelize, Sequelize) => {
    const Seat = sequelize.define("seat", {
        seat: {
            type: Sequelize.STRING
        },
        userId: {
            type: Sequelize.INTEGER,
        },
        lanpartyId: {
            type: Sequelize.INTEGER,
        }
    });

    return Seat;
};

