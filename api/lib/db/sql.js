const Sequelize = require('sequelize');
const { types } = require('pg');
const log = require('./../utils/log');
const DBConfig = require('./config/config');

const TIMESTAMP_OID = 1114;
types.setTypeParser(TIMESTAMP_OID, stringValue => new Date(Date.parse(`${stringValue}+0000`)));

const sqlConnection = new Sequelize(DBConfig);

sqlConnection.authenticate()
  .then(() => {
    log.info('Connection to database OK');
  })
  .catch((err) => {
    log.warn('Connection to database NOT OK');
    log.error(err);
  });

module.exports = sqlConnection;
