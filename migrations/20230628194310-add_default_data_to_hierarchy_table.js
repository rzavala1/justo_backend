'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const users = [
      { parentId:2 ,childId:5},
      { parentId:2 ,childId:6},
      { parentId:2 ,childId:7},
    ];

    await queryInterface.bulkInsert('hierarchy', users, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('hierarchy', null, {});
  },
};