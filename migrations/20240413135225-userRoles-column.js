'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn('userRoles', 'userId', {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: {
            tableName: 'users',

          },
          key: 'id',
        }
      }),
      queryInterface.addColumn('userRoles', 'roleId', {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: {
            tableName: 'roles',

          },
          key: 'id',
        }
      })
    ])
  },

  async down (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.removeColumn('userRoles', 'userId'),
      queryInterface.removeColumn('userRoles', 'roleId'),
    ])
  }
};
