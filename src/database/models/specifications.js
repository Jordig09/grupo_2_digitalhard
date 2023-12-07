"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Specification extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Specification.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Specification",
      tableName: "specifications",
      timestamps: false,
    }
  );
  return Specification;
};
