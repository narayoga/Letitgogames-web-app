'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Games extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Games.hasOne(models.Leaderboards,{foreignKey:'gameId',sourceKey:'id'})
    }
  }
  Games.init({
    gamesname: DataTypes.STRING,
    view: DataTypes.INTEGER,
    src: DataTypes.STRING,
    desc: DataTypes.TEXT,
    banner: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Games',
  });
  return Games;
};