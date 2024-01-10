"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Address extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Address.init(
    {
      province: {
        type: DataTypes.STRING,
      },
      city: {
        type: DataTypes.STRING,
      },
      postal: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      street: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      streetAddress: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      floorNumber: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      flatLetter: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      users_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Address",
      tableName: "addresses",
    }
  );
  return Address;
};
