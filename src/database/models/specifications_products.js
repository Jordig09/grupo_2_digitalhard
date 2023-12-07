"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class SpecificationsProducts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  SpecificationsProducts.init(
    {
      product_id: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      specification_id: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      detail_id: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: "SpecificationsProducts",
      tableName: "specifications_products",
      timestamps: false,
    }
  );
  return SpecificationsProducts;
};
