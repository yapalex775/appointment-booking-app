'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('OfficeServices', {
      officeId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Offices',
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      serviceId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Services',
          key: 'id'
        },
        onDelete: 'CASCADE'
      }
    });

    await queryInterface.addConstraint('OfficeServices', {
      fields: ['officeId', 'serviceId'],
      type: 'unique',
      name: 'unique_office_service_pair'
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('OfficeServices');
  }
};
