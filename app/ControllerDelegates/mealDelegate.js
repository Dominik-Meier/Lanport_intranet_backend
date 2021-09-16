const db = require("../models");
const User = db.user;
const Session = db.session;
const request = require('request');
const rp = require('request-promise');
const internetAvailable = require("internet-available");
const {logger} = require('../../app')
const jwt = require('jsonwebtoken')
const {findOneMenuById} = require("../repo/MenuRepo");
const {updateMealOrderStatus} = require("../repo/MealRepo");
const {countArray} = require("../util/HelperFunctions");
const {findAllMealOrder} = require("../repo/MealRepo");
const {findAllMealOrderByUserId} = require("../repo/MealRepo");
const {findOneMealOrderById} = require("../repo/MealRepo");
const {createMealOrderOption} = require("../repo/MealRepo");
const {createMealOrder} = require("../repo/MealRepo");
const {getUserIdFromJwt} = require("../util/HelperFunctions");
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
    mealDelegateGetAllOrders: mealDelegateGetAllOrders,
    mealDelegateGetOneOrder: mealDelegateGetOneOrder,
    mealDelegatePlaceOrder: mealDelegatePlaceOrder,
    mealDelegateOrderStatusChange: mealDelegateOrderStatusChange
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

async function mealDelegateGetAllOrders(userId) {
    if (userId) {
        return findAllMealOrderByUserId(userId);
    } else {
        return findAllMealOrder();
    }
}

async function mealDelegateGetOneOrder(id) {
    return findOneMealOrderById(id);
}

async function mealDelegatePlaceOrder(sentMealOrder, jwt) {
    const jwtUserId = getUserIdFromJwt(jwt);
    const menu = await findOneMenuById(sentMealOrder.menuId);
    const userOrders = await findAllMealOrderByUserId(jwtUserId);
    const orderCount = countArray(userOrders, sentMealOrder.menuId,
        function (element, searchTerm) {return element.menuId === searchTerm});
    if(orderCount >= menu.cultivable) {
        throw 'Essen wurde bereits bestellt'
    }

    const mealOrder = {
        mealId: sentMealOrder.mealId,
        userId: jwtUserId,
        menuId: sentMealOrder.menuId,
        status: 'ordered',
        extras: sentMealOrder.extras,
        orderTime: Date.now()
    }

    const placedMealOrder = await createMealOrder(mealOrder);
    for ( const sentOrderOption of sentMealOrder.mealOrderOptions) {
        const orderOption = {
            mealOrderId: placedMealOrder.id,
            mealOptionId: sentOrderOption.mealOptionId,
            isOrdered: sentOrderOption.isOrdered,
        }
        await createMealOrderOption(orderOption)
    }

    return mealDelegateGetOneOrder(placedMealOrder.id);
}

async function mealDelegateOrderStatusChange(orderId, newStatus) {
    const order = updateMealOrderStatus(orderId, newStatus);
    return order;
}

