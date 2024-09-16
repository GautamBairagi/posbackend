const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
    },
    store: {
      type: String,
      lowercase: true,
    },
    taxtype:{
      type:String
    },
    warehouse:{
      type:String
    },
    slug:{
      type:String
    },
    created:{
      type:String,
      default:'admin'
    },
    sku:{
      type:String
    },
    subcategory:{
      type:String
    },
    sellingtype:{
      type:String
    },
    barcodesymbol:{
      type:String
    },
    itemcode:{
      type:String
    },
    discounttype:{
      type:String
    },
    discountvalue:{
      type:String
    },
    quantityalert:{
      type:String
    },
    description: {
      type: String,
    },
    variant:{
      type:String
    },
    manudate:{
      type:String
    },
    exdate:{
      type:String
    },
    price: {
      type: Number,
    },
    category: {
      type: String,
    },
    brand: {
      type: String,
    },
    quantity: {
      type: Number,
    },
    sold: {
      type: Number,
      default: 0,
    },
    image:{
      type:String
    },
    images: [
      {
        public_id: String,
        url: String,
      },
    ],
    color: [],
    tags: String,
    ratings: [
      {
        star: Number,
        comment: String,
        postedby: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      },
    ],
    totalrating: {
      type: String,
      default: 0,
    },
  },
  { timestamps: true }
);

//Export the model
module.exports = mongoose.model("Product", productSchema);
