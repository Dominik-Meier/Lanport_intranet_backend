module.exports = (sequelize, Sequelize) => {
    const SurveyQuestionOption = sequelize.define("surveyQuestionOption", {
        questionOption: {
            type: Sequelize.STRING
        },
        surveyQuestionId: {
            type: Sequelize.INTEGER,
        }
    }, {
        timestamps: false
    });

    return SurveyQuestionOption;
};

