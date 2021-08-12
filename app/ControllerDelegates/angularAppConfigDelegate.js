const fs = require('fs');

module.exports = {
    readConfigFromFile: readConfigFromFile,
    writeConfigFile: writeConfigFile
}

function readConfigFromFile() {
    return JSON.parse(fs.readFileSync('angularAppConfig.json', 'utf-8').toString());
}

function writeConfigFile(dataToWrite) {
    return fs.writeFileSync('angularAppConfig.json', JSON.stringify(dataToWrite));
}

