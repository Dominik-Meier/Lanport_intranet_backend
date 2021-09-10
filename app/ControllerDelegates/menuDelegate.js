const {removeMenuItem} = require("../repo/MenuRepo");
const {changeMenuItem} = require("../repo/MenuRepo");
const {addMenuItem} = require("../repo/MenuRepo");
const {getAllMenus} = require("../repo/MenuRepo");
const {removeMenu} = require("../repo/MenuRepo");
const {findOneMenuById} = require("../repo/MenuRepo");
const {changeMenu} = require("../repo/MenuRepo");
const {addMenu} = require("../repo/MenuRepo");
const {findActiveLanparty} = require("../repo/LanpartyRepo");


module.exports = {
    menuDelegateGetAll: menuDelegateGetAll,
    menuDelegateGetOne: menuDelegateGetOne,
    menuDelegateCreateMenu: menuDelegateCreateMenu,
    menuDelegateUpdateMenu: menuDelegateUpdateMenu,
    menuDelegateDeleteMenu: menuDelegateDeleteMenu,
    menuItemDelegateCreateMenuItem: menuItemDelegateCreateMenuItem,
    menuItemDelegateUpdateMenuItem: menuItemDelegateUpdateMenuItem,
    menuItemDelegateDeleteMenuItem: menuItemDelegateDeleteMenuItem
}

async function menuDelegateGetAll() {
    return getAllMenus();
}

async function menuDelegateGetOne(id) {
    return findOneMenuById(id);
}

async function menuDelegateCreateMenu() {
    const lanparty = await findActiveLanparty();
    const menu = {
        name: 'Placeholder',
        startTime: Date.now(),
        endTime: Date.now(),
        lanpartyId: lanparty.id,
        infos: ''
    }
    return addMenu(menu);
}

async function menuDelegateUpdateMenu(menu) {
    return changeMenu(menu);
}


async function menuDelegateDeleteMenu(id) {
    return removeMenu(id);
}

async function menuItemDelegateCreateMenuItem(menuId, mealId) {
    if (menuId && mealId){
        const menuItem = {
            menuId: menuId,
            mealId: mealId
        }
        return addMenuItem(menuItem);
    } else {
        throw 'menuId or mealId are not defined!'
    }
}

async function menuItemDelegateUpdateMenuItem(menuItem) {
    return changeMenuItem(menuItem);
}


async function menuItemDelegateDeleteMenuItem(id) {
    return removeMenuItem(id);
}


