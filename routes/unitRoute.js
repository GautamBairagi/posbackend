const express = require("express");
const {
  createUnit,
  updateUnit,
  deleteUnit,
  getUnit,
  getallUnit,
} = require("../controller/unitCtrl");
// const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/", createUnit);
router.put("/:id", updateUnit);
router.delete("/:id", deleteUnit);
router.get("/:id", getUnit);
router.get("/", getallUnit);

module.exports = router;
