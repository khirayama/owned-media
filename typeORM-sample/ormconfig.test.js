const ormconfig = require('./ormconfig');

module.exports = Object.assign({}, ormconfig, {
  database: './data/database.test.sqlite',
  logging: false,
});
