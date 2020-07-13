//create-post.js
module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('Bells', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      ringsAt: {
        type: Sequelize.TIME,
        allowNull: false
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
  down: (queryInterface /* , Sequelize */) => queryInterface.dropTable('Bells'),
};