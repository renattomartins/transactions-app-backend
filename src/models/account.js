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
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: 'Nome curto da conta. É usado mais comumente na UI.',
      validate: {
        notNull: true,
        notEmpty: true,
      },
    },
    icon: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: 'Nome da classe CSS que representa o ícone de bancos pré-cadastrados.',
    },
    description: { type: DataTypes.STRING, allowNull: true, comment: 'Descrição longa da conta' },
    type: {
      type: DataTypes.SMALLINT, //@todo test DataType.ENUM
      allowNull: false,
      comment:
        'Tipos possíveis de conta: 1 - Conta corrente à vista; 2 - Conta poupança; 3 - Dinheiro em espécie.',
      defaultValue: 1,
      isIn: [1, 2, 3],
    },
    currentAmount: {
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
      comment: 'Indica se a conta está ativa ou inativa para lançamento de novas transações.',
      validate: {
        notNull: true,
      },
    },
  },
  {
    charset: 'utf8',
  }
);

module.exports = Account;
