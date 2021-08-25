require("dotenv").config();

const productData = require("./data/products");
const connectDB = require("./config/db");
const Products = require("./models/Products");

connectDB();

const importData = async () => {
  try {
    await Products.deleteMany({});

    await Products.insertMany(productData);

    console.log("Data Import Success");

    process.exit();
  } catch (error) {
    console.error("Error with data import", error);
    process.exit(1);
  }
};

importData();
