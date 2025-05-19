'use strict';

const { faker } = require('@faker-js/faker');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const insertedUsers = await queryInterface.sequelize.query(
      `SELECT id FROM Users;`
    );
    const insertedOffices = await queryInterface.sequelize.query(
      `SELECT id FROM Offices;`
    );

    const userIds = insertedUsers[0].map(u => u.id);
    const officeIds = insertedOffices[0].map(o => o.id);

    const userOffices = [];
    userIds.forEach(userId => {
      // assign 1-2 random offices per user
      const shuffledOffices = faker.helpers.shuffle(officeIds);
      const selectedOffices = shuffledOffices.slice(0, faker.number.int({ min: 1, max: 2 }));
      selectedOffices.forEach(officeId => {
        userOffices.push({
          userId,
          officeId
        });
      });
    });
    await queryInterface.bulkInsert('UserOffices', userOffices);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('UserOffices', null, {});
  }
};
