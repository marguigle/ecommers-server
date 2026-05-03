import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import blogApi from "../../redux/api/blogApi.js";

const AdminBlogs = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated || user?.role !== "admin") {
      navigate("/login");
      return;
    }
    fetchBlogs();
  }, [isAuthenticated, user, navigate]);

  const fetchBlogs = async () => {
    try {
      const response = await blogApi.getAllBlogs();
      setBlogs(response.data || []);
    } catch (error) {
      console.error("Failed to fetch blogs:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this blog?")) {
      try {
        await blogApi.deleteBlog(id);
        fetchBlogs();
      } catch (error) {
        alert("Failed to delete blog");
      }
    }
  };

  if (!isAuthenticated || user?.role !== "admin") return null;

  return (
    <div className="container-xxl py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Manage Blogs</h2>
        <button className="btn btn-primary" onClick={() => navigate("/admin/blogs/new")}>
          Add New Blog
        </button>
      </div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>Likes</th>
              <th>Dislikes</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {blogs.map((blog) => (
              <tr key={blog._id}>
                <td>{blog.title}</td>
                <td>{blog.author?.firstname} {blog.author?.lastname}</td>
                <td>{blog.numLikes || 0}</td>
                <td>{blog.numDislikes || 0}</td>
                <td>
                  <button className="btn btn-sm btn-warning me-2" onClick={() => navigate(`/admin/blogs/edit/${blog._id}`)}>
                    Edit
                  </button>
                  <button className="btn btn-sm btn-danger" onClick={() => handleDelete(blog._id)}>
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

export default AdminBlogs;
