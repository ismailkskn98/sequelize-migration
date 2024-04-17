'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('roles', [
      {
        rolename: 'admin',
      },
      {
        rolename: 'moderator',
      },
      {
        rolename: 'guest',
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('roles', null, {});
  }
};
