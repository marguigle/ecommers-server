import axios from "axios";

const baseURL = "http://localhost:5000/api";

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

const categoryApi = {
  getProductCategories: () => axiosInstance.get("/prodcategory"),
  getProductCategory: (id) => axiosInstance.get(`/prodcategory/${id}`),
  createProductCategory: (data) => axiosInstance.post("/prodcategory", data),
  updateProductCategory: (id, data) => axiosInstance.put(`/prodcategory/${id}`, data),
  deleteProductCategory: (id) => axiosInstance.delete(`/prodcategory/${id}`),
  getBlogCategories: () => axiosInstance.get("/blogcategory"),
  getBlogCategory: (id) => axiosInstance.get(`/blogcategory/${id}`),
  createBlogCategory: (data) => axiosInstance.post("/blogcategory", data),
  updateBlogCategory: (id, data) => axiosInstance.put(`/blogcategory/${id}`, data),
  deleteBlogCategory: (id) => axiosInstance.delete(`/blogcategory/${id}`),
  getColors: () => axiosInstance.get("/Color"),
  getColor: (id) => axiosInstance.get(`/Color/${id}`),
  createColor: (data) => axiosInstance.post("/Color", data),
  updateColor: (id, data) => axiosInstance.put(`/Color/${id}`, data),
  deleteColor: (id) => axiosInstance.delete(`/Color/${id}`),
  getCoupons: () => axiosInstance.get("/coupon"),
  createCoupon: (data) => axiosInstance.post("/coupon", data),
  updateCoupon: (id, data) => axiosInstance.put(`/coupon/${id}`, data),
  deleteCoupon: (id) => axiosInstance.delete(`/coupon/${id}`),
};

export default categoryApi;
