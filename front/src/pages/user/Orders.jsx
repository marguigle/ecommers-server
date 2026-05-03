import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setCart, setCartLoading } from "../../redux/slices/cartSlice.js";
import userApi from "../../redux/api/userApi.js";

const Orders = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cart: orders, loading } = useSelector((state) => state.cart);
  const { isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
    fetchOrders();
  }, [isAuthenticated, dispatch, navigate]);

  const fetchOrders = async () => {
    dispatch(setCartLoading(true));
    try {
      const response = await userApi.getOrders();
      dispatch(setCart(response.data));
    } catch (error) {
      console.error("Failed to fetch orders:", error);
    } finally {
      dispatch(setCartLoading(false));
    }
  };

  if (!isAuthenticated) return null;

  return (
    <div className="container-xxl py-5">
      <h2 className="mb-4">My Orders</h2>
      {loading ? (
        <div>Loading...</div>
      ) : orders?.length > 0 ? (
        <div className="row">
          {orders.map((order) => (
            <div key={order._id} className="col-12 mb-3">
              <div className="card">
                <div className="card-body">
                  <div className="d-flex justify-content-between">
                    <div>
                      <h5>Order #{order._id?.substring(0, 8)}</h5>
                      <p className="text-muted">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div>
                      <span className={`badge bg-${order.orderStatus === "Delivered" ? "success" : "warning"}`}>
                        {order.orderStatus}
                      </span>
                    </div>
                  </div>
                  <div className="mt-3">
                    {order.products?.map((item) => (
                      <div key={item._id} className="d-flex align-items-center gap-3 mb-2">
                        <img
                          src={item.productId?.images?.[0]?.url}
                          alt=""
                          style={{ width: "50px", height: "50px", objectFit: "cover" }}
                        />
                        <span>{item.productId?.title} x {item.quantity}</span>
                      </div>
                    ))}
                  </div>
                  <h5 className="mt-3">Total: ${order.totalPrice}</h5>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center">No orders yet</div>
      )}
    </div>
  );
};

export default Orders;
