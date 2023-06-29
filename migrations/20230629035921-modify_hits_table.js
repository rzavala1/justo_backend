'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    queryInterface.changeColumn('hits', 'status', {
      type: Sequelize.ENUM('assigned', 'completed', 'failed'),
      allowNull: true,
      defaultValue: null,
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.changeColumn('hits', 'status', {
      type: Sequelize.ENUM('assigned', 'completed', 'failed'),
      allowNull: false,
      defaultValue: 'assigned',
    });
  }
};
