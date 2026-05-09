'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PersonaTarea extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  PersonaTarea.init({
    PersonaId: DataTypes.INTEGER,
    TareaId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'PersonaTarea',
  });
  return PersonaTarea;
};