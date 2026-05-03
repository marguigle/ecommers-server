import axios from "axios";

const baseURL = "http://localhost:5000/api/blog";

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

const blogApi = {
  getAllBlogs: () => axiosInstance.get("/"),
  getBlog: (id) => axiosInstance.get(`/${id}`),
  createBlog: (blogData) => axiosInstance.post("/", blogData),
  updateBlog: (id, blogData) => axiosInstance.put(`/${id}`, blogData),
  deleteBlog: (id) => axiosInstance.delete(`/${id}`),
  likeBlog: (blogId) => axiosInstance.put("/likes", { blogId }),
  dislikeBlog: (blogId) => axiosInstance.put("/dislikes", { blogId }),
  uploadImages: (id, formData) => axiosInstance.put(`/upload/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  }),
};

export default blogApi;
