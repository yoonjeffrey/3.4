'use strict';
import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class Tag extends Model {
    static associate(models) {
      Tag.belongsToMany(models.Tarea, {
        through: 'TareaTags',
        foreignKey: 'TagId',
        otherKey: 'TareaId'
      });
    }
  }
  Tag.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Tag',
  });
  return Tag;
};
