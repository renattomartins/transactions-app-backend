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

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
  host: process.env.DB_HOST,
  dialect: 'mysql',
});

module.exports = sequelize;
