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
      "addresses",
      [
        {
          city: "Buenos Aires",
          province: "Buenos Aires",
          postal: "1000",
          address: "Av. Corrientes 1234",
          users_id: 1,
        },
        {
          city: "Córdoba",
          province: "Córdoba",
          postal: "5000",
          address: "9 de Julio 5678",
          users_id: 2,
        },
        {
          city: "Rosario",
          province: "Santa Fe",
          postal: "2000",
          address: "Mitre 4321",
          users_id: 3,
        },
        {
          city: "Santa Fe",
          province: "Santa Fe",
          postal: "3000",
          address: "25 de Mayo 1688",
          users_id: 3,
        },
        {
          city: "Mendoza",
          province: "Mendoza",
          postal: "5500",
          address: "San Martín 8765",
          users_id: 4,
        },
        {
          city: "Salta",
          province: "Salta",
          postal: "4400",
          address: "Belgrano 3456",
          users_id: 4,
        },
        {
          city: "San Miguel de Tucumán",
          province: "Tucumán",
          postal: "4000",
          address: "24 de Septiembre 7890",
          users_id: 4,
        },
        {
          city: "Mar del Plata",
          province: "Buenos Aires",
          postal: "7600",
          address: "Colón 2109",
          users_id: 5,
        },
        {
          city: "San Carlos de Bariloche",
          province: "Río Negro",
          postal: "8400",
          address: "Moreno 1112",
          users_id: 6,
        },
        {
          city: "La Plata",
          province: "Buenos Aires",
          postal: "1900",
          address: "Calle 7 4567",
          users_id: 6,
        },
        {
          city: "Santo Tomé",
          province: "Santo Tomé",
          postal: "3016",
          address: "Jujuy 1234",
          users_id: 7,
        },
        {
          city: "Nuequén",
          province: "Neuquén",
          postal: "8300",
          address: "Olascoaga 7654",
          users_id: 8,
        },
        {
          city: "San Juan",
          province: "San Juan",
          postal: "5400",
          address: "Rivadavia 2345",
          users_id: 9,
        },
        {
          city: "Resistencia",
          province: "Chaco",
          postal: "3500",
          address: "9 de Julio 8765",
          users_id: 9,
        },
        {
          city: "Posadas",
          province: "Misiones",
          postal: "3300",
          address: "Bolívar 5432",
          users_id: 10,
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
    await queryInterface.bulkDelete("addresses", null, {});
  },
};
