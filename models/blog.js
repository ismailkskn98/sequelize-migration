'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Blog extends Model {
    static associate(models) {
      Blog.belongsTo(models.User);
      Blog.belongsToMany(models.Category, {through: models.BlogCategories});
    }
  }
  Blog.init({
    title: DataTypes.STRING,
    url: DataTypes.STRING,
    subTitle: DataTypes.STRING,
    description: DataTypes.TEXT,
    image: DataTypes.STRING,
    isActive: DataTypes.BOOLEAN,
    isHome: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Blog',
  });
  return Blog;
};