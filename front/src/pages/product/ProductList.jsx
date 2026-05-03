import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchExternalProducts } from "../../redux/slices/productSlice.js";
import { fetchExternalCategories } from "../../redux/slices/categorySlice.js";
import Spinner from "react-bootstrap/Spinner";
import Alert from "react-bootstrap/Alert";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

const ProductList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { products, loading, error } = useSelector((state) => state.product);
  const { productCategories } = useSelector((state) => state.category);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    dispatch(fetchExternalCategories());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchExternalProducts(selectedCategory));
  }, [dispatch, selectedCategory]);

  return (
    <div className="container-xxl py-5">
      <h2 className="mb-4">Products</h2>
      <div className="mb-4">
        <Button
          variant={!selectedCategory ? "primary" : "outline-primary"}
          className="me-2 mb-2"
          onClick={() => setSelectedCategory(null)}
        >
          All
        </Button>
        {productCategories?.map((cat) => (
          <Button
            key={cat}
            variant={selectedCategory === cat ? "primary" : "outline-primary"}
            className="me-2 mb-2"
            onClick={() => setSelectedCategory(cat)}
          >
            {cat}
          </Button>
        ))}
      </div>
      {loading && (
        <div className="text-center">
          <Spinner animation="border" />
        </div>
      )}
      {error && <Alert variant="danger">{error}</Alert>}
      {!loading && !error && (
        <Row>
          {products?.map((product) => (
            <Col key={product._id} md={3} className="mb-4">
              <div className="card h-100" onClick={() => navigate(`/product/${product._id}`)} style={{ cursor: "pointer" }}>
                <img src={product.images?.[0]?.url || "/placeholder.jpg"} className="card-img-top" alt={product.title} style={{ height: "200px", objectFit: "cover" }} />
                <div className="card-body">
                  <h5 className="card-title text-truncate">{product.title}</h5>
                  <p className="card-text">${product.price}</p>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
};

export default ProductList;
