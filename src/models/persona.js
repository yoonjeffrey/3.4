'use strict';
import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class Persona extends Model {
    static associate(models) {
      Persona.belongsToMany(models.Tarea, {
        through: 'PersonaTareas',
        foreignKey: 'PersonaId',
        otherKey: 'TareaId'
      });
    }
  }
  Persona.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Persona',
  });
  return Persona;
};
