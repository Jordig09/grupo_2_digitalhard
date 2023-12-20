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
        street: "Av. Corrientes",
        streetAddress: "1234",
        floorNumber: 4,
        flatLetter: "B",
        users_id: 1,
      },
      {
        city: "Córdoba",
        province: "Córdoba",
        postal: "5000",
        street: "9 de Julio",
        streetAddress: "5678",
        floorNumber: 2,
        flatLetter: "A",
        users_id: 2,
      },
      {
        city: "Rosario",
        province: "Santa Fe",
        postal: "2000",
        street: "Mitre",
        streetAddress: "4321",
        floorNumber: 5,
        flatLetter: "C",
        users_id: 3,
      },
      {
        city: "Santa Fe",
        province: "Santa Fe",
        postal: "3000",
        street: "25 de Mayo",
        streetAddress: "1688",
        floorNumber: 1,
        flatLetter: "D",
        users_id: 3,
      },
      {
        city: "Mendoza",
        province: "Mendoza",
        postal: "5500",
        street: "San Martín",
        streetAddress: "8765",
        floorNumber: 3,
        flatLetter: "E",
        users_id: 4,
      },
      {
        city: "Salta",
        province: "Salta",
        postal: "4400",
        street: "Belgrano",
        streetAddress: "3456",
        floorNumber: 6,
        flatLetter: "F",
        users_id: 4,
      },
      {
        city: "San Miguel de Tucumán",
        province: "Tucumán",
        postal: "4000",
        street: "24 de Septiembre",
        streetAddress: "7890",
        floorNumber: 2,
        flatLetter: "G",
        users_id: 4,
      },
      {
        city: "Mar del Plata",
        province: "Buenos Aires",
        postal: "7600",
        street: "Colón",
        streetAddress: "2109",
        floorNumber: 8,
        flatLetter: "H",
        users_id: 5,
      },
      {
        city: "San Carlos de Bariloche",
        province: "Río Negro",
        postal: "8400",
        street: "Moreno",
        streetAddress: "1112",
        floorNumber: 1,
        flatLetter: "I",
        users_id: 6,
      },
      {
        city: "La Plata",
        province: "Buenos Aires",
        postal: "1900",
        street: "Calle 7",
        streetAddress: "4567",
        floorNumber: 3,
        flatLetter: "J",
        users_id: 6,
      },
      {
        city: "Santo Tomé",
        province: "Santo Tomé",
        postal: "3016",
        street: "Jujuy",
        streetAddress: "1234",
        floorNumber: 2,
        flatLetter: "K",
        users_id: 7,
      },
      {
        city: "Nuequén",
        province: "Neuquén",
        postal: "8300",
        street: "Olascoaga",
        streetAddress: "7654",
        floorNumber: 4,
        flatLetter: "L",
        users_id: 8,
      },
      {
        city: "San Juan",
        province: "San Juan",
        postal: "5400",
        street: "Rivadavia",
        streetAddress: "2345",
        floorNumber: 5,
        flatLetter: "M",
        users_id: 9,
      },
      {
        city: "Resistencia",
        province: "Chaco",
        postal: "3500",
        street: "9 de Julio",
        streetAddress: "8765",
        floorNumber: 2,
        flatLetter: "N",
        users_id: 9,
      },
      {
        city: "Posadas",
        province: "Misiones",
        postal: "3300",
        street: "Bolívar",
        streetAddress: "5432",
        floorNumber: 6,
        flatLetter: "O",
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
