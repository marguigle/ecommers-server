import cloudinary from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.SECRET_KEY,
});

const cloudinaryUploadImg = async (fileToUpload) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(
      fileToUpload,
      { resource_type: "auto" },
      (error, result) => {
        if (error) {
          return reject(error); // Rechaza la promesa si ocurre un error
        }
        resolve(result.secure_url); // Devuelve solo la URL segura
      }
    );
  });
};

export default cloudinaryUploadImg;
