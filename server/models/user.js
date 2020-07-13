//USER Schema
module.exports = (sequelize,DataTypes) => {
  let User = sequelize.define('User',{
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    login: {
      type: DataTypes.STRING
    },
    password: {
      type: DataTypes.STRING
    }
  });
  return User;
}