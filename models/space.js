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
    value: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });

  Space.belongsTo(db.Game, {
    foreignKey: {
      allowNull: false
    }
  });

  return Space;
};
