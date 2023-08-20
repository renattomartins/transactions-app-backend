const { DataTypes } = require('sequelize');

const sequelize = require('../util/database');

const AccountTypes = {
  CHECKING_ACCOUNT: 1,
  SAVING_ACCOUNT: 2,
  INVESTMENT_ACCOUNT: 3,
  CREDIT_CARD: 4,
  MONEY: 5,
  OTHER: 6,
};

const Account = sequelize.define(
  'Account',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: true,
      },
    },
    icon: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    type: {
      type: DataTypes.SMALLINT, // @todo test DataType.ENUM
      allowNull: false,
      defaultValue: 1,
      validate: {
        isIn: [[1, 2, 3, 4, 5, 6]],
      },
    },
    initialBalance: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: 0.0,
      validate: {
        notNull: true,
        isDecimal: true,
      },
    },
    activated: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      validate: {
        notNull: true,
      },
    },
  },
  {
    defaultScope: {
      attributes: { exclude: ['userId'] },
    },
    charset: 'utf8',
  }
);

module.exports = Account;
module.exports.AccountTypes = AccountTypes;
