"use strict";

const {
  db,
  models: { User, Product, Asset },
} = require("../server/db");
const path = require("path");
const fs = require("fs");

// create products from sprites
const products = [];

const dirPathPreviews = path.join(
  __dirname,
  "..",
  "public",
  "spritesPixelAdventure",
  "characters",
  "previews"
);
fs.readdir(dirPathPreviews, function (err, files) {
  //handling error
  if (err) {
    throw "Unable to scan directory: " + err;
  }
  //Adding sprite info and preview image to products array
  files.forEach(function (file) {
    const product = {};
    const name = file.split("_")[0];
    product.name = name;
    product.spritePreview = file;
    product.count = 1;
    products.push(product);
  });
});

const dirPathSheets = path.join(
  __dirname,
  "..",
  "public",
  "spritesPixelAdventure",
  "characters",
  "sheets"
);
fs.readdir(dirPathSheets, function (err, files) {
  //handling error
  if (err) {
    throw "Unable to scan directory: " + err;
  }
  //Adding sprite sheets to products array
  files.forEach(function (file) {
    const name = file.split("_")[0];
    const product = products.find((product) => product.name === name);
    const productIdx = products.indexOf(product);

    products[productIdx].spriteSheet = file;
    console.log(products);
  });
});

// create assets from sprites (originally named products pre-newSprites)
const assets = [];
const dirPathAssets = path.join(
  __dirname,
  "..",
  "public",
  "spritesPixelAdventure",
  "assets"
);
fs.readdir(dirPathAssets, function (err, files) {
  //handling error
  if (err) {
    throw "Unable to scan directory: " + err;
  }
  //listing all files using forEach
  files.forEach(function (file) {
    const asset = {};
    asset.name = file.split(".")[0];
    asset.image = file;
    assets.push(asset);
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

  await Promise.all([
    products.map((product) => {
      Product.create({
        name: product.name,
        spritePreview: product.spritePreview,
        spriteSheet: product.spriteSheet,
        count: 1,
        price: Math.ceil(Math.random() * 1000),
      });
    }),
    assets.map((asset) => {
      Asset.create({
        name: asset.name,
        image: asset.image,
      });
    }),
  ]);

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
