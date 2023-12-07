"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("products", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      price: {
        type: Sequelize.DECIMAL,
        allowNull: false,
      },
      discount: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      stock: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      mainImage: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      brand_id: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: "brands",
          },
          key: "id",
        },
      },
      category_id: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: "categories",
          },
          key: "id",
        },
      },
      subcategory_id: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: "subcategories",
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
    await queryInterface.dropTable("products");
  },
};
