'use strict';
const slugField = require('../helpers/slugfield');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
 async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('categories', [
      { 
        name: 'Web Geliştirme',
        url: slugField('Web Geliştirme'),
      },
      { 
        name: 'Mobil Geliştirme',
        url: slugField('Mobil Geliştirme'),
      },
      { 
        name: 'Programlama' ,
        url: slugField('Programlama'),
      },
      { 
        name: 'Veri Bilimi',
        url: slugField('Veri Bilimi'),
      },
    ])
  },
  async down (queryInterface, Sequelize) {
   return queryInterface.bulkDelete('categories', null, {});
  }
};
