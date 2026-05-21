'use strict';
import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class PersonaTarea extends Model {
    static associate(models) {
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
