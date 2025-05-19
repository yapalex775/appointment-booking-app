'use strict';

const { faker } = require('@faker-js/faker');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const insertedOffices = await queryInterface.sequelize.query(
      `SELECT id FROM Offices;`
    );
    const insertedServices = await queryInterface.sequelize.query(
      `SELECT id FROM Services;`
    );

    const officeIds = insertedOffices[0].map(o => o.id);
    const serviceIds = insertedServices[0].map(s => s.id);

    const officeServices = [];
    officeIds.forEach(officeId => {
      // assign 3 random services per office
      const shuffledServices = faker.helpers.shuffle(serviceIds);
      const selectedServices = shuffledServices.slice(0, 3);
      selectedServices.forEach(serviceId => {
        officeServices.push({
          officeId,
          serviceId
        });
      });
    });
    await queryInterface.bulkInsert('OfficeServices', officeServices);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('OfficeServices', null, {});
  }
};
