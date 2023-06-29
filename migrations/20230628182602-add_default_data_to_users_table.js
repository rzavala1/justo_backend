'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const defaultPassword = '$2a$10$HhHomxgrDlyZdPHEcqER/u44vooKsgIxi8GLH82NFDZEIhIVi9xfO';

    const users = [
      { name: 'Juan Lopez', email: 'lopez@example.com', password: defaultPassword, roleId: '1', active:true},
      { name: 'Marian M', email: 'marian@example.com', password: defaultPassword, roleId: '2' , active:true},
      { name: 'Mildred T', email: 'mildred@example.com', password: defaultPassword, roleId: '2' , active:true},
      { name: 'Luis M', email: 'luis@example.com', password: defaultPassword, roleId: '2' ,active:true},
      { name: 'John M', email: 'john@example.com', password: defaultPassword, roleId: '3' ,active:true},
      { name: 'Manuel H', email: 'manuel@example.com', password: defaultPassword, roleId: '3' ,active:true},
      { name: 'Alfonso ', email: 'alfonso@example.com', password: defaultPassword, roleId: '3' ,active:true},
      { name: 'Juan P', email: 'juanp@example.com', password: defaultPassword, roleId: '3' ,active:true},
      { name: 'Gonzalo', email: 'gonzalo@example.com', password: defaultPassword, roleId: '3' ,active:true},
      { name: 'Toribio D', email: 'toribio@example.com', password: defaultPassword, roleId: '3' ,active:true},
      { name: 'Eliza', email: 'eliza@example.com', password: defaultPassword, roleId: '3' ,active:true},
      { name: 'Claudio', email: 'claudio@example.com', password: defaultPassword, roleId: '3',active:true },
      { name: 'Antonio', email: 'antonio@example.com', password: defaultPassword, roleId: '3' ,active:true},
    ];

    await queryInterface.bulkInsert('users', users, {});

  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('boss', null, {});
  },
};