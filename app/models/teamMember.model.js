module.exports = (sequelize, Sequelize) => {
    const TeamMember = sequelize.define("teamMember", {
        teamId: {
            type: Sequelize.INTEGER,
        },
        userId: {
            type: Sequelize.INTEGER,
        },
    });
    return TeamMember;
};