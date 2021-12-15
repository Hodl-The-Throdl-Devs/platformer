const Sequelize = require("sequelize");
const { STRING, INTEGER } = Sequelize;
const db = require("../db");

const Product = db.define("product", {
  name: {
    type: STRING,
    unique: true,
    allowNull: false,
  },
  imageURL: {
    type: STRING,
    allowNull: false,
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