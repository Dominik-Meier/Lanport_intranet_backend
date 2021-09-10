module.exports = app => {
    const menu = require("../controllers/menu.controller.js");
    const auth = require("../util/auth");
    const {grantAccess} = require("../util/roleBasedAccess");

    const router = require("express").Router();

    router.get("/", auth, menu.getAll);
    router.get("/:id", auth, menu.getOne);
    router.post("/", auth, grantAccess('mitglied'), menu.createMenu);
    router.put("/:id", auth, grantAccess('mitglied'), menu.updateMenu);
    router.delete("/:id", auth, grantAccess('mitglied'), menu.deleteMenu);

    router.post("/:id/item/", auth, grantAccess('mitglied'), menu.createMenuItem);
    router.put("/item/:id", auth, grantAccess('mitglied'), menu.updateMenuItem);
    router.delete("/item/:id", auth, grantAccess('mitglied'), menu.deleteMenuItem);

    app.use('/api/menu', router);
};