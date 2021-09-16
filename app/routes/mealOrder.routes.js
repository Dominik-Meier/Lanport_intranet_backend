module.exports = app => {
    const meals = require("../controllers/meal.controller.js");
    const auth = require("../util/auth");
    const {grantAccess} = require("../util/roleBasedAccess");

    const router = require("express").Router();

    router.get("/", auth, grantAccess('user'), meals.getAllOrders);
    router.get("/:id", auth, grantAccess('user'), meals.getOneOrder);
    router.post("/", auth, grantAccess('user'), meals.placeOrder);
    router.put("/:id/status/:status", auth, grantAccess('mitglied'), meals.orderStatusChange);

    app.use('/api/mealOrder', router);
};