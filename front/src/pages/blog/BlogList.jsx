import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setBlogs, setLoading, setError } from "../../redux/slices/blogSlice.js";
import blogApi from "../../redux/api/blogApi.js";

const BlogList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { blogs, loading } = useSelector((state) => state.blog);

  useEffect(() => {
    const fetchBlogs = async () => {
      dispatch(setLoading(true));
      try {
        const response = await blogApi.getAllBlogs();
        dispatch(setBlogs(response.data));
      } catch (error) {
        dispatch(setError(error.message));
      } finally {
        dispatch(setLoading(false));
      }
    };
    fetchBlogs();
  }, [dispatch]);

  return (
    <div className="container-xxl py-5">
      <h2 className="mb-4">Blogs</h2>
      {loading ? (
        <div className="text-center">Loading...</div>
      ) : (
        <div className="row">
          {blogs?.map((blog) => (
            <div key={blog._id} className="col-md-4 mb-4">
              <div className="card h-100" onClick={() => navigate(`/blog/${blog._id}`)} style={{ cursor: "pointer" }}>
                <img src={blog.images?.[0]?.url || "/placeholder.jpg"} className="card-img-top" alt={blog.title} />
                <div className="card-body">
                  <h5 className="card-title">{blog.title}</h5>
                  <p className="card-text">{blog.description?.substring(0, 100)}...</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BlogList;
