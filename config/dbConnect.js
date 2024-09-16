const { default: mongoose } = require("mongoose");

const dbConnect = () => {
  try {
    const conn = mongoose.connect("mongodb+srv://mohammadrehan00121:37tQyK1plxRlDP8r@cluster0.b1bpr.mongodb.net/POS");
  } catch (error) {
    console.log("DAtabase error");
  }
};
module.exports = dbConnect;
