const fs = require('fs');
const db = require("../models");
const {removeAppRegisterComponent} = require("../repo/AppComponentsRepo");
const {removeAppComponent} = require("../repo/AppComponentsRepo");
const {findAllAppRegisterComponent} = require("../repo/AppComponentsRepo");
const {updateAppComponent} = require("../repo/AppComponentsRepo");
const {createAppComponent} = require("../repo/AppComponentsRepo");
const {updateAppRegisterComponent} = require("../repo/AppComponentsRepo");
const {createAppRegisterComponent} = require("../repo/AppComponentsRepo");

module.exports = {
    writeAppConfigToDB: writeAppConfigToDB,
    readAppConfigFromDB: readAppConfigFromDB,
    deleteAppComponentById: deleteAppComponentById,
    deleteAppRegisterComponentById: deleteAppRegisterComponentById
}

async function readAppConfigFromDB() {
    return await findAllAppRegisterComponent();
}

async function writeAppConfigToDB(config) {
    for (let appRegisterComponent of config) {
        if (appRegisterComponent.id) {
            await updateAppRegisterComponent(appRegisterComponent);
        } else {
            appRegisterComponent = await createAppRegisterComponent(appRegisterComponent);
        }
        if (appRegisterComponent.appComponents instanceof Array) {
            for (let appComponent of appRegisterComponent.appComponents) {
                if (appComponent.id) {
                    await updateAppComponent(appComponent, appRegisterComponent.id);
                } else {
                    await createAppComponent(appComponent, appRegisterComponent.id);
                }
            }
        }
    }
}

async function deleteAppComponentById(id) {
    return await removeAppComponent(id);
}

async function deleteAppRegisterComponentById(id) {
    return await removeAppRegisterComponent(id);
}

