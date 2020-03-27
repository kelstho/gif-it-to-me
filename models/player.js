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

  Player.associate = function(models) {
    Player.belongsTo(models.Game, {
      foreignKey: {
        allowNull: false
      }
    });
  };
  return Player;
};
