//PROFILE Schema
module.exports = (sequelize,DataTypes) => {
  let Profile = sequelize.define('Profile',{
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
  });

  Profile.associate = function(models) {
    Profile.hasMany(models.Bell,{
        foreignKey : 'profileId',
        as : 'Bells'
    });
  };

  return Profile;
}