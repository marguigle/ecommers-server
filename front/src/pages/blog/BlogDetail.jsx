import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setBlog, setLoading, clearBlog } from "../../redux/slices/blogSlice.js";
import blogApi from "../../redux/api/blogApi.js";

const BlogDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { blog, loading } = useSelector((state) => state.blog);

  useEffect(() => {
    const fetchBlog = async () => {
      dispatch(setLoading(true));
      try {
        const response = await blogApi.getBlog(id);
        dispatch(setBlog(response.data));
      } catch (error) {
        console.error("Failed to fetch blog:", error);
      } finally {
        dispatch(setLoading(false));
      }
    };
    fetchBlog();
    return () => dispatch(clearBlog());
  }, [dispatch, id]);

  if (loading) return <div className="text-center py-5">Loading...</div>;

  return (
    <div className="container-xxl py-5">
      <div className="row">
        <div className="col-md-8">
          <img src={blog?.images?.[0]?.url} className="img-fluid mb-4" alt={blog?.title} />
          <h1>{blog?.title}</h1>
          <div className="my-3 text-muted">
            By {blog?.author?.firstname} {blog?.author?.lastname} | {new Date(blog?.createdAt).toLocaleDateString()}
          </div>
          <div dangerouslySetInnerHTML={{ __html: blog?.description }} />
        </div>
      </div>
    </div>
  );
};

export default BlogDetail;
