const typeorm = require('typeorm');

module.exports = async () => {
  const connection = await typeorm.getConnection();
  await connection.close();
};
