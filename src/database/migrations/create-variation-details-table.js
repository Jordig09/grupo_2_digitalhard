"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("variation_details", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      detail: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      variation_id: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: "variations",
          },
          key: "id",
        },
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("variation_details");
  },
};
