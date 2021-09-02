const {getUserIdFromJwt} = require("../util/HelperFunctions");
const {removeTeam} = require("../ControllerDelegates/teamDelegate");
const {removeTeamMember} = require("../ControllerDelegates/teamMemberDelegate");
const {sendStatusCodeAndLogError} = require("../util/HelperFunctions");
const {createEventMsg} = require("../util/HelperFunctions");
const {createTeamMemberWithPin} = require("../ControllerDelegates/teamMemberDelegate");
const {sendMsg} = require("../../app");

exports.create = async (req, res) => {
    createTeamMemberWithPin(req.body, req.query.pin, getUserIdFromJwt(req.headers["authorization"]))
        .then( createdTeamMember => {
            res.status(200).send();
            sendMsg(createEventMsg('TeamMemberJoinedEvent', createdTeamMember));
        })
        .catch(err => { sendStatusCodeAndLogError(res, err, 500, 'Error on create TeamMember'); });
};

exports.delete = async (req, res) => {
    removeTeamMember(req.params.id)
        .then( data => {
            const deletedTeamMember = data[0]
            const team = data[1]
            if (team.teamMembers.length === 1) {
                removeTeam(team.id)
                    .then( teamToDelete => {
                        res.status(200).send();
                        sendMsg(createEventMsg('TeamMemberLeftEvent', deletedTeamMember));
                        setTimeout(() => {sendMsg(createEventMsg('TeamDeletedEvent', teamToDelete))}, 100);
                    })
                    .catch(err => { sendStatusCodeAndLogError(res, err, 500, 'Error on delete Team with non teamMember'); });
            } else {
                res.status(200).send();
                sendMsg(createEventMsg('TeamMemberLeftEvent', deletedTeamMember));
            }
        })
        .catch(err => { sendStatusCodeAndLogError(res, err, 500, 'Error on delete TeamMember'); });
};


