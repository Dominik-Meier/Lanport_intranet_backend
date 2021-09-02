const {getUserIdFromJwt} = require("../util/HelperFunctions");
const {sendStatusCodeAndLogError} = require("../util/HelperFunctions");
const {createEventMsg} = require("../util/HelperFunctions");
const {createTeamMember} = require("../ControllerDelegates/teamMemberDelegate");
const {createTeam} = require("../ControllerDelegates/teamDelegate");
const {findTeamsByTournament} = require("../ControllerDelegates/teamDelegate.js");
const {sendMsg} = require("../../app");


exports.findByTournament = async (req, res) => {
    findTeamsByTournament(req.params.id)
        .then( teams => { res.send(teams); })
        .catch(err => { sendStatusCodeAndLogError(res, err, 500, 'Error on get teams by tournament'); });
};

exports.create = async (req, res) =>  {
    const userId = getUserIdFromJwt(req.headers["authorization"]);
    createTeam(req.body, userId)
        .then( createdTeam => {
            createTeamMember(createdTeam, req.body.teamMembers[0], userId)
                .then( createdTeamMember => {
                    res.status(200).send();
                    sendMsg(createEventMsg('TeamCreatedEvent', createdTeam));
                    setTimeout(() => {sendMsg(createEventMsg('TeamMemberJoinedEvent', createdTeamMember))}, 250);
                })
                .catch(err => { sendStatusCodeAndLogError(res, err, 500, 'Error on create teamMember for new team'); });
        })
        .catch(err => { sendStatusCodeAndLogError(res, err, 500, 'Error on create team'); });
};
