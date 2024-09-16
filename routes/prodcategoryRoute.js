const express = require("express");
const {
  createCategory,
  updateCategory,
  deleteCategory,
  getCategory,
  getallCategory,
  downloadCategoryCSV,
  downloadCategoryPDF,
} = require("../controller/prodcategoryCtrl");
// const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/", createCategory);
router.put("/:id", updateCategory);
router.delete("/:id", deleteCategory);
router.get("/:id", getCategory);
router.get("/", getallCategory);
router.get("/download/csv", downloadCategoryCSV);
router.get("/download/pdf", downloadCategoryPDF);


module.exports = router;
