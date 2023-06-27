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

    await queryInterface.bulkInsert('users', users, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('users', null, {});
  },
};