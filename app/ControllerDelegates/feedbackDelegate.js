const {deleteFeedback} = require("../repo/FeedbackRepo");
const {updateFeedback} = require("../repo/FeedbackRepo");
const {addFeedback} = require("../repo/FeedbackRepo");
const {findOneFeedbackById} = require("../repo/FeedbackRepo");
const {findAllFeedbackByLanpartyId} = require("../repo/FeedbackRepo");
const {findActiveLanparty} = require("../repo/LanpartyRepo");
const {logger} = require('../../app')

module.exports = {
    getAllFeedbackByActiveLanparty: getAllFeedbackByActiveLanparty,
    getOneFeedback: getOneFeedback,
    createFeedback: createFeedback,
    updateFeedbackById: updateFeedbackById,
    deleteFeedbackById: deleteFeedbackById
}

async function getAllFeedbackByActiveLanparty() {
    const activeLanparty = await findActiveLanparty();
    return findAllFeedbackByLanpartyId(activeLanparty.id);
}

async function getOneFeedback(id) {
    return findOneFeedbackById(id);
}

async function createFeedback(feedback) {
    logger.info('Add new feedback from userId: ' + feedback.userId);
    const activeLanparty = await findActiveLanparty();
    feedback.lanpartyId = activeLanparty.id;
    return addFeedback(feedback);
}

async function updateFeedbackById(feedback) {
    logger.info('Update feedback from userId: ' + feedback.userId + ' and feedbackId: ' + feedback.id);
    return updateFeedback(feedback)
}

async function deleteFeedbackById(id) {
    logger.info('Update feedback with Id: ' + id);
    return deleteFeedback(id);
}
