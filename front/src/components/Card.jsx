import { useNavigate } from "react-router-dom";

const Card = ({ product }) => {
  const navigate = useNavigate();

  if (!product) return null;

  return (
    <button
      className="card h-100 text-start w-100 border-0"
      onClick={() => navigate(`/product/${product._id}`)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          navigate(`/product/${product._id}`);
        }
      }}
      style={{ cursor: "pointer" }}
      aria-label={`View ${product.title}`}
    >
      <img
        src={product.images?.[0]?.url || "/placeholder.jpg"}
        className="card-img-top"
        alt={product.title}
        style={{ height: "200px", objectFit: "cover" }}
        width="300"
        height="200"
      />
      <div className="card-body">
        <h5 className="card-title text-truncate">{product.title}</h5>
        <p className="card-text text-muted" style={{ textWrap: "balance" }}>
          {product.description?.substring(0, 50)}…
        </p>
        <h5 className="text-primary">${product.price}</h5>
      </div>
    </button>
  );
};

export default Card;
