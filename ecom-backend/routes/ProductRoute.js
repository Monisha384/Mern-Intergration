const express = require("express");
const router = express.Router();
const {
  getProduct,
  postProduct,
  deleteProduct,
  updateProduct
} = require("../controller/productController");

router.get("/product", getProduct);
router.post("/postproduct", postProduct);
router.delete("/deleteproduct/:id", deleteProduct);
router.put("/putproduct/:id", updateProduct);

module.exports = router;
