"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class SpecificationDetails extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  SpecificationDetails.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      text: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      specification_id: {
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: "SpecificationDetails",
      tableName: "specification_details",
      timestamps: false,
    }
  );
  return SpecificationDetails;
};
