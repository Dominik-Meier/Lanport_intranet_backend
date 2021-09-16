const db = require("../models");
const Meal = db.meal;
const User = db.user;
const Menu = db.menu;
const MealOrder = db.mealOrder;
const MealOrderOption = db.mealOrderOption;
const MealOption = db.mealOption
const {logger} = require('../../app')

module.exports = {
    getAllMeals: getAllMeals,
    findOneMealById: findOneMealById,
    findOneMealOptionById: findOneMealOptionById,
    addMeal: addMeal,
    addMealOption: addMealOption,
    changeMeal: changeMeal,
    changeMealOption: changeMealOption,
    removeMeal: removeMeal,
    removeMealOption: removeMealOption,
    findAllMealOrder: findAllMealOrder,
    findAllMealOrderByUserId: findAllMealOrderByUserId,
    findOneMealOrderById: findOneMealOrderById,
    createMealOrder: createMealOrder,
    createMealOrderOption: createMealOrderOption,
    updateMealOrderStatus: updateMealOrderStatus
}

async function getAllMeals() {
    return Meal.findAll({ include: [MealOption] });
}

async function findOneMealById(id) {
    return Meal.findOne({ where: { id: id}, include: [MealOption] });
}

async function findOneMealOptionById(id) {
    return MealOption.findOne({ where: { id: id} });
}

async function addMeal(meal) {
    return Meal.create(meal, {include: [MealOption]});
}

async function addMealOption(mealOption) {
    return MealOption.create(mealOption);
}

async function changeMeal(meal) {
    await Meal.update(meal, {where: {id: meal.id}});
    return findOneMealById(meal.id);
}

async function changeMealOption(mealOption) {
    await MealOption.update(mealOption, {where: {id: mealOption.id}});
    return findOneMealOptionById(mealOption.id);
}

async function removeMeal(id) {
    const deletedMeal = await findOneMealById(id);
    await Meal.destroy({where: {id: id}});
    return deletedMeal;
}

async function removeMealOption(id) {
    const deletedMealOption = await findOneMealOptionById(id);
    await MealOption.destroy({where: {id: id}});
    return deletedMealOption;
}

async function findAllMealOrder() {
    return MealOrder.findAll({ include: [ User, Meal, Menu, {model: MealOrderOption, include: [MealOption]}]});
}

async function findAllMealOrderByUserId(userId) {
    return MealOrder.findAll({where: {userId: userId}, include: [ User, Meal, Menu, {model: MealOrderOption, include: [MealOption]}]});
}

async function findOneMealOrderById(id) {
    return MealOrder.findOne({where: {id: id}, include: [ User, Meal, Menu, {model: MealOrderOption, include: [MealOption]}]});
}

async function createMealOrder(mealOrder) {
    return MealOrder.create(mealOrder);
}

async function createMealOrderOption(mealOrderOption) {
    return MealOrderOption.create(mealOrderOption);
}

async function updateMealOrderStatus(mealOrderId, newStatus) {
    const order = await findOneMealOrderById(mealOrderId);
    order.status = newStatus;
    return order.save();
}
