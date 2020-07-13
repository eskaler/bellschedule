//auser-migration.js
module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('Days', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true
      },
      weekday: {
        type: Sequelize.INTEGER
      },
      profileId: {
        type: Sequelize.INTEGER,
        foreignKey: true,
        references: {
          model: 'Profiles',
          key: 'id'
        }
      }
    }),
  down: (queryInterface /* , Sequelize */) => queryInterface.dropTable('Days'),
};