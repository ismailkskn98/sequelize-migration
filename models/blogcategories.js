'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class BlogCategories extends Model {
    static associate(models) {
      BlogCategories.belongsTo(models.Blog);
      BlogCategories.belongsTo(models.Category);
    }
  }
  BlogCategories.init({}, {
    sequelize,
    modelName: 'BlogCategories',
    timestamps: false,
  });
  return BlogCategories;
};