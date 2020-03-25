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

  Game.hasMany(db.Space, {
    foreignKey: {
      allowNull: false
    }
  });

  Game.hasMany(db.Player, {
    foreignKey: {
      allowNull: false
    }
  });

  return Game;
};
