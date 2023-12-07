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
      "subcategories",
      [
        { name: "Notebooks", category_id: 1 },
        { name: "Procesadores AMD", category_id: 2 },
        { name: "Procesadores Intel", category_id: 2 },
        { name: "Mothers AMD", category_id: 3 },
        { name: "Mothers Intel", category_id: 3 },
        { name: "Placas de video GeForce", category_id: 4 },
        { name: "Placa de video Radeon AMD", category_id: 4 },
        { name: "Memorias", category_id: 5 },
        { name: "Memorias notebook", category_id: 5 },
        { name: "Discos rígidos", category_id: 6 },
        { name: "Discos Sólidos SSD", category_id: 6 },
        { name: "Coolers Fan", category_id: 7 },
        { name: "Coolers CPU", category_id: 7 },
        { name: "Pasta Térmica", category_id: 7 },
        { name: "Gabinetes", category_id: 8 },
        { name: "Fuentes de alimentación", category_id: 9 },
        { name: "Monitores y pantallas", category_id: 10 },
        { name: "Auriculares", category_id: 11 },
        { name: "Teclados", category_id: 11 },
        { name: "Mouses", category_id: 11 },
        { name: "Webcam", category_id: 11 },
        { name: "Joysticks", category_id: 11 },
        { name: "Mouse Pads", category_id: 11 },
        { name: "Parlantes", category_id: 11 },
        { name: "Combos de teclados, mouses y otros", category_id: 11 },
        { name: "Micrófonos", category_id: 11 },
        { name: "Accesorios para auriculares", category_id: 11 },
        { name: "Accesorios y respuestos de teclados", category_id: 11 },
        { name: "Sillas Gamers", category_id: 12 },
        { name: "Placas de red inalambricas", category_id: 13 },
        { name: "Routers WiFi ", category_id: 13 },
        { name: "Estabilizadores", category_id: 14 },
        { name: "UPS", category_id: 14 },
        { name: "Consolas", category_id: 15 },
        { name: "Cables y adaptadores", category_id: 16 },
        { name: "Celulares", category_id: 17 },
        { name: "Smartwatch", category_id: 17 },
        { name: "Accesorios de celulares", category_id: 17 },
        { name: "Impresoreas y multifunciones", category_id: 18 },
        { name: "Insumos originales", category_id: 18 },
        { name: "Televisores", category_id: 19 },
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
    await queryInterface.bulkDelete("subcategories", null, {});
  },
};
