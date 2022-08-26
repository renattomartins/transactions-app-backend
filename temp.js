// domain/Account/

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
    // console.log('Connection has been established successfully.');
  } catch (error) {
    // eslint-disable-next-line no-console
    // console.log('Unable to connect to the database', error);
  }
};

const Account = (provider) => {
  const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    logging: (...msg) => console.log(msg),
  });

  testConnection(sequelize);

  // sequelize.close();
};

module.exports = Account;

// infrasctruture/providers

const { Sequelize, DataTypes, Model } = require('sequelize');

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
  host: process.env.DB_HOST,
  dialect: 'mysql',
  logging: (...msg) => console.log(msg),
});

class Account extends Model {}

Account.init(
  {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    modelName: 'Account',
  }
);

// console.log(Account === sequelize.models.Account);

// Account.sync({ force: true });

module.exports = Account;
