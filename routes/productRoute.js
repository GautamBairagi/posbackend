const express = require("express");
const {
  createProduct,
  getaProduct,
  getAllProduct,
  updateProduct,
  deleteProduct,
  addToWishlist,
  rating,
  downloadProductsCSV,
  downloadProductsPDF,
} = require("../controller/productCtrl");
// const { isAdmin, authMiddleware } = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/",  createProduct);

router.get("/:id", getaProduct);
router.put("/wishlist", addToWishlist);
router.put("/rating", rating);

router.put("/:id",  updateProduct);
router.delete("/:id",  deleteProduct);

router.get("/", getAllProduct);
router.get("/download/csv", downloadProductsCSV);
router.get("/download/pdf", downloadProductsPDF);

module.exports = router;
