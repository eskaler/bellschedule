//auser-migration.js
module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('Profiles', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
    }),
  down: (queryInterface /* , Sequelize */) => queryInterface.dropTable('Profiles'),
};