import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import productApi from "../../redux/api/productApi.js";
import categoryApi from "../../redux/api/categoryApi.js";

const AdminProducts = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated || user?.role !== "admin") {
      navigate("/login");
      return;
    }
    fetchProducts();
  }, [isAuthenticated, user, navigate]);

  const fetchProducts = async () => {
    try {
      const response = await productApi.getAllProducts();
      setProducts(response.data || []);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await productApi.deleteProduct(id);
        fetchProducts();
      } catch (error) {
        alert("Failed to delete product");
      }
    }
  };

  if (!isAuthenticated || user?.role !== "admin") return null;

  return (
    <div className="container-xxl py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Manage Products</h2>
        <button className="btn btn-primary" onClick={() => navigate("/admin/products/new")}>
          Add New Product
        </button>
      </div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Title</th>
              <th>Price</th>
              <th>Category</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td>
                  <img src={product.images?.[0]?.url || "/placeholder.jpg"} alt="" style={{ width: "50px" }} />
                </td>
                <td>{product.title}</td>
                <td>${product.price}</td>
                <td>{product.category?.title}</td>
                <td>
                  <button className="btn btn-sm btn-warning me-2" onClick={() => navigate(`/admin/products/edit/${product._id}`)}>
                    Edit
                  </button>
                  <button className="btn btn-sm btn-danger" onClick={() => handleDelete(product._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminProducts;
