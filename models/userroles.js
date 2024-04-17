'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserRoles extends Model {
    static associate(models) {
     UserRoles.belongsTo(models.Role);
     UserRoles.belongsTo(models.User);
    }
  }
  UserRoles.init({}, {
    sequelize,
    modelName: 'UserRoles',
    timestamps: false,
  });
  return UserRoles;
};