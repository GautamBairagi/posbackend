const express = require("express");
const {
    createSubCategory,
  updateSubCategory,
  deleteSubCategory,
  getSubCategory,
  getallSubCategory,
  downloadSubcategoryCSV,
  downloadSubcategoryPDF,
} = require("../controller/subCatCtrl");
// const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/",  createSubCategory);
router.put("/:id", updateSubCategory);
router.delete("/:id",  deleteSubCategory);
router.get("/:id", getSubCategory);
router.get("/", getallSubCategory);
router.get("/download/csv", downloadSubcategoryCSV);
router.get("/download/pdf", downloadSubcategoryPDF);

module.exports = router;
