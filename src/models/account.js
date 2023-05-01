const { Sequelize, DataTypes } = require('sequelize');

const sequelize = require('../util/database');

const Account = sequelize.define(
  'account',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    name: { type: DataTypes.STRING, allowNull: false },
    icon: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.STRING, allowNull: false },
    type: { type: DataTypes.SMALLINT, allowNull: false }, //@todo test DataType.ENUM
    currentAmount: { type: DataTypes.DOUBLE, allowNull: false },
    activated: { type: DataTypes.BOOLEAN, allowNull: false },
  }
);

module.exports = Account;
