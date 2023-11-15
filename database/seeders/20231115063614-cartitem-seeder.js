"use strict";

const cartitem = require("../data/cartitems.json");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("cartitems", cartitem);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("cartitems", null, {});
  },
};
