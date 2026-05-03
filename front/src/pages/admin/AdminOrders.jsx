import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import userApi from "../../redux/api/userApi.js";

const AdminOrders = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated || user?.role !== "admin") {
      navigate("/login");
      return;
    }
    fetchOrders();
  }, [isAuthenticated, user, navigate]);

  const fetchOrders = async () => {
    try {
      const response = await userApi.getAllOrders();
      setOrders(response.data || []);
    } catch (error) {
      console.error("Failed to fetch orders:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (id, newStatus) => {
    try {
      await userApi.updateOrderStatus(id, { status: newStatus });
      fetchOrders();
    } catch (error) {
      alert("Failed to update order status");
    }
  };

  if (!isAuthenticated || user?.role !== "admin") return null;

  return (
    <div className="container-xxl py-5">
      <h2 className="mb-4">Manage Orders</h2>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Total</th>
              <th>Status</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id?.substring(0, 8)}</td>
                <td>{order.user?.firstname} {order.user?.lastname}</td>
                <td>${order.totalPrice}</td>
                <td>
                  <span className={`badge bg-${order.orderStatus === "Delivered" ? "success" : "warning"}`}>
                    {order.orderStatus}
                  </span>
                </td>
                <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                <td>
                  <select
                    className="form-select form-select-sm"
                    value={order.orderStatus}
                    onChange={(e) => handleStatusUpdate(order._id, e.target.value)}
                  >
                    <option value="Ordered">Ordered</option>
                    <option value="Processing">Processing</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminOrders;
