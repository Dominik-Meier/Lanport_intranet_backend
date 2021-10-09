const db = require("../models");
const Survey = db.survey;
const SurveyQuestion = db.surveyQuestion;
const SurveyQuestionOption = db.surveyQuestionOption;
const SurveyQuestionUserAnswer = db.surveyQuestionUserAnswer;

module.exports = {
    findSurveyById:findSurveyById,
    findAllSurvey:findAllSurvey,
    findAllAnswersToSurvey:findAllAnswersToSurvey,
    findSurveyAnswerByUserAndSurveyQuestionId:findSurveyAnswerByUserAndSurveyQuestionId,
    createAnswerToSurvey:createAnswerToSurvey,
    createSurvey:createSurvey,
    createSurveyQuestion:createSurveyQuestion,
    createSurveyQuestionOption:createSurveyQuestionOption,
    deleteSurvey:deleteSurvey
}

async function findSurveyById(id) {
    return Survey.findOne({where: {id: id}, include: [{model: SurveyQuestion, include: [SurveyQuestionOption]}]});
}

async function findAllSurvey() {
    return Survey.findAll({include: [{model: SurveyQuestion, include: [{model: SurveyQuestionOption}]}]});
}

async function findAllAnswersToSurvey(id) {
    return Survey.findOne({ where: {id: id},
        include: [{ model: SurveyQuestion,
            include: [SurveyQuestionOption, SurveyQuestionUserAnswer]}]});
}

async function findSurveyAnswerByUserAndSurveyQuestionId(userId, surveyQuestionId) {
    return SurveyQuestionUserAnswer.findOne( {where: {userId: userId, surveyQuestionId: surveyQuestionId}});
}

async function createAnswerToSurvey(surveyQuestionAnswer, userId) {
    const sQA = {
        booleanAnswer: surveyQuestionAnswer.booleanAnswer,
        stringAnswer: surveyQuestionAnswer.stringAnswer,
        userId: userId,
        surveyQuestionId: surveyQuestionAnswer.surveyQuestionId
    }
    return SurveyQuestionUserAnswer.create(sQA);
}

async function createSurvey(survey) {
    const newSurvey = {
        name: survey.name,
        lanpartyId: survey.lanpartyId,
        startDate: survey.startDate,
        endDate: survey.endDate,
    }
    return Survey.create(newSurvey);
}

async function createSurveyQuestion(surveyQuestion) {
    const newSurveyQuestion = {
        question: surveyQuestion.question,
        surveyId: surveyQuestion.surveyId,
        howManyAnswersAreAllowed: surveyQuestion.howManyAnswersAreAllowed,
        answerType: surveyQuestion.answerType,
    }
    return SurveyQuestion.create(newSurveyQuestion);
}

async function createSurveyQuestionOption(surveyQuestionOption) {
    const newSurveyQuestionOption = {
        questionOption: surveyQuestionOption.questionOption,
        surveyQuestionId: surveyQuestionOption.surveyQuestionId,
    }
    return SurveyQuestionOption.create(newSurveyQuestionOption);
}

async function deleteSurvey(id) {
    const destroyedSurvey = await Survey.findOne({where: {id: id}});
    await Survey.destroy({where: {id: id}});
    return destroyedSurvey;
}