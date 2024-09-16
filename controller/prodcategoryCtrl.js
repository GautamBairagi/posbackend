const Category = require("../models/prodcategoryModel.js");
const asyncHandler = require("express-async-handler");
const validateMongoDbId = require("../utils/validateMongodbId");
const { Parser } = require('json2csv');
const PDFDocument = require('pdfkit');

const createCategory = asyncHandler(async (req, res) => {
  console.log("this is a req.body of category",req.body)
  try {
    const newCategory = await Category.create(req.body);
    res.json(newCategory);
  } catch (error) {
    throw new Error(error);
  }
});
const updateCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const updatedCategory = await Category.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updatedCategory);
  } catch (error) {
    throw new Error(error);
  }
});
const deleteCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const deletedCategory = await Category.findByIdAndDelete(id);
    res.json(deletedCategory);
  } catch (error) {
    throw new Error(error);
  }
});
const getCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const getaCategory = await Category.findById(id);
    res.json(getaCategory);
  } catch (error) {
    throw new Error(error);
  }
});
const getallCategory = asyncHandler(async (req, res) => {
  try {
    const getallCategory = await Category.find();
    res.json(getallCategory);
  } catch (error) {
    throw new Error(error);
  }
});

const downloadCategoryCSV = asyncHandler(async (req, res) => {
  try {
    const category = await Category.find();
    const fields = ['name', 'slug', 'status'];
    const opts = { fields };
    const parser = new Parser(opts);
    const csv = parser.parse(category);
    
    res.header('Content-Type', 'text/csv');
    res.attachment('Category.csv');
    return res.send(csv);
  } catch (error) {
    throw new Error(error);
  }
});

const downloadCategoryPDF = asyncHandler(async (req, res) => {
  try {
    const category = await Category.find();
    const doc = new PDFDocument();
    
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=categories.pdf');
    
    doc.pipe(res);
    
    doc.fontSize(16).text('category List', { align: 'center' });
    doc.moveDown();
    
    Category.forEach((category, index) => {
      doc.fontSize(12).text(`${index + 1}. ${category.name}`);
      doc.fontSize(10).text(`   slug: $${category.slug}, status: ${category.status}`);
      doc.moveDown();
    });
    
    doc.end();
  } catch (error) {
    throw new Error(error);
  }
});
module.exports = {
  createCategory,
  updateCategory,
  deleteCategory,
  getCategory,
  getallCategory,
  downloadCategoryCSV,
  downloadCategoryPDF

};
