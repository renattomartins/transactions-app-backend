/* eslint-disable no-console */
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

const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
  host: process.env.DB_HOST,
  dialect: 'mysql',
  logging: (...msg) => console.log(msg),
});

const userProvider = sequelize.define(
  'User',
  {
    id: { type: DataTypes.INTEGER, primaryKey: true },
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    created: DataTypes.DATE,
    modified: DataTypes.DATE,
  },
  {
    timestamps: false,
  }
);

module.exports = userProvider;

// ---------------------------------------------------------------------

// const { Sequelize } = require('sequelize');

// const testConnection = async (sequelize) => {
//   try {
//     await sequelize.authenticate();
//     // eslint-disable-next-line no-console
//     // console.log('Connection has been established successfully.');
//   } catch (error) {
//     // eslint-disable-next-line no-console
//     // console.log('Unable to connect to the database', error);
//   }
// };

// sequelize.close();