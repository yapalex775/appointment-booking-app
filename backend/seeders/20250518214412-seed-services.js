'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const services = [];
    const serviceNames = [
      'General Consultation',
      'Dental Cleaning',
      'Pediatrics',
      'Cardiology',
      'Orthopedics',
      'Dermatology',
      'Neurology',
      'Radiology',
      'Laboratory',
      'Physical Therapy',
      'Emergency Care',
      'Mental Health',
      'Vaccinations',
      'Nutrition Counseling',
      'Surgery',
    ];
    serviceNames.forEach(name => {
      services.push({
        name,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    });
    await queryInterface.bulkInsert('Services', services);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Services', null, {});
  }
};
