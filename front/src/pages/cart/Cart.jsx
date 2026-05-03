import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setCart, clearCart, setCartLoading } from "../../redux/slices/cartSlice.js";
import { setWishlist } from "../../redux/slices/wishlistSlice.js";
import userApi from "../../redux/api/userApi.js";
import productApi from "../../redux/api/productApi.js";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cart, cartTotal, loading } = useSelector((state) => state.cart);
  const { isAuthenticated } = useSelector((state) => state.auth);
  const [coupon, setCoupon] = useState("");

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
    fetchCart();
  }, [isAuthenticated, dispatch, navigate]);

  const fetchCart = async () => {
    dispatch(setCartLoading(true));
    try {
      const response = await userApi.getCart();
      dispatch(setCart(response.data));
    } catch (error) {
      console.error("Failed to fetch cart:", error);
    } finally {
      dispatch(setCartLoading(false));
    }
  };

  const handleApplyCoupon = async () => {
    try {
      const response = await userApi.applyCoupon(coupon);
      dispatch(setCart(response.data));
    } catch (error) {
      alert("Invalid coupon");
    }
  };

  const handleCheckout = async () => {
    try {
      await userApi.createOrder({});
      dispatch(clearCart());
      alert("Order placed successfully!");
      navigate("/orders");
    } catch (error) {
      alert("Checkout failed");
    }
  };

  if (!isAuthenticated) return null;

  return (
    <div className="container-xxl py-5">
      <h2 className="mb-4">Shopping Cart</h2>
      {loading ? (
        <div>Loading...</div>
      ) : cart?.length > 0 ? (
        <>
          <div className="row">
            {cart.map((item) => (
              <div key={item._id} className="col-12 mb-3">
                <div className="card">
                  <div className="card-body d-flex align-items-center gap-3">
                    <img src={item.productId?.images?.[0]?.url} alt="" style={{ width: "80px" }} />
                    <div className="flex-grow-1">
                      <h5>{item.productId?.title}</h5>
                      <p>Qty: {item.quantity} x ${item.price}</p>
                    </div>
                    <h4>${item.quantity * item.price}</h4>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="row mt-4">
            <div className="col-md-6">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Coupon code"
                  value={coupon}
                  onChange={(e) => setCoupon(e.target.value)}
                />
                <button className="btn btn-secondary" onClick={handleApplyCoupon}>Apply</button>
              </div>
            </div>
            <div className="col-md-6 text-end">
              <h3>Total: ${cartTotal}</h3>
              <button className="btn btn-primary btn-lg" onClick={handleCheckout}>Checkout</button>
            </div>
          </div>
        </>
      ) : (
        <div className="text-center">Your cart is empty</div>
      )}
    </div>
  );
};

export default Cart;
