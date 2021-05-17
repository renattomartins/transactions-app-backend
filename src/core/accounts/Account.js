const { Sequelize } = require('sequelize');

// Commands:
// $ brew install mysql
// $ brew services start mysql (Mac will re-start it at reboot)
// $ mysql_secure_installation
// $ brew services stop mysql
// $ mysql.server start (Mac will not re-start it at reboot)
// $ mysql.server status
// $ mysql.server stop
// $ mysql -u root -p
// $ mysql -uroot

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
  const sequelize = new Sequelize('transactions_app', 'root', process.env.DB_PASS, {
    host: 'localhost',
    dialect: 'mysql',
  });

  testConnection(sequelize);
};

module.exports = Account;
