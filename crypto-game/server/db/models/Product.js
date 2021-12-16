const Sequelize = require("sequelize");
const { STRING, INTEGER } = Sequelize;
const db = require("../db");

const Product = db.define("product", {
  name: {
    type: STRING,
    unique: true,
    allowNull: false,
  },
  spriteImage: {
    type: STRING,
    allowNull: false,
  },
  spriteSheet: {
    type: STRING,
    allowNull: true,
  },
  price: {
    type: INTEGER,
    defaultValue: 0,
  },
  count: {
    type: INTEGER,
    defaultValue: 0,
    validate: {
      max: 1,
      min: 0,
    },
  },
});

module.exports = Product;
