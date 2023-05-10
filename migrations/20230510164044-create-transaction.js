'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      'Transactions',
      {
        id: {
          type: Sequelize.DataTypes.INTEGER,
          autoIncrement: true,
          allowNull: false,
          primaryKey: true,
        },
        description: {
          type: Sequelize.DataTypes.STRING,
          allowNull: false,
          comment: 'Descrição da transação.',
        },
        ammount: {
          type: Sequelize.DataTypes.DOUBLE,
          allowNull: false,
          defaultValue: 0.0,
          comment: 'Valor da transação, podendo conter sinal.',
        },
        date: {
          type: Sequelize.DataTypes.DATE,
          allowNull: false,
          comment: 'Data da transação',
        },
        notes: {
          type: Sequelize.DataTypes.TEXT,
          allowNull: true,
          comment: 'Notas livres relacionadas à transação.',
        },
        isIncome: {
          type: Sequelize.DataTypes.BOOLEAN,
          allowNull: false,
          comment:
            'Indica se transação é de entrada ou de saída. Só o sinal de negativo não é suficiente devido a transações zeradas.',
        },
        createdAt: {
          type: Sequelize.DataTypes.DATE,
          allowNull: false,
        },
        updatedAt: {
          type: Sequelize.DataTypes.DATE,
          allowNull: false,
        },
        accountId: {
          type: Sequelize.DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: {
              tableName: 'accounts',
            },
            key: 'id',
          },
          onDelete: 'cascade',
          onUpdate: 'cascade',
        },
      },
      {
        charset: 'utf8',
      }
    );
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Transactions');
  },
};
