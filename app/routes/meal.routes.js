module.exports = app => {
    const meals = require("../controllers/meal.controller.js");
    const auth = require("../util/auth");
    const {grantAccess} = require("../util/roleBasedAccess");

    const router = require("express").Router();

    router.get("/", auth, meals.getAll);
    router.get("/:id", auth, meals.getOne);
    router.post("/", auth, grantAccess('mitglied'), meals.createMeal);
    router.post("/:id/option/", auth, grantAccess('mitglied'), meals.createMealOption);

    router.put("/:id", auth, grantAccess('mitglied'), meals.updateMeal);
    router.put("/option/:id", auth, grantAccess('mitglied'), meals.updateMealOption);

    router.delete("/:id", auth, grantAccess('mitglied'), meals.deleteMeal);
    router.delete("/option/:id", auth, grantAccess('mitglied'), meals.deleteMealOption);

    router.get("/order", auth, grantAccess('user'), meals.getAllOrders);
    router.get("/order/:id", auth, grantAccess('user'), meals.getOneOrder);
    router.post("/order", auth, grantAccess('user'), meals.placeOrder);
    router.put("/order/:id/status/:status", auth, grantAccess('mitglied'), meals.orderStatusChange);

    app.use('/api/meal', router);
};