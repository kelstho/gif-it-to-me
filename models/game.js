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
    maxPlayers: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    judgeid: {
      type: DataTypes.INTEGER
    }
  });

  Game.associate = function(models) {
    Game.hasMany(models.Space, {
      foreignKey: {
        allowNull: false
      }
    });

    Game.hasMany(models.Player, {
      foreignKey: {
        allowNull: false
      }
    });
  };
  return Game;
};
