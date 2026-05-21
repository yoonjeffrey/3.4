'use strict';
import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class Tarea extends Model {
    static associate(models) {
      Tarea.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user'
      });
      Tarea.belongsToMany(models.Persona, {
        through: 'PersonaTareas',
        foreignKey: 'TareaId',
        otherKey: 'PersonaId'
      });
      Tarea.belongsToMany(models.Tag, {
        through: 'TareaTags',
        foreignKey: 'TareaId',
        otherKey: 'TagId'
      });
    }
  }
  Tarea.init({
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    status: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Tarea',
  });
  return Tarea;
};
