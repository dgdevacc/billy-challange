const db = require('./../api/lib/db'); // Initialize DB connection pool

describe('[info] Running afterAll.tests.js', () => {
  it('Close the database', (done) => {
    db.sequelize.close().then(() => done());
  });
});
