import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import productApi from "../../redux/api/productApi.js";
import categoryApi from "../../redux/api/categoryApi.js";

const ProductForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const [product, setProduct] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    brand: "",
    quantity: "",
    color: [],
    tags: [],
  });
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user?.role !== "admin") {
      navigate("/login");
      return;
    }
    fetchCategories();
    if (id) {
      fetchProduct();
    }
  }, [user, navigate, id]);

  const fetchCategories = async () => {
    try {
      const response = await categoryApi.getProductCategories();
      setCategories(response.data || []);
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    }
  };

  const fetchProduct = async () => {
    try {
      const response = await productApi.getProduct(id);
      setProduct(response.data);
    } catch (error) {
      console.error("Failed to fetch product:", error);
    }
  };

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (id) {
        await productApi.updateProduct(id, product);
      } else {
        await productApi.createProduct(product);
      }
      navigate("/admin/products");
    } catch (error) {
      alert("Failed to save product");
    } finally {
      setLoading(false);
    }
  };

  if (user?.role !== "admin") return null;

  return (
    <div className="container-xxl py-5">
      <h2>{id ? "Edit Product" : "Add New Product"}</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Title</label>
          <input
            type="text"
            className="form-control"
            name="title"
            value={product.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea
            className="form-control"
            name="description"
            value={product.description}
            onChange={handleChange}
            rows="4"
            required
          />
        </div>
        <div className="row">
          <div className="col-md-6 mb-3">
            <label className="form-label">Price</label>
            <input
              type="number"
              className="form-control"
              name="price"
              value={product.price}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-6 mb-3">
            <label className="form-label">Quantity</label>
            <input
              type="number"
              className="form-control"
              name="quantity"
              value={product.quantity}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="mb-3">
          <label className="form-label">Category</label>
          <select
            className="form-control"
            name="category"
            value={product.category}
            onChange={handleChange}
            required
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.title}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Brand</label>
          <input
            type="text"
            className="form-control"
            name="brand"
            value={product.brand}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? "Saving..." : "Save Product"}
        </button>
        <button
          type="button"
          className="btn btn-secondary ms-2"
          onClick={() => navigate("/admin/products")}
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

export default ProductForm;
