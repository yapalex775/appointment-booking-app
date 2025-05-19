'use strict';

const { faker } = require('@faker-js/faker');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const offices = [];
    for (let i = 0; i < 10; i++) {
      offices.push({
        name: faker.company.name(),
        address: faker.location.streetAddress(),
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }
    await queryInterface.bulkInsert('Offices', offices);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Offices', null, {});
  }
};
