'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('UserOffices', {
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      officeId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Offices',
          key: 'id'
        },
        onDelete: 'CASCADE'
      }
    });

    await queryInterface.addConstraint('UserOffices', {
      fields: ['userId', 'officeId'],
      type: 'unique',
      name: 'unique_user_office_pair'
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('UserOffices');
  }
};
