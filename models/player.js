module.exports = function(sequelize, DataTypes) {
  var Player = sequelize.define("Player", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    ready: {
      type: DataTypes.BOOLEAN
    },
    spaceid: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    gameid: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });
  return Player;
};
