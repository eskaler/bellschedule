//create-post.js
module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('Settings', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      field: {
        type: Sequelize.STRING
      },
      value: {
        type: Sequelize.STRING
      }
    }),
  down: (queryInterface /* , Sequelize */) => queryInterface.dropTable('Settings'),
};