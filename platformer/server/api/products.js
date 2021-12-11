const router = require("express").Router();
const {
  models: { Product },
} = require("../db");
module.exports = router;

//Get Products
router.get("/", async (req, res, next) => {
  try {
    const products = await Product.findAll({
      attributes: ["name", "imageURL"],
    });
    res.json(products);
  } catch (err) {
    next(err);
  }
});

//Get single product
router.get("/:id", async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id);
    res.json(product);
  } catch (err) {
    next(err);
  }
});

//Creating New Product
router.post("/", async (req, res, next) => {
    try {
      res.send(await Product.create(req.body));
    } catch (err) {
      next(err);
    }
  });

//Updating Single Product
router.put("/:id", async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id);
    res.status(200).send(await product.update(req.body));
  } catch (error) {
    next(error);
  }
});

//Deleting Single Product...
router.delete("/:id", async (req, res, next) => {
    try {
      const product = await Product.findByPk(req.params.id);
      await product.destroy();
      res.send(product);
    } catch (err) {
      next(err);
    }
  });
  

module.exports = router;