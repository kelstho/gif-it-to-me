module.exports = function(sequelize, DataTypes) {
  var Game = sequelize.define("Game", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    board_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    judgeid: {
      type: DataTypes.INTEGER
    }
  });
  return Game;
};
