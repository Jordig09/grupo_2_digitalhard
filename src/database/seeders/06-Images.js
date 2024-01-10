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
      "images",
      [
        { url: "img-1702986351182-13144.png", products_id: 1 },
        { url: "img-1702986351182-83039.png", products_id: 1 },
        { url: "img-1702986351183-52360.png", products_id: 1 },
        { url: "img-1702986428239-13939.png", products_id: 2 },
        { url: "img-1702986428239-21092.png", products_id: 2 },
        { url: "img-1702986428241-67031.png", products_id: 2 },
        { url: "img-1702986836971-13255.png", products_id: 3 },
        { url: "img-1702986836971-88897.png", products_id: 3 },
        { url: "img-1702986836972-38977.png", products_id: 3 },
        { url: "img-1702986934159-31165.png", products_id: 4 },
        { url: "img-1702986963310-33427.png", products_id: 5 },
        { url: "img-1702986963312-96765.png", products_id: 5 },
        { url: "img-1702986963313-30872.png", products_id: 5 },
        { url: "img-1702986986004-65829.png", products_id: 6 },
        { url: "img-1702986986007-30090.png", products_id: 6 },
        { url: "img-1702986986008-67726.png", products_id: 6 },
        { url: "img-1702987001993-74532.png", products_id: 7 },
        { url: "img-1702987001993-95884.png", products_id: 7 },
        { url: "img-1702987001994-59418.png", products_id: 7 },
        { url: "img-1702987022703-49942.png", products_id: 8 },
        { url: "img-1702987022704-17131.png", products_id: 8 },
        { url: "img-1702987022704-91970.png", products_id: 8 },
        { url: "img-1702988163073-87238.png", products_id: 9 },
        { url: "img-1702988163074-52926.png", products_id: 9 },
        { url: "img-1702988163076-57188.png", products_id: 9 },
        { url: "img-1702988190301-93348.png", products_id: 10 },
        { url: "img-1702988190303-65466.png", products_id: 10 },
        { url: "img-1702988190305-45172.png", products_id: 10 },
        { url: "img-1703010291646-34667.png", products_id: 11 },
        { url: "img-1703010291647-17769.png", products_id: 11 },
        { url: "img-1703010291648-61936.png", products_id: 11 },
        { url: "img-1703010316588-78834.png", products_id: 12 },
        { url: "img-1703010316589-24505.png", products_id: 12 },
        { url: "img-1703010316589-55630.png", products_id: 12 },
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
    await queryInterface.bulkDelete("images", null, {});
  },
};
