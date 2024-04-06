'use strict';
const bcrypt = require('bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Users', [
      { 
        username: 'admin',
        email: 'hamdismailkskn98@gmail.com', 
        password: await bcrypt.hash('4856', 10),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      { 
        username: 'ismailkskn', 
        email: 'ismailkeskin98@gmail.com', 
        password: await bcrypt.hash('456128', 10),
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ])
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
