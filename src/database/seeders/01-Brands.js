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
      "brands",
      [
        {
          name: "Logitech",
        },
        {
          name: "Nvidia",
        },
        {
          name: "AMD",
        },
        {
          name: "Dell",
        },
        {
          name: "Corsair",
        },
        {
          name: "Samsung",
        },
        {
          name: "Steel Series",
        },
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
    await queryInterface.bulkDelete("brands", null, {});
  },
};
