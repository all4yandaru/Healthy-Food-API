const { check } = require("express-validator");
const { category } = require("../../models");
const Validator = require("../Validator");
const express = require("express");

class CategoryAddValidator extends Validator {
  rules = [
    check("name")
      .notEmpty()
      .isLength({ min: 1, max: 255 })
      .custom(async (categoryValue) => {
        const checkCategory = await category.findOne({ where: { name: categoryValue } });
        if (checkCategory !== null) {
          throw Error(`Category ${categoryValue} is already used`);
        }
      }),
  ];
}

class CategoryUpdateValidator extends Validator {
    rules = [
      check("name")
        .notEmpty()
        .isLength({ min: 1, max: 255 })
        .custom(async (categoryValue) => {
        const checkCategory = await category.findOne({ where: { name: categoryValue } });
        if (checkCategory !== null) {
          throw Error(`Category ${categoryValue} is already used`); 
        }
      }),
    ]
}

module.exports = {CategoryAddValidator, CategoryUpdateValidator}