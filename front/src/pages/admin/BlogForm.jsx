import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import blogApi from "../../redux/api/blogApi.js";

const BlogForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const [blog, setBlog] = useState({
    title: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user?.role !== "admin") {
      navigate("/login");
      return;
    }
    if (id) {
      fetchBlog();
    }
  }, [user, navigate, id]);

  const fetchBlog = async () => {
    try {
      const response = await blogApi.getBlog(id);
      setBlog(response.data);
    } catch (error) {
      console.error("Failed to fetch blog:", error);
    }
  };

  const handleChange = (e) => {
    setBlog({ ...blog, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (id) {
        await blogApi.updateBlog(id, blog);
      } else {
        await blogApi.createBlog(blog);
      }
      navigate("/admin/blogs");
    } catch (error) {
      alert("Failed to save blog");
    } finally {
      setLoading(false);
    }
  };

  if (user?.role !== "admin") return null;

  return (
    <div className="container-xxl py-5">
      <h2>{id ? "Edit Blog" : "Add New Blog"}</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Title</label>
          <input
            type="text"
            className="form-control"
            name="title"
            value={blog.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea
            className="form-control"
            name="description"
            value={blog.description}
            onChange={handleChange}
            rows="6"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? "Saving..." : "Save Blog"}
        </button>
        <button
          type="button"
          className="btn btn-secondary ms-2"
          onClick={() => navigate("/admin/blogs")}
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

export default BlogForm;
