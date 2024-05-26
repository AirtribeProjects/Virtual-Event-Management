const fs = require('fs').promises;

//read data from file
const readDataFromFile = async(path) => {
    let jsonData = {};
    const data = await fs.readFile(path, { encoding: 'utf8' });
    if (data) {
        // Parse the JSON data
        jsonData = JSON.parse(data);
    }
    return jsonData;
}

// Write data to file
const writeDataToFile = async (path, value) => {
    await fs.writeFile(path, JSON.stringify(value, null, 2));
}

module.exports = {readDataFromFile, writeDataToFile}
