const db = require('./../api/lib/db'); // Initialize DB connection pool
const log = require('./../api/lib/utils/log');

describe('[info] Running beforeAll.tests.js', () => {
  before(() => {
    if (process.env.CONFIG_ENABLE_TESTS === undefined || process.env.CONFIG_ENABLE_TESTS == null || process.env.CONFIG_ENABLE_TESTS.toLowerCase() === 'false') {
      log.error('Tests will not be run unless the environment variable CONFIG_ENABLE_TESTS = true.');
      log.error('This is to prevent data loss since tests will WIPE the database currently set in the DB_NAME environment variable.');
      log.warn(`The current value of DB_NAME is ${process.env.DB_NAME}`);

      process.exit(1);
    }
  });

  it(`Clean the ${process.env.DB_NAME} before all other tests`, (done) => {
    // Force syncing the db to clear all tables ahead of tests.
    db.sequelize.sync({ force: true, cascade: true })
      .then(() => done())
      .catch(err => done(err));
  });
});
