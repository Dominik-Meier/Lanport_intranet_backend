const {deleteFeedbackById} = require("../ControllerDelegates/feedbackDelegate");
const {updateFeedbackById} = require("../ControllerDelegates/feedbackDelegate");
const {createEventMsg} = require("../util/HelperFunctions");
const {sendMsg} = require("../../app");
const {createFeedback} = require("../ControllerDelegates/feedbackDelegate");
const {getOneFeedback} = require("../ControllerDelegates/feedbackDelegate");
const {getAllFeedbackByActiveLanparty} = require("../ControllerDelegates/feedbackDelegate");
const {sendStatusCodeAndLogError} = require("../util/HelperFunctions");

exports.getAll = async (req, res) => {
    getAllFeedbackByActiveLanparty()
        .then( feedback => res.status(200).send(feedback))
        .catch(err => { sendStatusCodeAndLogError(res, err, 500, 'Error on get feedback'); });
};

exports.getOne = async (req, res) => {
    getOneFeedback(req.params.id)
        .then( feedback => res.status(200).send(feedback))
        .catch(err => { sendStatusCodeAndLogError(res, err, 500, 'Error on get feedback with id: ' + req.params.id); });
};

exports.create = async (req, res) => {
    createFeedback(req.body)
        .then( feedback => {
            res.status(204).send();
            sendMsg(createEventMsg('FeedbackCreatedEvent', feedback));
        })
        .catch(err => { sendStatusCodeAndLogError(res, err, 500, 'Error on create feedback'); });
};

exports.update = async (req, res) => {
    updateFeedbackById(req.params.id)
        .then( feedback => {
            res.status(204).send();
            sendMsg(createEventMsg('FeedbackUpdatedEvent', feedback));
        })
        .catch(err => { sendStatusCodeAndLogError(res, err, 500, 'Error on update feedback'); });
};

exports.delete = async (req, res) => {
    deleteFeedbackById(req.params.id)
        .then( feedback => {
            res.status(204).send();
            sendMsg(createEventMsg('FeedbackDeletedEvent', feedback));
        })
        .catch(err => { sendStatusCodeAndLogError(res, err, 500, 'Error on update feedback'); });
};
