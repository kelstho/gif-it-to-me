module.exports = function(sequelize, DataTypes) {
  var Randomcaption = sequelize.define("Randomcaption", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    caption: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });
  return Randomcaption;
};
