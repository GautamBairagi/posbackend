const mongoose = require("mongoose"); // Erase if already required

var subCatSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      index: true,
    },
    name:{
        type:String,
    },
    code:{
        type:String,
    },
    description:{
        type:String
    },
    status:{
        type:Boolean
    },
    createdby:{
      type:String,
      default: 'admin' // Set default value to 'admin'
    },
    img:{
      type:String,
      default: 'https://tse4.mm.bing.net/th?id=OIP.FxRpUZ1X5jvwyxjDJXeX4wHaGL&pid=Api&P=0&h=180' // Set default value to 'default-image.jpg'
    }
  },
  {
    timestamps: true,
  }
);

//Export the model
module.exports = mongoose.model("subCategory", subCatSchema);
