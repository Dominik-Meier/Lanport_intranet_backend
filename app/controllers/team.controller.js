const {createEventMsg} = require("../util/HelperFunctions");
const {createTeamMember} = require("../ControllerDelegates/teamMemberDelegate");
const {createTeam} = require("../ControllerDelegates/teamDelegate");
const {findTeamsByTournament} = require("../ControllerDelegates/teamDelegate.js");
const {getAllTeams} = require("../ControllerDelegates/teamDelegate.js");
const {sendMsg} = require("../../app");

exports.findAll = (req, res) => {
    getAllTeams()
        .then(allTeams => {
            if (allTeams) {
                res.send(allTeams);
            } else {
                res.status(404).send('No Teams Found');
            }})
        .catch(err => { res.status(500).send('Server Error') });
};

exports.findByTournament = async (req, res) => {
    findTeamsByTournament(req.params.id)
        .then( teams => {
            if (teams) {
                res.send(teams);
            } else {
                res.status(404).send('No GameModes Found');
            }
        })
        .catch(err => { res.status(500).send('Server Error') });
};

exports.create = async (req, res) =>  {
    createTeam(req.body)
        .then( createdTeam => {
            createTeamMember(createdTeam, req.body.teamMembers[0])
                .then( createdTeamMember => {
                    res.status(200).send();
                    sendMsg(createEventMsg('TeamCreatedEvent', createdTeam));
                    setTimeout(() => {sendMsg(createEventMsg('TeamMemberJoinedEvent', createdTeamMember))}, 250);
                })
                .catch(err => res.status(403).send(err));
        })
        .catch(err => res.status(403).send(err));
};


