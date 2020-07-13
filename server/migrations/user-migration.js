//auser-migration.js
module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('Users', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true
      },
      login: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      }
    }),
  down: (queryInterface /* , Sequelize */) => queryInterface.dropTable('Users'),
};