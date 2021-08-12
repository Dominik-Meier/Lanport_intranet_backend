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
        .catch(err => res.status(403).send(err));
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
                    .catch(err => res.status(403).send(err));
            } else {
                res.status(200).send();
                sendMsg(createEventMsg('TeamMemberLeftEvent', deletedTeamMember));
            }
        })
        .catch(err => res.status(403).send(err));
};


