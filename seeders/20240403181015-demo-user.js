'use strict';
const bcrypt = require('bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('users', [
      { 
        username: 'ismail',
        email: 'hamdismailkskn98@gmail.com', 
        password: await bcrypt.hash('456128', 10),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      { 
        username: 'ibrahim', 
        email: 'ibrahim@gmail.com', 
        password: await bcrypt.hash('456128', 10),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      { 
        username: 'muhammed', 
        email: 'muhammed@gmail.com', 
        password: await bcrypt.hash('456128', 10),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      { 
        username: 'sengul', 
        email: 'sengul@gmail.com', 
        password: await bcrypt.hash('456128', 10),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      { 
        username: 'adem', 
        email: 'sengul@gmail.com', 
        password: await bcrypt.hash('456128', 10),
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ])
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('users', null, {});
  }
};
