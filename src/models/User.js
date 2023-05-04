const { DataTypes } = require('sequelize');

const sequelize = require('../util/database');

const User = sequelize.define(
  'user',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      comment: 'Email do usuário. É usado como username no sistema e precisar único.',
      validate: {
        isEmail: true,
        notNull: true,
        notEmpty: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: 'Hash da senha do usuário.',
      validate: {
        notNull: true,
        notEmpty: true,
      },
    },
  },
  {
    defaultScope: {
      attributes: { exclude: ['password'] },
    },
    charset: 'utf8',
  }
);

module.exports = User;
