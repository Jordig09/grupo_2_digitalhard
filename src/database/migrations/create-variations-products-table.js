"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("variations_products", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      product_id: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: "products",
          },
          key: "id",
        },
      },
      product_var_id: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: "products",
          },
          key: "id",
        },
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
      detail_id: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: "variation_details",
          },
          key: "id",
        },
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("variations_products");
  },
};
