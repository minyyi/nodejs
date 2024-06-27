const cors = require("cors"); //포트 달라서
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const Product = require("./model/productModel.js");
const https = require("https");
const fs = require("fs");

https
  .createServer(
    {
      key: fs.readFileSync(__dirname + "/key.pem", "utf-8"),
      cert: fs.readFileSync(__dirname + "/cert.pem", "utf-8"),
    },
    function (req, res) {
      res.write("Congrats! You made https server now :)");
      res.end();
    }
  )
  .listen(5502);

mongoose
  .connect(
    "mongodb+srv://ymy0613:zWYZGlEaSzN0bb6r@backenddb.op8dlbi.mongodb.net/Node-API?retryWrites=true&w=majority&appName=BackendDB"
  )
  .then(() => {
    console.log("Connected!");
    app.listen(5502, () => {
      console.log("listening on 5502");
    });
  })
  .catch(() => console.log("failed!"));

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  res.status(200).json({ message: "글자가 안보이는데" });
});
app.get("/api/products", async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
app.get("/api/product/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post("/api/products", async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/* update a product */
app.put("/api/product/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body);
    if (!product) {
      return res.status(404).json({ message: "Product Not Found" });
    }
    const updatedProduct = await Product.findById(id);
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/* delete a product */
app.delete("/api/product/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      return res.status(404).json({ message: "Product Not Found" });
    }
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
app.delete("/api/allproducts", async (req, res) => {
  try {
    // const { id } = req.params;
    const products = await Product.delete({});
    if (!product) {
      return res.status(404).json({ message: "Product Not Found" });
    }
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
