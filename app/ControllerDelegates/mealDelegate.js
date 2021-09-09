const db = require("../models");
const User = db.user;
const Session = db.session;
const request = require('request');
const rp = require('request-promise');
const internetAvailable = require("internet-available");
const {logger} = require('../../app')
const jwt = require('jsonwebtoken')
const {removeMealOption} = require("../repo/MealRepo");
const {removeMeal} = require("../repo/MealRepo");
const {findOneMealById} = require("../repo/MealRepo");
const {changeMealOption} = require("../repo/MealRepo");
const {changeMeal} = require("../repo/MealRepo");
const {addMealOption} = require("../repo/MealRepo");
const {addMeal} = require("../repo/MealRepo");
const {findActiveLanparty} = require("../repo/LanpartyRepo");
const {getAllMeals} = require("../repo/MealRepo");


module.exports = {
    mealDelegateGetAll: mealDelegateGetAll,
    mealDelegateGetOne: mealDelegateGetOne,
    mealDelegateCreateMeal: mealDelegateCreateMeal,
    mealDelegateCreateMealOption: mealDelegateCreateMealOption,
    mealDelegateUpdateMeal: mealDelegateUpdateMeal,
    mealDelegateUpdateMealOption: mealDelegateUpdateMealOption,
    mealDelegateDeleteMeal: mealDelegateDeleteMeal,
    mealDelegateDeleteMealOption: mealDelegateDeleteMealOption,
}

async function mealDelegateGetAll() {
    return getAllMeals();
}

async function mealDelegateGetOne(id) {
    return findOneMealById(id);
}

async function mealDelegateCreateMeal() {
    const lanparty = await findActiveLanparty();
    const meal = {
        name: 'Placeholder',
        startTime: Date.now(),
        endTime: Date.now(),
        lanpartyId: lanparty.id,
        infos: ''
    }
    return addMeal(meal);
}

async function mealDelegateCreateMealOption(id) {
    const mealOption = {
        name: 'Placeholder',
        mealId: id,
        infos: ''
    }
    return addMealOption(mealOption);
}

async function mealDelegateUpdateMeal(meal) {
    return changeMeal(meal);
}

async function mealDelegateUpdateMealOption(mealOption) {
    return changeMealOption(mealOption);
}

async function mealDelegateDeleteMeal(id) {
    return removeMeal(id);
}

async function mealDelegateDeleteMealOption(id) {
    return removeMealOption(id);
}

async function mealDelegateGetAllOrders() {

}

async function mealDelegateGetOneOrder() {

}


async function mealDelegatePlaceOrder() {

}

async function mealDelegateOrderStatusChange() {

}

