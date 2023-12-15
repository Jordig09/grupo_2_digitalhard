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
        { name: "Notebooks", categories_id: 1 },
        { name: "Procesadores AMD", categories_id: 2 },
        { name: "Procesadores Intel", categories_id: 2 },
        { name: "Mothers AMD", categories_id: 3 },
        { name: "Mothers Intel", categories_id: 3 },
        { name: "Placas de video GeForce", categories_id: 4 },
        { name: "Placa de video Radeon AMD", categories_id: 4 },
        { name: "Memorias", categories_id: 5 },
        { name: "Memorias notebook", categories_id: 5 },
        { name: "Discos rígidos", categories_id: 6 },
        { name: "Discos Sólidos SSD", categories_id: 6 },
        { name: "Coolers Fan", categories_id: 7 },
        { name: "Coolers CPU", categories_id: 7 },
        { name: "Pasta Térmica", categories_id: 7 },
        { name: "Gabinetes", categories_id: 8 },
        { name: "Fuentes de alimentación", categories_id: 9 },
        { name: "Monitores y pantallas", categories_id: 10 },
        { name: "Auriculares", categories_id: 11 },
        { name: "Teclados", categories_id: 11 },
        { name: "Mouses", categories_id: 11 },
        { name: "Webcam", categories_id: 11 },
        { name: "Joysticks", categories_id: 11 },
        { name: "Mouse Pads", categories_id: 11 },
        { name: "Parlantes", categories_id: 11 },
        { name: "Combos de teclados, mouses y otros", categories_id: 11 },
        { name: "Micrófonos", categories_id: 11 },
        { name: "Accesorios para auriculares", categories_id: 11 },
        { name: "Accesorios y respuestos de teclados", categories_id: 11 },
        { name: "Sillas Gamers", categories_id: 12 },
        { name: "Placas de red inalambricas", categories_id: 13 },
        { name: "Routers WiFi ", categories_id: 13 },
        { name: "Estabilizadores", categories_id: 14 },
        { name: "UPS", categories_id: 14 },
        { name: "Consolas", categories_id: 15 },
        { name: "Cables y adaptadores", categories_id: 16 },
        { name: "Celulares", categories_id: 17 },
        { name: "Smartwatch", categories_id: 17 },
        { name: "Accesorios de celulares", categories_id: 17 },
        { name: "Impresoreas y multifunciones", categories_id: 18 },
        { name: "Insumos originales", categories_id: 18 },
        { name: "Televisores", categories_id: 19 },
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
