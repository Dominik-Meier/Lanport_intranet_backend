const {menuItemDelegateDeleteMenuItem} = require("../ControllerDelegates/menuDelegate");
const {menuItemDelegateUpdateMenuItem} = require("../ControllerDelegates/menuDelegate");
const {menuItemDelegateCreateMenuItem} = require("../ControllerDelegates/menuDelegate");
const {menuDelegateDeleteMenu} = require("../ControllerDelegates/menuDelegate");
const {menuDelegateUpdateMenu} = require("../ControllerDelegates/menuDelegate");
const {menuDelegateCreateMenu} = require("../ControllerDelegates/menuDelegate");
const {menuDelegateGetOne} = require("../ControllerDelegates/menuDelegate");
const {menuDelegateGetAll} = require("../ControllerDelegates/menuDelegate");
const {sendStatusCodeAndLogError} = require("../util/HelperFunctions");
const {createEventMsg} = require("../util/HelperFunctions");
const {sendMsg} = require("../../app");

exports.getAll = (req, res) => {
    menuDelegateGetAll()
        .then( menus => res.send(menus))
        .catch((err) => { sendStatusCodeAndLogError(res, err, 500, 'Error on get all menus'); });
};

exports.getOne = (req, res) => {
    menuDelegateGetOne(req.params.id)
        .then( menus => res.send(menus))
        .catch((err) => { sendStatusCodeAndLogError(res, err, 500, 'Error on get one menu'); });
};

exports.createMenu = (req, res) => {
    menuDelegateCreateMenu()
        .then( menu => {
            res.status(204).send();
            sendMsg(createEventMsg('MenuCreatedEvent', menu))
        })
        .catch((err) => { sendStatusCodeAndLogError(res, err, 500, 'Error on create menu'); });
};

exports.updateMenu = (req, res) => {
    menuDelegateUpdateMenu(req.body)
        .then( menu => {
            res.status(204).send();
            sendMsg(createEventMsg('MenuUpdatedEvent', menu))
        })
        .catch((err) => { sendStatusCodeAndLogError(res, err, 500, 'Error on update menu'); });
};

exports.deleteMenu = (req, res) => {
    menuDelegateDeleteMenu(req.params.id)
        .then( menu => {
            res.status(204).send();
            sendMsg(createEventMsg('MenuDeletedEvent', menu))
        })
        .catch((err) => { sendStatusCodeAndLogError(res, err, 500, 'Error on delete menu'); });
};

exports.createMenuItem = (req, res) => {
    menuItemDelegateCreateMenuItem(req.params.id, req.body.mealId)
        .then( menuItem => {
            res.status(204).send();
            sendMsg(createEventMsg('MenuItemCreatedEvent', menuItem))
        })
        .catch((err) => { sendStatusCodeAndLogError(res, err, 500, 'Error on create menuItem'); });
};

exports.updateMenuItem = (req, res) => {
    menuItemDelegateUpdateMenuItem(req.body)
        .then( menuItem => {
            res.status(204).send();
            sendMsg(createEventMsg('MenuItemUpdatedEvent', menuItem))
        })
        .catch((err) => { sendStatusCodeAndLogError(res, err, 500, 'Error on update menuItem'); });
};

exports.deleteMenuItem = (req, res) => {
    menuItemDelegateDeleteMenuItem(req.params.id)
        .then( menuItem => {
            res.status(204).send();
            sendMsg(createEventMsg('MenuItemDeletedEvent', menuItem))
        })
        .catch((err) => { sendStatusCodeAndLogError(res, err, 500, 'Error on delete menuItem'); });
};