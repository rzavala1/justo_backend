'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const defaultPassword = '$2a$10$HhHomxgrDlyZdPHEcqER/u44vooKsgIxi8GLH82NFDZEIhIVi9xfO';

    const users = [
      { name: 'Juan Lopez', email: 'lopez@example.com', password: defaultPassword, roleId: '1' },
      { name: 'Marian M', email: 'marian@example.com', password: defaultPassword, roleId: '2' },
      { name: 'Mildred T', email: 'mildred@example.com', password: defaultPassword, roleId: '2' },
      { name: 'Luis M', email: 'luis@example.com', password: defaultPassword, roleId: '2' },
      { name: 'John M', email: 'john@example.com', password: defaultPassword, roleId: '3' },
      { name: 'Manuel H', email: 'manuel@example.com', password: defaultPassword, roleId: '3' },
      { name: 'Alfonso ', email: 'alfonso@example.com', password: defaultPassword, roleId: '3' },
      { name: 'Juan P', email: 'juanp@example.com', password: defaultPassword, roleId: '3' },
      { name: 'Gonzalo', email: 'gonzalo@example.com', password: defaultPassword, roleId: '3' },
      { name: 'Toribio D', email: 'toribio@example.com', password: defaultPassword, roleId: '3' },
      { name: 'Eliza', email: 'eliza@example.com', password: defaultPassword, roleId: '3' },
      { name: 'Claudio', email: 'claudio@example.com', password: defaultPassword, roleId: '3' },
      { name: 'Antonio', email: 'antonio@example.com', password: defaultPassword, roleId: '3' },
    ];

    const boss = [
      { userId: 1 },
    ];

    const managers = [
      { userId: 2, bossId: 1 },
      { userId: 3, bossId: 1 },
      { userId: 4, bossId: 1 },
    ];

    const hitmen = [
      { userId: 5, managerId: 1 },
      { userId: 6, managerId: 1 },
      { userId: 7, managerId: 1 },
      { userId: 8, managerId: 1 },
      { userId: 9, managerId: 1 },
      { userId: 10, managerId: 1 },
      { userId: 11, managerId: 1 },
      { userId: 12, managerId: 1 },
      { userId: 13, managerId: 1 },
    ];

    await queryInterface.bulkInsert('users', users, {});
    await queryInterface.bulkInsert('boss', boss, {});
    await queryInterface.bulkInsert('manager', managers,{});
    await queryInterface.bulkInsert('hitman', hitmen,{});

  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('boss', null, {});
    await queryInterface.bulkDelete('manager', null, {});
    await queryInterface.bulkDelete('hitman', null, {});
    await queryInterface.bulkDelete('users', null, {});
  },
};