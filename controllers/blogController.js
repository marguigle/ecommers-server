import Blog from "../models/blogModel.js";
import cloudinaryUploadImg from "../utils/cloudinary.js";
import asyncHandler from "express-async-handler";
import validateMongoDbId from "../utils/validateMongoDbID.js";
import fs from "fs";

export const createBlog = asyncHandler(async (req, res) => {
  try {
    const newBlog = await Blog.create(req.body);

    res.status(200).json(newBlog);
  } catch (error) {
    throw new Error(error);
  }
});
export const updateBlog = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const blogUpdated = await Blog.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    res.status(200).json(blogUpdated);
  } catch (error) {
    throw new Error(error);
  }
});
export const getBlog = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const getBlog = await Blog.findById(id)
      .populate("likes")
      .populate("disLikes");
    await Blog.findByIdAndUpdate(
      id,
      {
        $inc: { numViews: 1 },
      },
      { new: true }
    );

    res.status(200).json(getBlog);
  } catch (error) {
    throw new Error(error);
  }
});

export const getBlogs = asyncHandler(async (req, res) => {
  try {
    const allBlogs = await Blog.find();

    res.status(200).json(allBlogs);
  } catch (error) {
    throw new Error(error);
  }
});
export const deleteBlog = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const deletedBlog = await Blog.findByIdAndDelete(id);

    res.json({
      deletedBlog: deletedBlog,
      nessage: "The blog was deleted successfully",
    });
  } catch (error) {
    throw new Error(error);
  }
});

export const likeBlog = asyncHandler(async (req, res) => {
  const { blogId } = req.body;

  // Validar el blogId
  validateMongoDbId(blogId);

  // Buscar el blog en la base de datos
  const blog = await Blog.findById(blogId);
  if (!blog) {
    return res.status(404).json({ message: "Blog not found" });
  }

  const loginUserId = req?.user?._id;

  // Inicializar disLikes y likes si son undefined
  const disLikes = blog?.disLikes || [];
  const likes = blog?.likes || [];

  const isLiked = blog?.isLiked || false;
  const alreadyDisliked = disLikes.find(
    (userId) => userId?.toString() === loginUserId?.toString()
  );

  // Si el usuario ya ha dado "dislike", se remueve el dislike
  if (alreadyDisliked) {
    const updatedBlog = await Blog.findByIdAndUpdate(
      blogId,
      {
        $pull: { disLikes: loginUserId },
        isDisLiked: false,
      },
      { new: true }
    );
    return res.json(updatedBlog);
  }

  // Si el blog ya está "liked", se remueve el like
  if (isLiked) {
    const updatedBlog = await Blog.findByIdAndUpdate(
      blogId,
      {
        $pull: { likes: loginUserId },
        isLiked: false,
      },
      { new: true }
    );
    return res.json(updatedBlog);
  } else {
    // Si no está "liked", se añade el like
    const updatedBlog = await Blog.findByIdAndUpdate(
      blogId,
      {
        $push: { likes: loginUserId },
        isLiked: true,
      },
      { new: true }
    );
    return res.json(updatedBlog);
  }
});
//-------------------------------------------------------------------------------------

export const dislikeBlog = asyncHandler(async (req, res) => {
  const { blogId } = req.body;

  // Validar el blogId
  validateMongoDbId(blogId);

  // Buscar el blog en la base de datos
  const blog = await Blog.findById(blogId);
  if (!blog) {
    return res.status(404).json({ message: "Blog not found" });
  }

  const loginUserId = req?.user?._id;

  // Inicializar disLikes y likes si son undefined
  const disLikes = blog?.disLikes || [];
  const likes = blog?.likes || [];

  const isLiked = blog?.isLiked || false;
  const alreadyLiked = likes.find(
    (userId) => userId?.toString() === loginUserId?.toString()
  );

  const alreadyDisliked = disLikes.find(
    (userId) => userId?.toString() === loginUserId?.toString()
  ); // Agregado: Chequear si ya ha dado dislike

  // Si el usuario ya ha dado "like", se remueve el like
  if (alreadyLiked) {
    const updatedBlog = await Blog.findByIdAndUpdate(
      blogId,
      {
        $pull: { likes: loginUserId }, // Corrección: Se remueve de `likes`, no `disLikes`
        isLiked: false,
      },
      { new: true }
    );
    return res.json(updatedBlog);
  }

  // Si el blog ya está "disliked", se remueve el dislike
  if (alreadyDisliked) {
    // Cambio: Chequear si ya ha dado dislike
    const updatedBlog = await Blog.findByIdAndUpdate(
      blogId,
      {
        $pull: { disLikes: loginUserId }, // Corrección: Se remueve de `disLikes`
        isDisLiked: false, // Corrección: Cambiar `isDisLiked` a false cuando se remueve el dislike
      },
      { new: true }
    );
    return res.json(updatedBlog);
  } else {
    // Si no está "disliked", se añade el dislike
    const updatedBlog = await Blog.findByIdAndUpdate(
      blogId,
      {
        $push: { disLikes: loginUserId }, // Corrección: Se añade a `disLikes`
        isDisLiked: true,
      },
      { new: true }
    );
    return res.json(updatedBlog);
  }
});

export const uploadImages = asyncHandler(async (req, res) => {
  // console.log(req.files);
  const { id } = req.params;
  validateMongoDbId(id);

  try {
    const uploader = (path) => cloudinaryUploadImg(path, "images");
    const urls = [];
    const files = req.files;
    for (let file of files) {
      const { path } = file;
      const newpath = await uploader(path);
      urls.push(newpath);
      // fs.unlinkSync(path);
    }

    const findBlog = await Blog.findByIdAndUpdate(
      id,
      {
        images: urls,
      },
      { new: true }
    );
    res.json(findBlog);
  } catch (error) {
    throw new Error(error);
  }
});
