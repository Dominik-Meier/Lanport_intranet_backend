const {mealDelegateOrderStatusChange} = require("../ControllerDelegates/mealDelegate");
const {mealDelegateGetAllOrders} = require("../ControllerDelegates/mealDelegate");
const {mealDelegatePlaceOrder} = require("../ControllerDelegates/mealDelegate");
const {mealDelegateDeleteMeal} = require("../ControllerDelegates/mealDelegate");
const {mealDelegateDeleteMealOption} = require("../ControllerDelegates/mealDelegate");
const {mealDelegateUpdateMealOption} = require("../ControllerDelegates/mealDelegate");
const {mealDelegateUpdateMeal} = require("../ControllerDelegates/mealDelegate");
const {mealDelegateCreateMealOption} = require("../ControllerDelegates/mealDelegate");
const {mealDelegateCreateMeal} = require("../ControllerDelegates/mealDelegate");
const {createEventMsg} = require("../util/HelperFunctions");
const {sendMsg} = require("../../app");
const {mealDelegateGetOne} = require("../ControllerDelegates/mealDelegate");
const {sendStatusCodeAndLogError} = require("../util/HelperFunctions");
const {mealDelegateGetAll} = require("../ControllerDelegates/mealDelegate");

exports.getAll = (req, res) => {
    mealDelegateGetAll()
        .then( meals => res.send(meals))
        .catch((err) => { sendStatusCodeAndLogError(res, err, 500, 'Error on get all meals'); });
};

exports.getOne = (req, res) => {
    mealDelegateGetOne(req.params.id)
        .then( meals => res.send(meals))
        .catch((err) => { sendStatusCodeAndLogError(res, err, 500, 'Error on get one meal'); });
};

exports.createMeal = (req, res) => {
    mealDelegateCreateMeal()
        .then( meal => {
            res.status(204).send();
            sendMsg(createEventMsg('MealCreatedEvent', meal))
        })
        .catch((err) => { sendStatusCodeAndLogError(res, err, 500, 'Error on create meal'); });
};

exports.createMealOption = (req, res) => {
    mealDelegateCreateMealOption(req.params.id)
        .then( mealOption => {
            res.status(204).send();
            sendMsg(createEventMsg('MealOptionCreatedEvent', mealOption))
        })
        .catch((err) => { sendStatusCodeAndLogError(res, err, 500, 'Error on creat mealOption'); });
};

exports.updateMeal = (req, res) => {
    mealDelegateUpdateMeal(req.body)
        .then( meal => {
            res.status(204).send();
            sendMsg(createEventMsg('MealUpdatedEvent', meal))
        })
        .catch((err) => { sendStatusCodeAndLogError(res, err, 500, 'Error on update meal'); });
};

exports.updateMealOption = (req, res) => {
    mealDelegateUpdateMealOption(req.body)
        .then( mealOption => {
            res.status(204).send();
            sendMsg(createEventMsg('MealOptionUpdatedEvent', mealOption))
        })
        .catch((err) => { sendStatusCodeAndLogError(res, err, 500, 'Error on update mealOption'); });
};

exports.deleteMeal = (req, res) => {
    mealDelegateDeleteMeal(req.params.id)
        .then( meal => {
            res.status(204).send();
            sendMsg(createEventMsg('MealDeletedEvent', meal))
        })
        .catch((err) => { sendStatusCodeAndLogError(res, err, 500, 'Error on delete meal'); });
};

exports.deleteMealOption = (req, res) => {
    mealDelegateDeleteMealOption(req.params.id)
        .then( mealOption => {
            res.status(204).send();
            sendMsg(createEventMsg('MealOptionDeletedEvent', mealOption))
        })
        .catch((err) => { sendStatusCodeAndLogError(res, err, 500, 'Error on delete mealOption'); });
};

exports.getAllOrders = (req, res) => {
    mealDelegateGetAllOrders(req.query.userId)
        .then( orders => res.status(200).send(orders))
        .catch((err) => { sendStatusCodeAndLogError(res, err, 500, 'Error on get orders'); });
};

exports.getOneOrder = (req, res) => {
};

exports.placeOrder = (req, res) => {
    mealDelegatePlaceOrder(req.body, req.headers["authorization"])
        .then( order => {
            res.status(204).send();
            sendMsg(createEventMsg('MealOrderPlacedEvent', order));
        })
        .catch((err) => { sendStatusCodeAndLogError(res, err, 500, 'Error on place order'); });
};

exports.orderStatusChange = (req, res) => {
    mealDelegateOrderStatusChange(req.params.id, req.params.status)
        .then( order => {
            res.status(204).send();
            sendMsg(createEventMsg('MealOrderStatusUpdatedEvent', order));
        })
        .catch((err) => { sendStatusCodeAndLogError(res, err, 500, 'Error on update order status'); });
};
