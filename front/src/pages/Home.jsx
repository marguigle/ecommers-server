import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchExternalProducts } from "../redux/slices/productSlice.js";
import Card from "../components/Card.jsx";
import Spinner from "react-bootstrap/Spinner";
import Alert from "react-bootstrap/Alert";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const Home = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(fetchExternalProducts());
  }, [dispatch]);

  return (
    <section className="home-wraper-1 py-5">
      <div className="container-xxl">
        <div className="row">
          <div className="col-12">
            <h2 className="mb-4">Featured Products</h2>
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
                    <Card product={product} />
                  </Col>
                ))}
              </Row>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
