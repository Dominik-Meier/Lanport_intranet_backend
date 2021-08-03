module.exports = (sequelize, Sequelize) => {
    const TeamMember = sequelize.define("teamMember", {
        teamId: {
            type: Sequelize.INTEGER,
        },
        userId: {
            type: Sequelize.INTEGER,
        },
    }, {
        timestamps: false
    });
    return TeamMember;
};