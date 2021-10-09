module.exports = (sequelize, Sequelize) => {
    const SurveyQuestionUserAnswer = sequelize.define("surveyQuestionUserAnswer", {
        booleanAnswer: {
            type: Sequelize.BOOLEAN
        },
        stringAnswer: {
            type: Sequelize.STRING
        },
        userId: {
            type: Sequelize.INTEGER,
        },
        surveyQuestionId: {
            type: Sequelize.INTEGER,
        },
        surveyQuestionOptionId: {
            type: Sequelize.INTEGER,
        }
    }, {
        timestamps: false
    });

    return SurveyQuestionUserAnswer;
};

