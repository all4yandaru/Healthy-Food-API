"use strict";

const user = require("../data/users.json");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("users", user);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("tokens", null, {});
    await queryInterface.bulkDelete("users", null, {});
  },
};
