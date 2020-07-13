//DAY Schema
module.exports = (sequelize,DataTypes) => {
  let Day = sequelize.define('Day',{
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    weekday: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    profileId: {
      type: DataTypes.INTEGER,
      foreignKey: true
    }
  });

  Day.associate = function (models) {
    Day.belongsTo(models.Profile,{
        foreignKey : 'profileId'
    });
  };

  return Day;
}