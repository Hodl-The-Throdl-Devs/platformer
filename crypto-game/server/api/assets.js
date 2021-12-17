const router = require("express").Router();
const {
  models: { Asset },
} = require("../db");
module.exports = router;

//Get Assets
router.get("/", async (req, res, next) => {
  try {
    const assets = await Asset.findAll();
    res.json(assets);
  } catch (err) {
    next(err);
  }
});

//Get single Asset
router.get("/:id", async (req, res, next) => {
  try {
    const asset = await Asset.findByPk(req.params.id);
    res.json(asset);
  } catch (err) {
    next(err);
  }
});

//Creating New Asset
router.post("/", async (req, res, next) => {
  try {
    res.send(await Asset.create(req.body));
  } catch (err) {
    next(err);
  }
});

//Updating Single Asset
router.put("/:id", async (req, res, next) => {
  try {
    const asset = await Asset.findByPk(req.params.id);
    res.status(200).send(await asset.update(req.body));
  } catch (error) {
    next(error);
  }
});

//Deleting Single Asset...
router.delete("/:id", async (req, res, next) => {
  try {
    const asset = await Asset.findByPk(req.params.id);
    await asset.destroy();
    res.send(asset);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
