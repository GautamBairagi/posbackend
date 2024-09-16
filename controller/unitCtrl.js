const Unit = require("../models/unitModel");
const asyncHandler = require("express-async-handler");
const validateMongoDbId = require("../utils/validateMongodbId");

const createUnit = asyncHandler(async (req, res) => {
  try {
    const newUnit = await Unit.create(req.body);
    res.json(newUnit);
  } catch (error) {
    throw new Error(error);
  }
});
const updateUnit = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const updatedUnit = await Unit.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updatedUnit);
  } catch (error) {
    throw new Error(error);
  }
});
const deleteUnit = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const deletedUnit = await Unit.findByIdAndDelete(id);
    res.json(deletedUnit);
  } catch (error) {
    throw new Error(error);
  }
});
const getUnit = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const getaUnit = await Unit.findById(id);
    res.json(getaUnit);
  } catch (error) {
    throw new Error(error);
  }
});
const getallUnit = asyncHandler(async (req, res) => {
  try {
    const getallUnit = await Unit.find();
    res.json(getallUnit);
  } catch (error) {
    throw new Error(error);
  }
});
module.exports = {
  createUnit,
  updateUnit,
  deleteUnit,
  getUnit,
  getallUnit,
};
