'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    const users = [
      { description: 'viaja solo', name: 'Ana Perez', status: 'assigned', assignId: 2, createId:2},
      { description: 'sale tarde', name: 'Ramon Guzman', status: 'assigned', assignId:  2, createId:2},
    ];

    await queryInterface.bulkInsert('hits', users, {});

  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('hits', null, {});
  },
};