import axios from "axios";

const baseURL = "http://localhost:5000/api/user";

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

const userApi = {
  register: (userData) => axiosInstance.post("/register", userData),
  login: (credentials) => axiosInstance.post("/login", credentials),
  adminLogin: (credentials) => axiosInstance.post("/admin-login", credentials),
  forgotPassword: (email) => axiosInstance.post("/forgot-password-token", { email }),
  resetPassword: (token, password) => axiosInstance.put(`/reset-password/${token}`, { password }),
  updatePassword: (data) => axiosInstance.put("/password", data),
  getProfile: () => axiosInstance.get("/get-orders"),
  updateProfile: (data) => axiosInstance.put("/edit-user", data),
  saveAddress: (address) => axiosInstance.put("/save-address", { address }),
  getAllUsers: () => axiosInstance.get("/all-users"),
  getUser: (id) => axiosInstance.get(`/${id}`),
  deleteUser: (id) => axiosInstance.delete(`/${id}`),
  blockUser: (id) => axiosInstance.put(`/block-user/${id}`),
  unblockUser: (id) => axiosInstance.put(`/unblock-user/${id}`),
  getWishlist: () => axiosInstance.get("/wishlist"),
  addToCart: (cartData) => axiosInstance.post("/cart", cartData),
  getCart: () => axiosInstance.get("/cart"),
  emptyCart: () => axiosInstance.delete("/emty-cart"),
  applyCoupon: (coupon) => axiosInstance.post("/cart/apply-coupon", { coupon }),
  createOrder: (orderData) => axiosInstance.post("/cart/cash-order", orderData),
  getOrders: () => axiosInstance.get("/get-orders"),
  getAllOrders: () => axiosInstance.get("/getallorders"),
  getOrderById: (id, data) => axiosInstance.post(`/getorderbyuser/${id}`, data),
  updateOrderStatus: (id, data) => axiosInstance.put(`/orders/update-order/${id}`, data),
  logout: () => axiosInstance.get("/logout"),
  refreshToken: () => axiosInstance.get("/refresh"),
};

export default userApi;
