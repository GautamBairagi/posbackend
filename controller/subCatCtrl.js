const SubCategory = require("../models/subCatModel");
const asyncHandler = require("express-async-handler");
const validateMongoDbId = require("../utils/validateMongodbId");
const { Parser } = require('json2csv');
const PDFDocument = require('pdfkit');


const createSubCategory = asyncHandler(async (req, res) => {
  console.log("this is a req.body of SubCategory",req.body)
  try {
    const newSubCategory = await SubCategory.create(req.body);
    res.json(newSubCategory);
  } catch (error) {
    throw new Error(error);
  }
});
const updateSubCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const updatedSubCategory = await SubCategory.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updatedSubCategory);
  } catch (error) {
    throw new Error(error);
  }
});
const deleteSubCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const deletedSubCategory = await SubCategory.findByIdAndDelete(id);
    res.json(deletedSubCategory);
  } catch (error) {
    throw new Error(error);
  }
});
const getSubCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const getaSubCategory = await SubCategory.findById(id);
    res.json(getaSubCategory);
  } catch (error) {
    throw new Error(error);
  }
});
const getallSubCategory = asyncHandler(async (req, res) => {
  try {
    const getallSubCategory = await SubCategory.find();
    res.json(getallSubCategory);
  } catch (error) {
    throw new Error(error);
  }
});

const downloadSubcategoryCSV = asyncHandler(async (req, res) => {
  try {
    const subcategory = await SubCategory.find();
    const fields = ['name', 'category', 'status','code', 'description'];
    const opts = { fields };
    const parser = new Parser(opts);
    const csv = parser.parse(subcategory);
    
    res.header('Content-Type', 'text/csv');
    res.attachment('Subcategory.csv');
    return res.send(csv);
  } catch (error) {
    throw new Error(error);
  }
});

const downloadSubcategoryPDF = asyncHandler(async (req, res) => {
  try {
    const category = await SubCategory.find();
    const doc = new PDFDocument();
    
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=subcategories.pdf');
    
    doc.pipe(res);
    
    doc.fontSize(16).text('Subcategory List', { align: 'center' });
    doc.moveDown();
    
    Category.forEach((subcategory, index) => {
      doc.fontSize(12).text(`${index + 1}. ${subcategory.name}`);
      doc.fontSize(10).text(`   category: $${subcategory.category}, code: ${subcategory.code},description:${subcategory.description}`);
      doc.moveDown();
    });
    
    doc.end();
  } catch (error) {
    throw new Error(error);
  }
});
module.exports = {
  createSubCategory,
  updateSubCategory,
  deleteSubCategory,
  getSubCategory,
  getallSubCategory,
  downloadSubcategoryCSV,
  downloadSubcategoryPDF,
};
