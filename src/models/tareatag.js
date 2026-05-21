'use strict';
import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class TareaTag extends Model {
    static associate(models) {
    }
  }
  TareaTag.init({
    TareaId: DataTypes.INTEGER,
    TagId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'TareaTag',
  });
  return TareaTag;
};
