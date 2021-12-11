const Sequelize = require('sequelize')
const db = require('../db')
const axios = require('axios');
const { STRING, INTEGER } = require('sequelize');

const Product = db.define('product', {
  name: {
    type: STRING,
    unique: true,
    allowNull: false
  },
  imageURL: {
    type: STRING,
    allowNull: false
  },
  price: {
    type: INTEGER,
    defaultValue: 0
  },
  count: {
    type: INTEGER,
    defaultValue: 0,
    validate:{
        max:1,
        min:0
    }
  }
})