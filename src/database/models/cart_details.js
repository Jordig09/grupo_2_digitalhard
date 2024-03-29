"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class CartDetails extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      CartDetails.belongsTo(models.Cart, { 
        as: "cart",
        foreignKey: "carts_id",
      })
      CartDetails.belongsTo(models.Product, {
        as: "product",
        foreignKey: "products_id",
      })
    }
  }
  CartDetails.init(
    {
      carts_id: {
        type: DataTypes.INTEGER,
      },
      products_id: {
        type: DataTypes.INTEGER,
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "CartDetails",
      tableName: "cart_details",
      timestamps: false,
    }
  );
  return CartDetails;
};
