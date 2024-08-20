// import multer from "multer";
// import sharp from "sharp";
// import path from "path";

// export const multerStorage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, path.join(__dirname, "../public/images"));
//   },
//   filename: function (req, file, cb) {
//     const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
//     cb(null, this.fieldname + "-" + uniqueSuffix + ".jpeg");
//   },
// });

// export const multerFilter = (req, file, cb) => {
//   if (file.mimetype.stasWith("image")) {
//     cb(null, true);
//   } else {
//     cb({
//       message: "Unsupported file format",
//     }),
//       false;
//   }
// };

// export const uploadPhoto = multer({
//   storage: multerStorage,
//   fileFilter: multerFilter,
//   limits: { fileSize: 2000000 },
// });
// export const productImgResize = async (req, res, next) => {
//   if (!req.files) return next();
//   await Promise.all(
//     req.files.map(async (file) => {
//       sharp(
//         file.path
//           .resize(300, 300)
//           .toFormat("jpeg")
//           .jpeg({ quality: 90 })
//           .toFile(`public/images/products/${file.filename}`)
//       );
//     })
//   );
//   next();
// };
// export const blogImgResize = async (req, res, next) => {
//   if (!req.files) return next();
//   await Promise.all(
//     req.files.map(async (file) => {
//       sharp(
//         file.path
//           .resize(300, 300)
//           .toFormat("jpeg")
//           .jpeg({ quality: 90 })
//           .toFile(`public/images/blogs/${file.filename}`)
//       );
//     })
//   );
//   next();
// };

import multer from "multer";
import sharp from "sharp";
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuración de almacenamiento de Multer
export const multerStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../public/images"));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + ".jpeg"); // Corrección en `file.fieldname`
  },
});

// Filtro de archivos de Multer
export const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    // Corrección en `startsWith`
    cb(null, true);
  } else {
    cb(
      {
        message: "Unsupported file format",
      },
      false
    );
  }
};

// Middleware de Multer para cargar fotos
export const uploadPhoto = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
  limits: { fileSize: 2000000 }, // Tamaño máximo del archivo en bytes
});

// Middleware para redimensionar imágenes de productos
export const productImgResize = async (req, res, next) => {
  if (!req.files) return next();
  await Promise.all(
    req.files.map(async (file) => {
      await sharp(file.path) // Corrección en el uso de `sharp`
        .resize(300, 300)
        .toFormat("jpeg")
        .jpeg({ quality: 90 })
        .toFile(`public/images/products/${file.filename}`);
    })
  );
  next();
};

// Middleware para redimensionar imágenes de blogs
export const blogImgResize = async (req, res, next) => {
  if (!req.files) return next();
  await Promise.all(
    req.files.map(async (file) => {
      await sharp(file.path) // Corrección en el uso de `sharp`
        .resize(300, 300)
        .toFormat("jpeg")
        .jpeg({ quality: 90 })
        .toFile(`public/images/blogs/${file.filename}`);
    })
  );
  next();
};
