import axios from "axios";

const baseURL = "http://localhost:5000/api/product";

const axiosInstance = axios.create({ baseURL });

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

const productApi = {
  getAllProducts: (params) => axiosInstance.get("/", { params }),
  getProduct: (id) => axiosInstance.get(`/${id}`),
  createProduct: (productData) => axiosInstance.post("/", productData),
  updateProduct: (id, productData) => axiosInstance.put(`/${id}`, productData),
  deleteProduct: (id) => axiosInstance.delete(`/${id}`),
  addToWishlist: (productId) => axiosInstance.put("/wishlist", { productId }),
  rateProduct: (ratingData) => axiosInstance.put("/rating", ratingData),
  uploadImages: (formData) => axiosInstance.put("/upload", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  }),
  deleteImages: (id, public_id) => axiosInstance.delete(`/delete-img/${id}`, { data: { public_id } }),
  syncExternalProduct: (productData) => axiosInstance.post("/sync-external", productData),
};

export default productApi;
