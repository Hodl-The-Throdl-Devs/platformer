"use strict";

const {
  db,
  models: { User, Product },
} = require("../server/db");
const path = require("path");
const fs = require("fs");

// create products from sprites
const products = [];
const directoryPath = path.join(__dirname, "..", "public", "sprites");
fs.readdir(directoryPath, function (err, files) {
  //handling error
  if (err) {
    throw "Unable to scan directory: " + err;
  }
  //listing all files using forEach
  files.forEach(function (file) {
    const product = {};
    const name = file.split(".")[0];
    const ext = file.split(".")[1];
    if (ext.toLowerCase() === "png") {
      product.name = name;
      product.imageUrl = file;
      product.count = 1;
      products.push(product);
    }
  });
});

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  await db.sync({ force: true }); // clears db and matches models to tables
  console.log("db synced!");

  // Creating Users
  const users = await Promise.all([
    User.create({ username: "cody", password: "123", coins: 100 }),
    User.create({ username: "murphy", password: "123" }),
    User.create({ username: "Alex", password: "123", coins: 5 }),
  ]);

  await Promise.all(
    products.map((product) => {
      Product.create({
        name: product.name,
        imageURL: product.imageUrl,
        count: 1,
        price: Math.ceil(Math.random() * 1000)
      });
    })
  );

  console.log(`seeded ${users.length} users`);
  console.log(`seeded successfully`);
  return {
    users: {
      cody: users[0],
      murphy: users[1],
    },
  };
}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log("seeding...");
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log("closing db connection");
    await db.close();
    console.log("db connection closed");
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed();
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;