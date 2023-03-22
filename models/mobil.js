'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Mobil extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Mobil.init({
    nama_mobil: DataTypes.STRING,
    sewa: DataTypes.INTEGER,
    ukuran: DataTypes.STRING,
    foto: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Mobil',
  });
  return Mobil;
};