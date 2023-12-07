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
    }
  }
  CartDetails.init(
    {
      cart_id: {
        type: DataTypes.INTEGER,
      },
      product_id: {
        type: DataTypes.INTEGER,
      },
      cuantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "CartDetails",
      tableName: "cart_details",
    }
  );
  return CartDetails;
};
