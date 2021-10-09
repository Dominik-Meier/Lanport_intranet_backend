const {removeSurvey} = require("../ControllerDelegates/SurveyDelegate");
const {createSurveyAnswer} = require("../ControllerDelegates/SurveyDelegate");
const {getStatForSurvey} = require("../ControllerDelegates/SurveyDelegate");
const {createNewSurvey} = require("../ControllerDelegates/SurveyDelegate");
const {getAll} = require("../ControllerDelegates/SurveyDelegate");
const {findSurvey} = require("../ControllerDelegates/SurveyDelegate");
const {sendStatusCodeAndLogError} = require("../util/HelperFunctions");
const {getUserIdFromJwt} = require("../util/HelperFunctions");
const {createEventMsg} = require("../util/HelperFunctions");
const {sendMsg} = require("../../app");

exports.create = (req, res) => {
    createNewSurvey(req.body)
        .then( survey => {
                res.status(204).send();
                sendMsg(createEventMsg('SurveyCreatedEvent', survey));
            })
        .catch((err) => { sendStatusCodeAndLogError(res, err, 500, 'Error on create new survey'); });
};

exports.find = (req, res) => {
    findSurvey(req.params.id)
        .then(survey => res.send(survey))
        .catch((err) => { sendStatusCodeAndLogError(res, err, 500, 'Error on find survey'); });
};

exports.findAll = (req, res) => {
    getAll()
        .then(survey => res.send(survey))
        .catch((err) => { sendStatusCodeAndLogError(res, err, 500, 'Error on find survey'); });
};

exports.delete = (req, res) => {
    removeSurvey(req.params.id)
        .then( deletedSurvey => {
            res.status(204).send();
            sendMsg(createEventMsg('SurveyDeletedEvent', deletedSurvey));
        })
        .catch((err) => { sendStatusCodeAndLogError(res, err, 500, 'Error on delete survey'); });
}

exports.postAnswer = (req, res) => {
    const userId = getUserIdFromJwt(req.headers["authorization"]);
    createSurveyAnswer(req.body, userId)
        .then( surveyAnswer => {
            res.status(204).send();
            sendMsg(createEventMsg('CreatedSurveyAnswerEvent', surveyAnswer));}
            )
        .catch((err) => { sendStatusCodeAndLogError(res, err, 500, 'Error on post answert to survey'); });
}

exports.getStats = (req, res) => {
    getStatForSurvey(req.params.id)
        .then( surveyStats => res.send(surveyStats))
        .catch((err) => { sendStatusCodeAndLogError(res, err, 500, 'Error on get statistic to survey'); });
}


