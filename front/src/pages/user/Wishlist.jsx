import { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setWishlist, setWishlistLoading, removeFromExternalWishlist } from "../../redux/slices/wishlistSlice.js";
import userApi from "../../redux/api/userApi.js";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Spinner from "react-bootstrap/Spinner";

const Wishlist = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { wishlist, externalWishlist, loading } = useSelector((state) => state.wishlist);
  const { isAuthenticated } = useSelector((state) => state.auth);

  const fetchWishlist = useCallback(async () => {
    dispatch(setWishlistLoading(true));
    try {
      const response = await userApi.getWishlist();
      dispatch(setWishlist(response.data));
    } catch (error) {
      console.error("Failed to fetch wishlist:", error);
    } finally {
      dispatch(setWishlistLoading(false));
    }
  }, [dispatch]);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
    fetchWishlist();
  }, [isAuthenticated, dispatch, navigate, fetchWishlist]);

  const handleRemoveExternal = (id) => {
    dispatch(removeFromExternalWishlist(id));
  };

  if (!isAuthenticated) return null;

  const allItems = [...(wishlist || []), ...(externalWishlist || [])];

  return (
    <div className="container-xxl py-5">
      <h2 className="mb-4">My Wishlist</h2>
      {loading ? (
        <div className="text-center">
          <Spinner animation="border" />
        </div>
      ) : allItems.length > 0 ? (
        <>
          {externalWishlist?.length > 0 && (
            <h5 className="mb-3 text-muted">External Products</h5>
          )}
          <Row>
            {allItems.map((item) => (
              <Col key={item._id} md={3} className="mb-4">
                <div className="card h-100">
                  <div onClick={() => navigate(`/product/${item._id}`)} style={{ cursor: "pointer" }}>
                    <img src={item.images?.[0]?.url || "/placeholder.jpg"} className="card-img-top" alt={item.title} style={{ height: "200px", objectFit: "cover" }} />
                    <div className="card-body">
                      <h5 className="card-title text-truncate">{item.title}</h5>
                      <p className="card-text">${item.price}</p>
                    </div>
                  </div>
                  {externalWishlist?.some((ext) => ext._id === item._id) && (
                    <div className="card-footer bg-white border-top-0">
                      <Button variant="outline-danger" size="sm" onClick={() => handleRemoveExternal(item._id)}>
                        Remove
                      </Button>
                    </div>
                  )}
                </div>
              </Col>
            ))}
          </Row>
        </>
      ) : (
        <div className="text-center">Your wishlist is empty</div>
      )}
    </div>
  );
};

export default Wishlist;
