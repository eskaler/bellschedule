//PROFILE Schema
module.exports = (sequelize,DataTypes) => {
  let Setting = sequelize.define('Setting',{
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    field: {
      type: DataTypes.STRING
    },
    value: {
      type: DataTypes.STRING
    }
  });

  return Setting;
}

// INSERT INTO "main"."Settings" ("field", "value") VALUES ('server_ip', '192.168.100.3');
// INSERT INTO "main"."Settings" ("field", "value") VALUES ('bell_duration', '1000');