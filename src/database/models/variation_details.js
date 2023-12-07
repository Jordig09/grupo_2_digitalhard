"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class VariationDetails extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  VariationDetails.init(
    {
      detail: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      variation_id: {
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: "VariationDetails",
      tableName: "variation_details",
      timestamps: false,
    }
  );
  return VariationDetails;
};
