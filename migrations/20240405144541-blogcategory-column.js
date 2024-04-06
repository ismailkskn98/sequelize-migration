'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn('blogcategories', 'blogId', {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: {
            tableName: 'blogs',
          },
          key: 'id'
        },
      }),
      queryInterface.addColumn('blogcategories', 'categoryId', {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: {
            tableName: 'categories',
          },
          key: 'id'
        },
      }),
    ])
  },

  async down (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.removeColumn('blogcategories', 'blogId'),
      queryInterface.removeColumn('blogcategories', 'categoryId'),
    ])
  }
};
