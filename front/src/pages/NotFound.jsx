import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="container-xxl py-5 text-center">
      <h1 className="display-1">404</h1>
      <h3>Page Not Found</h3>
      <p>The page you are looking for does not exist.</p>
      <Link to="/" className="btn btn-primary mt-3">
        Go Home
      </Link>
    </div>
  );
};

export default NotFound;
