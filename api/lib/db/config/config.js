const moment = require('moment');
const Sequelize = require('sequelize');
const log = require('./../../utils/log');

/*
  Initiate env - this is only used when doing migrations:
  will not overwrite env set in app.js or global.tests.js
*/
require('./../../../../configEnv');

module.exports = {
  username: process.env.DB_USERNAME || 'example_user',
  password: process.env.DB_PASSWORD || 'example_pass',
  database: process.env.DB_NAME || 'example_db',
  host: process.env.HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  dialect: process.env.DB_DIALECT || 'postgres',
  logging: process.env.CONFIG_SEQUELIZE_LOGGING === 'true' ? log.info : false,
  operatorsAliases: Sequelize.Op,

  // Print query execution time in milliseconds when logging SQL.
  benchmark: process.env.CONFIG_SEQUELIZE_LOGGING === 'true',
  timezone: '+00:00',
  define: {
    instanceMethods: {
      touch() {
        return this.sequelize.query(`UPDATE "${this.$modelOptions.tableName}" SET "${this.$modelOptions.updatedAt}"='${moment().utcOffset(0).format('YYYY-MM-DD HH:mm:ss.SSS')}' WHERE id=${this.id}`);
      },

      toKeyString() {
        return `node_${this.$modelOptions.tableName}_${this.id}/${this.updated_at}`;
      },
    },
  },
  pool: {
    max: 10,
    min: 2,
    idle: 10000,
  },
};
