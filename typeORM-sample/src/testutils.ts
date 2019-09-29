import * as typeorm from 'typeorm';

export async function connectDatabase() {
  const ormconfig = require('../ormconfig.test');
  try {
    await typeorm.getConnection(ormconfig);
  } catch (err) {
    const connection = await typeorm.createConnection(ormconfig);
    await connection.dropDatabase();
    await connection.synchronize();
  }
}
