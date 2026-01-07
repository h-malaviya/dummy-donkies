import "../styles/productCard.scss";
import useIsAdmin from "../../hooks/useIsAdmin";
export default function ProductCard({ product,
  onEdit,
  onDelete, }) {
  const { title, price, description, category, image, rating } = product;
  const stars = Math.round(rating?.rate || 0);
  const isAdmin = useIsAdmin()
  const isCartItem=false
  return (
    <div className="card">
      <div className="tilt">
        <div className="img">
          <img src={image} alt={title} />
        </div>
      </div>

      <div className="info">
        <div className="cat">{category}</div>

        <h2 className="title">
          {title.length > 45 ? title.slice(0, 45) + "…" : title}
        </h2>

        <p className="desc">
          {description.length > 100
            ? description.slice(0, 100) + "…"
            : description}
        </p>

        <div className="feats">
          <span className="feat">Premium Build</span>
          <span className="feat">Fast Delivery</span>
          <span className="feat">Warranty</span>
        </div>
        <div className="bottom">
          <div className="price">
            <span className="old">${(price * 1.2).toFixed(2)}</span>
            <span className="new">${price.toFixed(2)}</span>
          </div>

          {!isAdmin && (
            isCartItem ? (
              <div className="qty-control">
                <button
                  className="qty-btn"
                 
                >
                  −
                </button>

                <span className="qty">1</span>

                <button
                  className="qty-btn"
                  
                >
                  +
                </button>
              </div>
            ) : (
              <button
                className="btn"
                
              >
                <span>Add to Cart</span>
                <svg
                  className="icon"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <path d="M16 10a4 4 0 01-8 0" />
                </svg>
              </button>
            )
          )}
        </div>

        <div className="meta">
          <div className="rating">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill={i < stars ? "#FFD700" : "#E4E4E7"}
              >
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
            ))}
            <span className="rcount">{rating.count} Reviews</span>
          </div>

          <div className="stock">In Stock</div>
        </div>
      </div>
      {isAdmin && (
        <div className="admin-actions">
          <button onClick={() => onEdit(product)}>Edit</button>
          <button onClick={() => onDelete(product.id)}>Delete</button>
        </div>
      )}
    </div>

  );
}
