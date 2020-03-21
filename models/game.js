module.exports = function(sequelize, DataTypes) {
  var Game = sequelize.define("Game", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    boardName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    judgeid: {
      type: DataTypes.INTEGER
    }
  });
  return Game;
};
