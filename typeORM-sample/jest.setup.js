require('ts-node/register');

const typeorm = require('typeorm');

const ormconfig = require('./ormconfig.test');

module.exports = async () => {
  console.log(ormconfig);
  await typeorm.createConnection(ormconfig);
  console.log('ok');
};
