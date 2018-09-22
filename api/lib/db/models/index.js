const fs = require('fs');
const path = require('path');
const sequelize = require('../sql');

const fileIsTest = file => file.includes('tests.js');
const fileIsNotHidden = file => file.indexOf('.') !== 0;
const notIndexFile = file => file !== 'index.js';
const notHiddenAndNotIndex = file => fileIsNotHidden(file)
    && notIndexFile(file) && !fileIsTest(file);

const db = fs
  .readdirSync(__dirname)
  .filter(notHiddenAndNotIndex)
  .reduce((dbArray, modelFile) => {
    const absolutePathToModel = path.join(__dirname, modelFile);
    const model = sequelize.import(absolutePathToModel);

    dbArray[model.name] = model;

    return dbArray;
  }, {});

Object.keys(db).forEach((modelName) => {
  if ('associate' in db[modelName]) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;

module.exports = db;
