const { Sequelize, DataTypes } = require('sequelize');

const sequelize = require('../util/database');

const Transaction = sequelize.define(
  'transaction',
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
      comment: 'Descrição da transação.',
      validate: {
        notNull: true,
      },
    },
    ammount: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      comment: 'Valor da transação, podendo conter sinal.',
      validate: {
        notNull: true,
        isDecimal: true,
      },
      defaultValue: 0.0,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
      comment: 'Data da transação',
      validate: {
        notNull: true,
        isDate: true,
      },
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true,
      comment: 'Notas livres relacionadas à transação.',
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
