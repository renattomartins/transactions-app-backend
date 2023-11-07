const { DataTypes } = require('sequelize');

const sequelize = require('../util/database');

const Transaction = sequelize.define(
  'Transaction',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: true,
      },
    },
    amount: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      validate: {
        notNull: true,
        isDecimal: true,
      },
      defaultValue: 0.0,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notNull: true,
        isDate: true,
      },
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    isIncome: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  },
  {
    charset: 'utf8',
  }
);

module.exports = Transaction;
