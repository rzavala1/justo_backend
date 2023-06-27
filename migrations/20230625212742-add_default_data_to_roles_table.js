'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const users = [
      { name: 'Boss'},
      { name: 'Manager'},
      { name: 'Hitman'},
    ];

    await queryInterface.bulkInsert('roles', users, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('roles', null, {});
  },
};