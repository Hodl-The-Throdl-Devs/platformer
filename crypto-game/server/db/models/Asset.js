const Sequelize = require("sequelize");
const { STRING, INTEGER } = Sequelize;
const db = require("../db");

const Asset = db.define("asset", {
  name: {
    type: STRING,
    unique: true,
    allowNull: false,
  },
  spriteImage: {
    type: STRING,
    allowNull: false,
  },
});

module.exports = Asset;
