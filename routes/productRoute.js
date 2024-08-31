import express from "express";
import {
  createProduct,
  getAllProducts,
  getOneProduct,
  updateProduct,
  deleteProduct,
  addToWishlist, // Corrección en el nombre
  rating,
  uploadImages,
  deleteImages,
} from "../controllers/productController.js";
import { isAdmin, authMiddleware } from "../middlewares/authMiddleware.js";
import { uploadPhoto, productImgResize } from "../middlewares/uploadImages.js";

// const router = express.Router();

// // Rutas de productos
// router.post("/", authMiddleware, isAdmin, createProduct); // Crear producto

// router.get("/:id", getOneProduct); // Obtener un producto (Pública si es necesario)
// router.get("/", getAllProducts); // Obtener todos los productos (Pública)

// // Rutas de funciones adicionales
// router.put("/wishlist", authMiddleware, addToWishlist); // Agregar a la lista de deseos
// router.put("/rating", authMiddleware, rating); // Agregar calificación
// router.put("/:id", authMiddleware, isAdmin, updateProduct); // Actualizar producto
// router.put(
//   "/upload",
//   authMiddleware,
//   isAdmin,
//   uploadPhoto.array("images", 10),
//   productImgResize,
//   uploadImages
// );
// router.delete("/:id", authMiddleware, isAdmin, deleteProduct); // Eliminar producto
// router.delete("/delete-img/:id", authMiddleware, isAdmin, deleteImages); // Eliminar imagen

// export default router;

const router = express.Router();
// Rutas de productos
router.post("/", authMiddleware, isAdmin, createProduct); // Crear producto
router.get("/:id", getOneProduct); // Obtener un producto (Pública si es necesario)
router.get("/", getAllProducts); // Obtener todos los productos (Pública)

// Rutas de funciones adicionales que no dependen de un ID
router.put(
  "/upload",
  authMiddleware,
  isAdmin,
  uploadPhoto.array("images", 10),
  productImgResize,
  uploadImages
); // Subir imágenes

router.put("/wishlist", authMiddleware, addToWishlist); // Agregar a la lista de deseos
router.put("/rating", authMiddleware, rating); // Agregar calificación

// Rutas que dependen de un ID
router.put("/:id", authMiddleware, isAdmin, updateProduct); // Actualizar producto
router.delete("/:id", authMiddleware, isAdmin, deleteProduct); // Eliminar producto
router.delete("/delete-img/:id", authMiddleware, isAdmin, deleteImages); // Eliminar imagen

export default router;
