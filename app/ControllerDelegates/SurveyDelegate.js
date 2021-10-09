const {deleteSurvey} = require("../repo/SurveyRepo");
const {findSurveyAnswerByUserAndSurveyQuestionId} = require("../repo/SurveyRepo");
const {findAllAnswersToSurvey} = require("../repo/SurveyRepo");
const {createAnswerToSurvey} = require("../repo/SurveyRepo");
const {createSurveyQuestionOption} = require("../repo/SurveyRepo");
const {createSurveyQuestion} = require("../repo/SurveyRepo");
const {createSurvey} = require("../repo/SurveyRepo");
const {findAllSurvey} = require("../repo/SurveyRepo");
const {findSurveyById} = require("../repo/SurveyRepo");

module.exports = {
    findSurvey:findSurvey,
    getAll:getAll,
    removeSurvey:removeSurvey,
    createNewSurvey:createNewSurvey,
    createSurveyAnswer:createSurveyAnswer,
    getStatForSurvey:getStatForSurvey
}

async function findSurvey(id) {
    return await findSurveyById(id);
}

async function getAll() {
    return await findAllSurvey();
}

async function removeSurvey(id) {
    return await deleteSurvey(id);
}

async function createNewSurvey(survey) {
    const dbSurvey = await createSurvey(survey);
    for (let surveyQuestion of survey.surveyQuestions) {
        let dbSurveyQuestion;
        if (surveyQuestion) {
            surveyQuestion.surveyId = dbSurvey.id;
            dbSurveyQuestion = await createSurveyQuestion(surveyQuestion);
        }
        if (dbSurveyQuestion) {
            for (let surveyQuestionOption of surveyQuestion.surveyQuestionOptions) {
                surveyQuestionOption.surveyQuestionId = dbSurveyQuestion.id;
                await createSurveyQuestionOption(surveyQuestionOption);
            }
        }
    }
    return findSurveyById(dbSurvey.id);
}

async function createSurveyAnswer(surveyAnswers, userId) {
    for (let surveyAnswer of surveyAnswers) {
        const alreadyAnswered = await findSurveyAnswerByUserAndSurveyQuestionId(userId, surveyAnswer.surveyQuestionId);
        if (alreadyAnswered !== null) {
            throw 'Question already answered not allowed any more';
        }
        await createAnswerToSurvey(surveyAnswers, userId);
    }
}

async function getStatForSurvey(id) {
    return findAllAnswersToSurvey(id);
}
