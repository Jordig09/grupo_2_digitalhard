"use strict";
const bcrypt = require("bcrypt");
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.belongsTo(models.Rol, {
        as: "rol",
        foreignKey: "roles_id",
      });
      User.hasMany(models.Cart, {
        as: "cart",
        foreignKey: "users_id",
      });
      User.hasMany(models.Address, {
        as: "addresses",
        foreignKey: "users_id",
        onDelete: "cascade",
      });
    }
  }
  User.init(
    {
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      avatar: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      roles_id: {
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: "User",
      tableName: "users",
      hooks: {
        beforeCreate: (user, option) => {
          user.password = bcrypt.hashSync(user.password, 10);
        },
      },
    }
  );
  return User;
};
