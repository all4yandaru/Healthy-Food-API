"use strict";

const categoryproduct = require("../data/categoryproducts.json");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("categoryproducts", categoryproduct);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("categoryproducts", null, {});
  },
};
