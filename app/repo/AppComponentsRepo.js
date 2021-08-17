const db = require("../models");
const AppRegisterComponent = db.appRegisterComponent;
const AppComponent = db.appComponent;

module.exports = {
    createAppRegisterComponent: createAppRegisterComponent,
    updateAppRegisterComponent: updateAppRegisterComponent,
    createAppComponent: createAppComponent,
    updateAppComponent: updateAppComponent,
    findAllAppRegisterComponent: findAllAppRegisterComponent,
    removeAppComponent: removeAppComponent,
    removeAppRegisterComponent: removeAppRegisterComponent
}

async function findAllAppRegisterComponent() {
    return await AppRegisterComponent.findAll({include: [AppComponent]});
}

async function createAppRegisterComponent(appRegisterComponent) {
    const newAppRegisterComponent = {
        id: null,
        name: appRegisterComponent.name,
        usedComponent: appRegisterComponent.usedComponent,
        activeForIntranet: appRegisterComponent.activeForIntranet
    }
    const dbAppRegisterComponent = await AppRegisterComponent.create(newAppRegisterComponent);
    return dbAppRegisterComponent;
}

async function updateAppRegisterComponent(appRegisterComponent) {
    const dbAppRegisterComponent = await AppRegisterComponent.findOne({where: {id: appRegisterComponent.id}});
    if (dbAppRegisterComponent) {
        dbAppRegisterComponent.id = appRegisterComponent.id;
        dbAppRegisterComponent.name = appRegisterComponent.name;
        dbAppRegisterComponent.usedComponent = appRegisterComponent.usedComponent;
        dbAppRegisterComponent.activeForIntranet = appRegisterComponent.activeForIntranet;
        await dbAppRegisterComponent.save();
    }
}

async function createAppComponent(appComponent, appRegisterComponentId) {
    const newAppRegisterComponent = {
        id: null,
        name: appComponent.name,
        usedComponent: appComponent.usedComponent,
        appRegisterComponentId: appRegisterComponentId,
        data: appComponent.data,
        activeForIntranet: appComponent.activeForIntranet,
        activeForBeamerPresentation: appComponent.activeForBeamerPresentation
    }
    await AppComponent.create(newAppRegisterComponent)
}

async function updateAppComponent(appComponent, appRegisterComponentId) {
    const dbAppComponent = await AppComponent.findOne({where: {id: appComponent.id}});
    if (dbAppComponent) {
        dbAppComponent.name = appComponent.name;
        dbAppComponent.usedComponent = appComponent.usedComponent;
        dbAppComponent.appRegisterComponentId = appRegisterComponentId;
        dbAppComponent.data = appComponent.data;
        dbAppComponent.activeForIntranet = appComponent.activeForIntranet;
        dbAppComponent.activeForBeamerPresentation = appComponent.activeForBeamerPresentation;
        await dbAppComponent.save();
    }
}

async function removeAppComponent(id) {
    const destroyedAppComponent = await AppComponent.findOne({where: {id: id}});
    await AppComponent.destroy({where: {id: id}});
    return destroyedAppComponent;
}

async function removeAppRegisterComponent(id) {
    const destroyedAppRegisterComponent = await AppRegisterComponent.findOne({where: {id: id}});
    await AppRegisterComponent.destroy({where: {id: id}});
    return destroyedAppRegisterComponent;
}