const db = require("../models");
const AppComponent = db.appComponent;

module.exports = {
    findAllAppComponent: findAllAppComponent,
    createAppComponent: createAppComponent,
    updateAppComponent: updateAppComponent,
    removeAppComponent: removeAppComponent,
}

async function findAllAppComponent() {
    return AppComponent.findAll({where: {appComponentId: null}, include: [{model: AppComponent, as: 'appComponents'}]});
}

async function createAppComponent(appRegisterComponent, parentId) {
    const newAppRegisterComponent = {
        id: null,
        name: appRegisterComponent.name,
        usedComponent: appRegisterComponent.usedComponent,
        appComponentId: parentId,
        data: appRegisterComponent.data,
        activeForIntranet: appRegisterComponent.activeForIntranet,
        activeForBeamerPresentation: appRegisterComponent.activeForBeamerPresentation,
        icon: appRegisterComponent.icon
    }
    const dbAppComponent = await AppComponent.create(newAppRegisterComponent);
    return dbAppComponent;
}

async function updateAppComponent(appRegisterComponent, parentId) {
    const dbAppComponent = await AppComponent.findOne({where: {id: appRegisterComponent.id}});
    if (dbAppComponent) {
        dbAppComponent.name = appRegisterComponent.name;
        dbAppComponent.usedComponent = appRegisterComponent.usedComponent;
        dbAppComponent.appComponentId = parentId;
        dbAppComponent.data = appRegisterComponent.data;
        dbAppComponent.activeForIntranet = appRegisterComponent.activeForIntranet;
        dbAppComponent.activeForBeamerPresentation = appRegisterComponent.activeForBeamerPresentation;
        dbAppComponent.icon = appRegisterComponent.icon;
        console.log(dbAppComponent.id, dbAppComponent.name);
        await  dbAppComponent.save();
    }
}

async function removeAppComponent(id) {
    const destroyedAppComponent = await AppComponent.findOne({where: {id: id}});
    await AppComponent.destroy({where: {id: id}});
    return destroyedAppComponent;
}