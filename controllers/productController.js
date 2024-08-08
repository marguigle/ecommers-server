import Product from "../models/productModel.js";
import expressAsyncHandler from "express-async-handler";
import slugify from "slugify";

export const createProduct = expressAsyncHandler(async (req, res) => {
  try {
    if (req.body.title) {
      req.body.slug = slugify(req.body.title);
    }

    const newProduct = await Product.create(req.body);
    res.json(newProduct);
  } catch (error) {
    throw new Error(error);
  }
});
//get one product

export const getOneProduct = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    if (!id) {
      res.json({ message: " The product you are looking for was not found" });
    } else {
      const productFound = await Product.findById(id);
      res.json(productFound);
    }
  } catch (error) {
    throw new Error("product not Found ");
  }
});
//update product

export const updateProduct = expressAsyncHandler(async (req, res) => {
  const id = req.params._id;
  try {
    if (req.body.title) {
      req.body.slug = slugify(req.body.title);
    }

    const productUpdated = await Product.findOneAndUpdate(
      { id },
      { ...req.body },
      { new: true }
    );
    res.json(productUpdated);
  } catch (error) {
    throw new Error(error);
  }
});

//fetch all products

export const getAllProducts = expressAsyncHandler(async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    throw new Error("there are not any product");
  }
});
