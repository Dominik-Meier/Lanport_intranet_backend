const {sendStatusCodeAndLogError} = require("../util/HelperFunctions");
const {deleteTeam} = require("../ControllerDelegates/teamDelegate");
const {deleteTeamMember} = require("../ControllerDelegates/teamMemberDelegate");
const {createEventMsg} = require("../util/HelperFunctions");
const {createTeamMemberWithPin} = require("../ControllerDelegates/teamMemberDelegate");
const {sendMsg} = require("../../app");

exports.create = async (req, res) => {
    createTeamMemberWithPin(req.body, req.query.pin)
        .then( createdTeamMember => {
            res.status(200).send();
            sendMsg(createEventMsg('TeamMemberJoinedEvent', createdTeamMember));
        })
        .catch(err => { sendStatusCodeAndLogError(res, err, 500, 'Error on create TeamMember'); });
};

exports.delete = async (req, res) => {
    deleteTeamMember(req.params.id)
        .then( data => {
            const deletedTeamMember = data[0]
            const team = data[1]
            if (team.teamMembers.length === 1) {
                deleteTeam(team.id)
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


