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
    currentspacevalue: {
      type: DataTypes.INTEGER,
      default: 0
    }
  });

  Player.belongsTo(db.Game, {
    foreignKey: {
      allowNull: false
    }
  });

  return Player;
};
