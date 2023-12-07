"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class VariationsProducts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  VariationsProducts.init(
    {
      product_id: {
        type: DataTypes.INTEGER,
      },
      product_var_id: {
        type: DataTypes.INTEGER,
      },
      variation_id: {
        type: DataTypes.INTEGER,
      },
      detail_id: {
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: "VariationsProducts",
      tableName: "variations_products",
      timestamps: false,
    }
  );
  return VariationsProducts;
};
