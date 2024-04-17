'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Role extends Model {
    static associate(models) {
      Role.belongsToMany(models.User, {through: 'UserRoles'});
    }
  }
  Role.init({
    rolename: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Role',
    timestamps: false,
  });
  return Role;
};