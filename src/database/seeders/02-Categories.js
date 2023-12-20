"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert(
      "categories",
      [
        { name: "Equipos y Notebooks" },
        { name: "Procesadores" },
        { name: "Mothers" },
        { name: "Placas de Video" },
        { name: "Memorias RAM" },
        { name: "Almacenamiento" },
        { name: "Refrigeración" },
        { name: "Gabinetes" },
        { name: "Fuentes" },
        { name: "Monitores" },
        { name: "Periféricos" },
        { name: "Sillas Gamers" },
        { name: "Conectividad" },
        { name: "Estabilizadores y UPS" },
        { name: "Consolas de Video Juego" },
        { name: "Cables y Adaptadores" },
        { name: "Celulares y Smartwatch" },
        { name: " Impresoras e Insumos" },
        { name: "Televisores" },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("categories", null, {});
  },
};
