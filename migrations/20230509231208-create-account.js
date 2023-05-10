'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      'Accounts',
      {
        id: {
          type: Sequelize.DataTypes.INTEGER,
          autoIncrement: true,
          allowNull: false,
          primaryKey: true,
        },
        name: {
          type: Sequelize.DataTypes.STRING,
          allowNull: false,
          comment: 'Nome curto da conta. É usado mais comumente na UI.',
        },
        icon: {
          type: Sequelize.DataTypes.STRING,
          allowNull: false,
          comment: 'Nome da classe CSS que representa o ícone de bancos pré-cadastrados.',
        },
        description: {
          type: Sequelize.DataTypes.STRING,
          allowNull: true,
          comment: 'Descrição longa da conta',
        },
        type: {
          type: Sequelize.DataTypes.SMALLINT,
          allowNull: false,
          comment:
            'Tipos possíveis de conta: 1 - Conta corrente à vista; 2 - Conta poupança; 3 - Conta de investimento; 4 - Cartão de crédito; 5 - Dinheiro em espécie; 6 - Outros.',
          defaultValue: 1,
        },
        initialBalance: {
          type: Sequelize.DataTypes.DOUBLE,
          allowNull: false,
          defaultValue: 0.0,
          comment: 'Saldo inicial da conta.',
        },
        activated: {
          type: Sequelize.DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: true,
          comment: 'Indica se a conta está ativa ou inativa para lançamento de novas transações.',
        },
        createdAt: {
          type: Sequelize.DataTypes.DATE,
          allowNull: false,
        },
        updatedAt: {
          type: Sequelize.DataTypes.DATE,
          allowNull: false,
        },
        userId: {
          type: Sequelize.DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: {
              tableName: 'users',
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
    await queryInterface.dropTable('Accounts');
  },
};
