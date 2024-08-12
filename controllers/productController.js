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

// delete one product

export const deleteProduct = expressAsyncHandler(async (req, res) => {
  const id = req.params._id;
  try {
    const productDeleted = await Product.findOneAndDelete(id);
    res.json({
      product: productDeleted,
      success: true,
      message: "This product was deleted",
    });
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

//fetch all products

export const getAllProducts = expressAsyncHandler(async (req, res) => {
  try {
    const querytObj = { ...req.query };
    const excludeFields = ["page", "sort", "limit", "fields"];
    excludeFields.forEach((el) => delete querytObj[el]);
    let queryStr = JSON.stringify(querytObj);
    console.log(querytObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    let query = Product.find(JSON.parse(queryStr));
    //sorting
    if (req.query.sort) {
      const sortBy = req.query.sort.split(",").join(" ");
      query = query.sort(sortBy);
    } else {
      query = query.sort("-createdAt");
    }
    // limiting the fields
    if (req.query.fields) {
      const fields = req.query.fields.split(",").join(" ");
      query = query.select(fields);
    } else {
      query = query.select("-__v");
    }
    //pagination

    const page = req.query.page;
    const limit = req.query.limit;
    const skip = (page - 1) * limit;
    query = query.skip(skip).limit(limit);
    console.log(page, limit, skip);
    if (req.query.page) {
      const productCount = await Product.countDocuments();
      if (skip >= productCount) {
        throw new Error("this page does not exists");
      }
    }

    const product = await query;
    res.json(product);
  } catch (error) {
    throw new Error("there are not any product");
  }
});
