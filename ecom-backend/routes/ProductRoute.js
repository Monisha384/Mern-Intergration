const express = require("express");
const router = express.Router();
const {
  getProduct,
  postProduct,
  deleteProduct,
  updateProduct
} = require("../controller/productController");

// Test route
router.get("/test", (req, res) => {
  res.json({ message: "Backend is working!" });
});

router.get("/product", getProduct);
router.post("/postproduct", postProduct);
router.delete("/deleteproduct/:id", deleteProduct);
router.put("/putproduct/:id", updateProduct);

module.exports = router;
