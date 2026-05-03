import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import categoryApi from "../../redux/api/categoryApi.js";

const AdminCategories = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const [categories, setCategories] = useState({ productCats: [], blogCats: [], colors: [], coupons: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated || user?.role !== "admin") {
      navigate("/login");
      return;
    }
    fetchCategories();
  }, [isAuthenticated, user, navigate]);

  const fetchCategories = async () => {
    try {
      const [prodCats, blogCats, colors, coupons] = await Promise.all([
        categoryApi.getProductCategories(),
        categoryApi.getBlogCategories(),
        categoryApi.getColors(),
        categoryApi.getCoupons(),
      ]);
      setCategories({
        productCats: prodCats.data || [],
        blogCats: blogCats.data || [],
        colors: colors.data || [],
        coupons: coupons.data || [],
      });
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated || user?.role !== "admin") return null;

  return (
    <div className="container-xxl py-5">
      <h2 className="mb-4">Manage Categories</h2>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          <div className="mb-5">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h4>Product Categories</h4>
              <button className="btn btn-sm btn-primary" onClick={() => navigate("/admin/categories/new?type=product")}>
                Add Product Category
              </button>
            </div>
            <table className="table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {categories.productCats.map((cat) => (
                  <tr key={cat._id}>
                    <td>{cat.title}</td>
                    <td>
                      <button className="btn btn-sm btn-danger" onClick={() => categoryApi.deleteProductCategory(cat._id).then(fetchCategories)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mb-5">
            <h4>Blog Categories</h4>
            <table className="table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {categories.blogCats.map((cat) => (
                  <tr key={cat._id}>
                    <td>{cat.title}</td>
                    <td>
                      <button className="btn btn-sm btn-danger" onClick={() => categoryApi.deleteBlogCategory(cat._id).then(fetchCategories)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default AdminCategories;
