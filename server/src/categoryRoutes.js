module.exports = (categoryModel) => {
  const express = require("express");
  const router = express.Router();

  router.get("/", async (req, res) => {
    const category = await categoryModel.getCategories();
    res.json(category);
  });

  router.post("/create", async (req, res) => {
    const category = await categoryModel.createCategory(req.body.name);
    res.json(category);
  });

  return router;
};
