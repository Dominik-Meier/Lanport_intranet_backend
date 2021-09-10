const db = require("../models");
const Menu = db.menu;
const MenuItem = db.menuItem;
const Meal = db.meal;
const MealOption = db.mealOption;

module.exports = {
    getAllMenus: getAllMenus,
    findOneMenuById: findOneMenuById,
    addMenu: addMenu,
    changeMenu: changeMenu,
    removeMenu: removeMenu,
    addMenuItem: addMenuItem,
    changeMenuItem: changeMenuItem,
    removeMenuItem: removeMenuItem
}

async function getAllMenus() {
    return Menu.findAll(
        {include: [{model: MenuItem,
                    include: [{model: Meal,
                        include: [{model: MealOption}]
                        }]
                    }]
                });
}

async function findOneMenuById(id) {
    return Menu.findOne({ where: { id: id},
        include: [{model: MenuItem,
            include: [{model: Meal,
                include: [{model: MealOption}]
            }]
        }]});
}

async function findOneMenuItemById(id) {
    return MenuItem.findOne({ where: { id: id},
        include: [{model: Meal,
            include: [{model: MealOption}]
        }]
    });
}

async function addMenu(menu) {
    return Menu.create(menu);
}

async function changeMenu(menu) {
    await Menu.update(menu, {where: {id: menu.id}});
    return findOneMenuById(menu.id);
}

async function removeMenu(id) {
    const deletedMenu = await findOneMenuById(id);
    await Menu.destroy({where: {id: id}});
    return deletedMenu;
}

async function addMenuItem(menuItem) {
    const DBmenuItem = await MenuItem.create(menuItem);
    return findOneMenuItemById(DBmenuItem.id);
}

async function changeMenuItem(menuItem) {
    await MenuItem.update(menuItem, {where: {id: menuItem.id}});
    return findOneMenuItemById(menuItem.id);
}

async function removeMenuItem(id) {
    const deletedMenuItem = await findOneMenuItemById(id);
    await MenuItem.destroy({where: {id: id}});
    return deletedMenuItem;
}

