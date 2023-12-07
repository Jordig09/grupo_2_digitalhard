"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ImageProduct extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ImageProduct.belongsTo(models.Product, {
        foreignKey: "product_id",
      });

      ImageProduct.belongsTo(models.Image, {
        foreignKey: "image_id",
      });
    }
  }
  ImageProduct.init(
    {
      image_id: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      product_id: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: "ImageProduct",
      tableName: "images_products",
      timestamps: false,
    }
  );
  return ImageProduct;
};
