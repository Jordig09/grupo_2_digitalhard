"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.belongsTo(models.Brand, {
        as: "brand",
        foreignKey: "brand_id",
      });
      Product.belongsTo(models.Category, {
        as: "category",
        foreignKey: "category_id",
      });
      Product.belongsTo(models.Subcategory, {
        as: "subcategory",
        foreignKey: "subcategory_id",
      });
      Product.belongsToMany(models.Image, {
        as: "images",
        foreignKey: "product_id",
        through: "ImageProduct",
      });
    }
  }
  Product.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      price: {
        type: DataTypes.DECIMAL,
        allowNull: false,
      },
      discount: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      mainImage: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      brand_id: {
        type: DataTypes.INTEGER,
      },
      category_id: {
        type: DataTypes.INTEGER,
      },
      subcategory_id: {
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: "Product",
      tableName: "products",
    }
  );
  return Product;
};
