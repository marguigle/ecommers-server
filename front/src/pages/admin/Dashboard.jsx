import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import userApi from "../../redux/api/userApi.js";

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const [stats, setStats] = useState({
    users: 0,
    products: 0,
    orders: 0,
    revenue: 0,
  });

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
    if (user?.role !== "admin") {
      navigate("/");
      return;
    }
    fetchStats();
  }, [isAuthenticated, user, navigate]);

  const fetchStats = async () => {
    try {
      const [usersRes, ordersRes] = await Promise.all([
        userApi.getAllUsers(),
        userApi.getAllOrders(),
      ]);
      setStats({
        users: usersRes.data?.length || 0,
        orders: ordersRes.data?.length || 0,
        products: 0,
        revenue: ordersRes.data?.reduce((acc, order) => acc + (order.totalPrice || 0), 0) || 0,
      });
    } catch (error) {
      console.error("Failed to fetch stats:", error);
    }
  };

  if (!isAuthenticated || user?.role !== "admin") return null;

  return (
    <div className="container-xxl py-5">
      <h2 className="mb-4">Admin Dashboard</h2>
      <div className="row">
        <div className="col-md-3 mb-3">
          <div className="card bg-primary text-white">
            <div className="card-body">
              <h3>{stats.users}</h3>
              <p className="mb-0">Users</p>
            </div>
          </div>
        </div>
        <div className="col-md-3 mb-3">
          <div className="card bg-success text-white">
            <div className="card-body">
              <h3>{stats.products}</h3>
              <p className="mb-0">Products</p>
            </div>
          </div>
        </div>
        <div className="col-md-3 mb-3">
          <div className="card bg-warning text-white">
            <div className="card-body">
              <h3>{stats.orders}</h3>
              <p className="mb-0">Orders</p>
            </div>
          </div>
        </div>
        <div className="col-md-3 mb-3">
          <div className="card bg-info text-white">
            <div className="card-body">
              <h3>${stats.revenue}</h3>
              <p className="mb-0">Revenue</p>
            </div>
          </div>
        </div>
      </div>
      <div className="row mt-4">
        <div className="col-md-6">
          <div className="list-group">
            <button className="list-group-item list-group-item-action" onClick={() => navigate("/admin/products")}>
              Manage Products
            </button>
            <button className="list-group-item list-group-item-action" onClick={() => navigate("/admin/users")}>
              Manage Users
            </button>
            <button className="list-group-item list-group-item-action" onClick={() => navigate("/admin/orders")}>
              Manage Orders
            </button>
            <button className="list-group-item list-group-item-action" onClick={() => navigate("/admin/blogs")}>
              Manage Blogs
            </button>
            <button className="list-group-item list-group-item-action" onClick={() => navigate("/admin/categories")}>
              Manage Categories
            </button>
            <button className="list-group-item list-group-item-action" onClick={() => navigate("/admin/coupons")}>
              Manage Coupons
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
