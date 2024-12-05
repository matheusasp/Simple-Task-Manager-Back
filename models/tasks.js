'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tasks extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Tasks.init({
    task_name: DataTypes.STRING,
    status:{
      type: DataTypes.STRING,
      defaultValue: 'To Do',
    } 
  }, {
    sequelize,
    modelName: 'Tasks',
  });
  return Tasks;
};