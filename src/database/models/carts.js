"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Cart.belongsTo(models.User, {
        as: "user",
        foreignKey: "users_id",
      });
      Cart.hasMany(models.CartDetails, {
        as: "details",
        foreignKey: "carts_id",
      })
    }
  }
  Cart.init(
    {
      users_id: {
        type: DataTypes.INTEGER,
      },
      status_id: {
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: "Cart",
      tableName: "carts",
    }
  );
  return Cart;
};
