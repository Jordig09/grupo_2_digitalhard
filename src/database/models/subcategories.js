"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Subcategory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Subcategory.belongsTo(models.Category, {
        as: "category",
        foreignKey: "category_id",
      });
      Subcategory.hasMany(models.Product, {
        as: "product",
        foreignKey: "subcategory_id",
      });
    }
  }
  Subcategory.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Subcategory",
      tableName: "subcategories",
      timestamps: false,
    }
  );
  return Subcategory;
};
