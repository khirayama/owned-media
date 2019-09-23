import 'ts-node/register';
import * as typeorm from 'typeorm';

const ormconfig = require('./ormconfig.test');

module.exports = async () => {
  console.log(ormconfig);
  await typeorm.createConnection(ormconfig);
  console.log('ok');
};
