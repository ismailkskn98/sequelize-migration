'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.addColumn('blogs', 'userId', {
        type: Sequelize.INTEGER,
        allowNull: true, // şimdilik
        references: {
          model: {
            tableName: 'users',
          },
          key: 'id'
        },
    })
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.removeColumn('blogs', 'userId');
  }
};
