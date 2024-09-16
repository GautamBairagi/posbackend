const bodyParser = require("body-parser");
const express = require("express");
const dbConnect = require("./config/dbConnect");
const { notFound, errorHandler } = require("./middlewares/errorHandler");
const app = express();
const dotenv = require("dotenv").config();
const PORT = 5000;
const authRouter = require("./routes/authRoute");
const productRouter = require("./routes/productRoute");
const blogRouter = require("./routes/blogRoute");
const categoryRouter = require("./routes/prodcategoryRoute");
const blogcategoryRouter = require("./routes/blogCatRoute");
const brandRouter = require("./routes/brandRoute");
const colorRouter = require("./routes/colorRoute");
const enqRouter = require("./routes/enqRoute");
const couponRouter = require("./routes/couponRoute");
const uploadRouter = require("./routes/uploadRoute");
const subCategory = require("./routes/subCatRoute")
const unit = require("./routes/unitRoute")
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

app.use(cors())
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());


mongoose.connect('mongodb+srv://mohammadrehan00121:37tQyK1plxRlDP8r@cluster0.b1bpr.mongodb.net/POS', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Create a schema for storing image information
const imageSchema = new mongoose.Schema({
  filename: String,
  path: String,
});

const Image = mongoose.model('Image', imageSchema);

// Configure multer for file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = './uploads';
    fs.mkdirSync(dir, { recursive: true });
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

// Route for uploading images
app.post('/upload', upload.array('images', 5), async (req, res) => {
  try {
    const images = req.files.map(file => ({
      filename: file.filename,
      path: file.path,
    }));

    const savedImages = await Image.insertMany(images);
    res.json({ message: 'Images uploaded successfully', images: savedImages });
  } catch (error) {
    res.status(500).json({ error: 'Error uploading images' });
  }
});

// Route to get all images
app.get('/images', async (req, res) => {
  try {
    const images = await Image.find();
    res.json(images);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching images' });
  }
});

// Route to get a single image by ID
app.get('/images/:id', async (req, res) => {
  try {
    const image = await Image.findById(req.params.id);
    if (!image) {
      return res.status(404).json({ error: 'Image not found' });
    }
    res.json(image);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching image' });
  }
});

// Route to delete an image by ID
app.delete('/images/:id', async (req, res) => {
  try {
    const image = await Image.findById(req.params.id);
    if (!image) {
      return res.status(404).json({ error: 'Image not found' });
    }

    // Remove the file from the filesystem
    fs.unlinkSync(image.path);

    // Remove the image document from the database
    await Image.findByIdAndDelete(req.params.id);

    res.json({ message: 'Image deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting image' });
  }
});
dbConnect();
app.use("/api/user", authRouter);
app.use("/api/product", productRouter);
app.use("/api/blog", blogRouter);
app.use("/api/category", categoryRouter);
app.use("/api/blogcategory", blogcategoryRouter);
app.use("/api/brand", brandRouter);
app.use("/api/coupon", couponRouter);
app.use("/api/color", colorRouter);
app.use("/api/enquiry", enqRouter); 
app.use("/api/upload", uploadRouter);
app.use("/api/subcategory", subCategory);
app.use("api/unit" , unit)
app.use(notFound);
app.use(errorHandler);
app.listen(PORT, () => {
  console.log(`Server is running  at PORT ${PORT}`);
});