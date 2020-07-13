//BELL Schema
module.exports = (sequelize,DataTypes) => {
  let Bell = sequelize.define('Bell',{
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  ringsAt: {
    type: DataTypes.TIME,
    allowNull: false
  },
  profileId: {
    type: DataTypes.INTEGER,
    foreignKey: true,
  }
});

  Bell.associate = function (models) {
    Bell.belongsTo(models.Profile,{
        onDelete : "CASCADE",
        foreignKey : 'profileId'
    });
  };

  return Bell;
}