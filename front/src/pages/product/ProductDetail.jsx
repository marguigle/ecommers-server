import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setProduct, setLoading, setError, clearProduct } from "../../redux/slices/productSlice.js";
import { setWishlist, addToExternalWishlist } from "../../redux/slices/wishlistSlice.js";
import productApi from "../../redux/api/productApi.js";
import userApi from "../../redux/api/userApi.js";

const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { product, loading } = useSelector((state) => state.product);
  const { isAuthenticated } = useSelector((state) => state.auth);
  const [quantity, setQuantity] = useState(1);
  const isExternal = /^\d+$/.test(id);

  useEffect(() => {
    const fetchProduct = async () => {
      dispatch(setLoading(true));
      dispatch(setError(null));
      try {
        if (isExternal) {
          const response = await fetch(`https://fakestoreapi.com/products/${id}`);
          if (!response.ok) throw new Error("Product not found");
          const data = await response.json();
          dispatch(setProduct({
            _id: data.id,
            title: data.title,
            price: data.price,
            description: data.description,
            images: [{ url: data.image }],
            category: data.category,
            rating: data.rating,
          }));
        } else {
          const response = await productApi.getProduct(id);
          dispatch(setProduct(response.data));
        }
      } catch (error) {
        dispatch(setError(error.message));
      } finally {
        dispatch(setLoading(false));
      }
    };
    fetchProduct();
    return () => dispatch(clearProduct());
  }, [dispatch, id, isExternal]);

  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
    try {
      let productIdToAdd = id;
      if (isExternal) {
        console.log("Syncing external product:", product._id);
        const syncRes = await productApi.syncExternalProduct({
          externalId: product._id,
          title: product.title,
          price: product.price,
          description: product.description,
          image: product.images?.[0]?.url,
          category: product.category,
        });
        console.log("Sync response:", syncRes.data);
        productIdToAdd = syncRes.data._id;
      }
      console.log("Adding to cart with productId:", productIdToAdd);
      const cartRes = await userApi.addToCart({
        cart: [{ _id: productIdToAdd, count: quantity, color: "" }],
      });
      console.log("Cart response:", cartRes.data);
      alert("Added to cart!");
    } catch (error) {
      console.error("Full error:", error);
      console.error("Error response:", error.response);
      alert(`Failed: ${error.response?.data?.message || error.message}`);
    }
  };

  const handleAddToWishlist = async () => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
    try {
      if (isExternal) {
        dispatch(addToExternalWishlist(product));
      } else {
        await productApi.addToWishlist(id);
        const wishlistRes = await userApi.getWishlist();
        dispatch(setWishlist(wishlistRes.data));
      }
      alert("Added to wishlist!");
    } catch {
      alert("Failed to add to wishlist");
    }
  };

  if (loading) return <div className="text-center py-5">Loading...</div>;
  if (!product) return <div className="text-center py-5">Product not found</div>;

  return (
    <div className="container-xxl py-5">
      <div className="row">
        <div className="col-md-6">
          <img src={product?.images?.[0]?.url || "/placeholder.jpg"} className="img-fluid" alt={product?.title} />
        </div>
        <div className="col-md-6">
          <h2>{product?.title}</h2>
          <p className="text-muted">{product?.description}</p>
          <h3 className="text-primary">${product?.price}</h3>
          <div className="d-flex align-items-center gap-3 my-4">
            <label>Quantity:</label>
            <input
              type="number"
              className="form-control w-25"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value))}
            />
          </div>
          <div className="d-flex gap-2">
            <button className="btn btn-primary" onClick={handleAddToCart}>Add to Cart</button>
            <button className="btn btn-outline-secondary" onClick={handleAddToWishlist}>
              Add to Wishlist
            </button>
          </div>
          {isExternal && (
            <div className="alert alert-info mt-3">
              This is an external product. It will be saved to the database when adding to cart.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
