'use strict';

const { faker } = require('@faker-js/faker');
const { User } = require('../models');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const users = await User.findAll({ attributes: ['id'] });
    const schedules = [];

    for (let i = 0; i < 10; i++) {
      const user = users[Math.floor(Math.random() * users.length)];
      const start = faker.date.soon({ days: 30 }); // within the next 30 days

      // Round to the next full hour
      start.setMinutes(0);
      start.setSeconds(0);
      start.setMilliseconds(0);
      start.setHours(start.getHours() + 1);

      const end = new Date(start.getTime() + 60 * 60 * 1000); // +1 hour

      schedules.push({
        userId: user.id,
        start,
        end,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    await queryInterface.bulkInsert('Schedules', schedules);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Schedules', null, {});
  }
};
