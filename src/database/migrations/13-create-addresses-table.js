"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("addresses", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      city: {
        type: Sequelize.STRING,
      },
      province: {
        type: Sequelize.STRING,
      },
      postal: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      street: {
        type: Sequelize.STRING,
        allowNull: false
      },
      streetAddress: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      floorNumber: {
        type: Sequelize.INTEGER,
      },
      flatLetter: {
        type: Sequelize.STRING,
      },
      users_id: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: "users",
          },
          key: "id",
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("addresses");
  },
};
