const { Sequelize } = require('sequelize');

const sequelize = require('../util/database');

const User = sequelize.define(
  'user',
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    email: { type: Sequelize.STRING, allowNull: false },
    password: { type: Sequelize.STRING, allowNull: false },
    created: { type: Sequelize.DATE, allowNull: false },
    modified: { type: Sequelize.DATE, allowNull: false },
  },
  {
    defaultScope: {
      attributes: { exclude: ['password'] },
    },
    createdAt: 'created',
    updatedAt: 'modified',
  }
);

module.exports = User;
