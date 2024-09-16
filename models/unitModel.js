const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var unitSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    sname:{
      type:String
    },
    noproduct:{
        type:String
    },
    unit:{
      type:String,
    },
    status:{
        type:Boolean
    }
  },
  {
    timestamps: true,
  }
);

//Export the model
module.exports = mongoose.model("Unit", unitSchema);
