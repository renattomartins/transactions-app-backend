'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      'Users',
      {
        id: {
          type: Sequelize.DataTypes.INTEGER,
          autoIncrement: true,
          allowNull: false,
          primaryKey: true,
        },
        email: {
          type: Sequelize.DataTypes.STRING,
          allowNull: false,
          unique: true,
          comment: 'Email do usuário. É usado como username no sistema e precisar único.',
        },
        password: {
          type: Sequelize.DataTypes.STRING,
          allowNull: false,
          comment: 'Hash da senha do usuário.',
        },
        createdAt: {
          type: Sequelize.DATE,
          allowNull: false,
        },
        updatedAt: {
          type: Sequelize.DATE,
          allowNull: false,
        },
      },
      {
        charset: 'utf8',
      }
    );
  },
  async down(queryInterface) {
    await queryInterface.dropTable('Users');
  },
};
