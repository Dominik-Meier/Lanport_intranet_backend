const {getHighestOrderNumber} = require("../repo/AppComponentsRepo");
const {removeAppComponent} = require("../repo/AppComponentsRepo");
const {findAllAppComponent} = require("../repo/AppComponentsRepo");
const {updateAppComponent} = require("../repo/AppComponentsRepo");
const {createAppComponent} = require("../repo/AppComponentsRepo");

module.exports = {
    writeAppConfigToDB: writeAppConfigToDB,
    readAppConfigFromDB: readAppConfigFromDB,
    deleteAppComponentById: deleteAppComponentById,
    createAppComponent: createAppComponent,
    addAppComponent: addAppComponent
}

async function readAppConfigFromDB() {
    return await findAllAppComponent();
}

async function writeAppConfigToDB(config) {
    for (let appRegisterComponent of config) {
        if (appRegisterComponent.id) {
            await updateAppComponent(appRegisterComponent, null);
        }
        if (appRegisterComponent.appComponents && appRegisterComponent.appComponents.length > 0) {
            for (let appComponent of appRegisterComponent.appComponents) {
                if (appComponent.id) {
                    await updateAppComponent(appComponent, appRegisterComponent.id);
                }
            }
        }
    }
}

async function deleteAppComponentById(id) {
    return await removeAppComponent(id);
}

async function addAppComponent(newAppComponent) {
    const highestOrder = await getHighestOrderNumber(newAppComponent.appComponentId);
    await createAppComponent(newAppComponent, newAppComponent.appComponentId, highestOrder);
}

