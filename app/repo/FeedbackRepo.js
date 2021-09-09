const db = require("../models");
const Feedback = db.feedback;
const User = db.user;

module.exports = {
    findAllFeedbackByLanpartyId: findAllFeedbackByLanpartyId,
    findOneFeedbackById: findOneFeedbackById,
    addFeedback: addFeedback,
    updateFeedback: updateFeedback,
    deleteFeedback: deleteFeedback
}

async function findAllFeedbackByLanpartyId(lanpartyId) {
    return Feedback.findAll( { where: { lanpartyId: lanpartyId}, include: [User]});
}

async function findOneFeedbackById(id) {
    return Feedback.findOne( { where: { id: id}, include: [User]});
}

async function addFeedback(feedback) {
    const newFeedback = {
        wasGood: feedback.wasGood,
        wasBad: feedback.wasBad,
        suggestions: feedback.suggestions,
        isPublic: feedback.isPublic,
        isAnonymous: feedback.isAnonymous,
        userId: feedback.userId,
        lanpartyId: feedback.lanpartyId
    }
    const dbFeedback = await Feedback.create(newFeedback);
    return findOneFeedbackById(dbFeedback.id);
}

async function updateFeedback(feedback) {
    await Feedback.update(feedback, { where: { id: feedback.id}});
    return findOneFeedbackById(feedback.id);
}

async function deleteFeedback(id) {
    const deletedFeedback = await Feedback.findOne( {where: {id: id}, include: [User]});
    await Feedback.destroy({where: {id: id}});
    return deletedFeedback;
}


