const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var prodcategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique:true,
      required: true,
      sparse: true ,// This allows multiple null values
       default: "Untitled Category"
    },
    slug:{
      type:String,
    },
    status:{
      type:Boolean
    },

  },
  {
    timestamps: true,
  }
);

//Export the model
module.exports = mongoose.model("PCategory", prodcategorySchema);
