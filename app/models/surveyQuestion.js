module.exports = (sequelize, Sequelize) => {
    const SurveyQuestion = sequelize.define("surveyQuestion", {
        question: {
            type: Sequelize.STRING
        },
        surveyId: {
            type: Sequelize.INTEGER,
        },
        howManyAnswersAreAllowed: {
            type: Sequelize.INTEGER
        },
        answerType: {
            type: Sequelize.ENUM,
            values: ['string', 'boolean']
        }
    }, {
        timestamps: false
    });

    return SurveyQuestion;
};

