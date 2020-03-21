module.exports = function(sequelize, DataTypes) {
  var Space = sequelize.define("Space", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    gif: {
      type: DataTypes.STRING,
      allowNull: false
    },
    gameid: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });
  return Space;
};
