const db = require("../models");
const Tournament = db.tournament;
const User = db.user;
const TeamMember = db.teamMember;
const Team = db.team
const {logger} = require('../../app')

module.exports = {
    findAllTeamMemberByTeam: findAllTeamMemberByTeam,
    findOneTeamMemberById: findOneTeamMemberById,
    findOneTeamMemberByTeamMember: findOneTeamMemberByTeamMember,
    findTeamMemberInAnyTeamByTournament: findTeamMemberInAnyTeamByTournament,
    createNewTeamMember: createNewTeamMember,
    deleteTeamMember: deleteTeamMember
}

async function findAllTeamMemberByTeam(teamId) {
    return TeamMember.findAll( { where: {teamId: teamId}, include: [User]});
}

async function findOneTeamMemberById(id) {
    return TeamMember.findOne( { where: { id: id}, include: [User] });
}

async function findOneTeamMemberByTeamMember(teamMember) {
    return TeamMember.findOne( {where: { teamId: teamMember.teamId, userId: teamMember.user.id}});;
}

async function findTeamMemberInAnyTeamByTournament(teamMember, tournamentId) {
    return TeamMember.findOne( {
        where: {userId: teamMember.user.id},
        include: [{model: Team,
            include: [{model: Tournament, where: {id: tournamentId}}]
        }]
    });
}

async function createNewTeamMember(teamMember) {
    logger.info('create new teamMember: ', teamMember);
    const newTeamMember = {
        teamId: teamMember.teamId,
        userId: teamMember.user.id
    }
    let resTeamMember = await TeamMember.create(newTeamMember);
    return findOneTeamMemberById(resTeamMember.id);
}

async function deleteTeamMember(id) {
    const deletedTeamMember = await findOneTeamMemberById(id);
    await TeamMember.destroy({where: {id: id}});
    return deletedTeamMember;
}
