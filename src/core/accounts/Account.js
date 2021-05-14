const { Sequelize } = require('sequelize');

const testConnection = async (sequelize) => {
  try {
    await sequelize.authenticate();
    // eslint-disable-next-line no-console
    console.log('Connection has been established successfully.');
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log('Unable to connect to the database', error);
  }
};

const Account = () => {
  const sequelize = new Sequelize('transactions-app', 'root', null, {
    host: 'localhost',
    dialect: 'mysql',
  });

  testConnection(sequelize);
};

module.exports = Account;
