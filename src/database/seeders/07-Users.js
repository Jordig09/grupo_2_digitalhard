"use strict";

const bcrypt = require("bcrypt");

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
      "users",
      [
        {
          firstName: "Juan",
          lastName: "Pérez",
          email: "juanperez@gmail.com",
          password: bcrypt.hashSync("juan1234", 10),
          avatar: "avatar-1700140505526.jpeg",
          roles_id: 1,
        },
        {
          firstName: "María",
          lastName: "González",
          email: "mariagonzalez@hotmail.com",
          password: bcrypt.hashSync("maria5678", 10),
          avatar: "avatar-1700140505527.jpeg",
          roles_id: 2,
        },
        {
          firstName: "Carlos",
          lastName: "Rodríguez",
          email: "carlosrodriguez@gmail.com",
          password: bcrypt.hashSync("carlos9012", 10),
          avatar: "avatar-1700140505528.jpeg",
          roles_id: 2,
        },
        {
          firstName: "Ana",
          lastName: "López",
          email: "analopez@hotmail.com",
          password: bcrypt.hashSync("ana3456", 10),
          avatar: "avatar-1700140505529.jpeg",
          roles_id: 2,
        },
        {
          firstName: "Martín",
          lastName: "García",
          email: "martingarcia@gmail.com",
          password: bcrypt.hashSync("martin7890", 10),
          avatar: "avatar-1700140505530.jpeg",
          roles_id: 2,
        },
        {
          firstName: "Laura",
          lastName: "Sánchez",
          email: "laurasanchez@hotmail.com",
          password: bcrypt.hashSync("laura1234", 10),
          avatar: "avatar-1700140505531.jpeg",
          roles_id: 1,
        },
        {
          firstName: "Diego",
          lastName: "Fernández",
          email: "diegofernandez@gmail.com",
          password: bcrypt.hashSync("diego5678", 10),
          avatar: "avatar-1700140505532.jpeg",
          roles_id: 2,
        },
        {
          firstName: "Sofía",
          lastName: "Martínez",
          email: "sofiamartinez@hotmail.com",
          password: bcrypt.hashSync("sofia9012", 10),
          avatar: "avatar-1700140505533.jpeg",
          roles_id: 2,
        },
        {
          firstName: "Luis",
          lastName: "Gómez",
          email: "luisgomez@gmail.com",
          password: bcrypt.hashSync("luis3456", 10),
          avatar: "avatar-1700140505534.jpeg",
          roles_id: 2,
        },
        {
          firstName: "Julia",
          lastName: "Díaz",
          email: "juliadiaz@hotmail.com",
          password: bcrypt.hashSync("julia7890", 10),
          avatar: "avatar-1700140505535.jpeg",
          roles_id: 1,
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
    await queryInterface.bulkDelete("users", null, {});
  },
};
