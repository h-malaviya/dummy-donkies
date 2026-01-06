import { useState, useMemo } from "react";
import ProductCard from "./ProductCard";
import "../styles/productGrid.scss";
import { isAdmin } from "../../app/appConfig";
const PER_PAGE = 3;
function getPaginationPages(page, totalPages) {
  const pages = [];

  // Always show first page
  pages.push(1);

  // Case 1: page 1 or 2 → show 2, 3
  if (page <= 2) {
    if (totalPages >= 2) pages.push(2);
    if (totalPages >= 3) pages.push(3);

    if (totalPages > 3) pages.push("dots");
  }

  // Case 2: page >= 3
  if (page >= 3) {
    pages.push("dots");

    pages.push(page);

    if (page + 1 <= totalPages) {
      pages.push(page + 1);
    }
  }

  // Always show last page (if not already)
  if (!pages.includes(totalPages)) {
    pages.push(totalPages);
  }

  // Remove invalid pages & duplicates
  return [...new Set(pages)].filter(
    p => p === "dots" || (p >= 1 && p <= totalPages)
  );
}

export default function ProductGrid({ onEdit, onDelete,products = [], filters }) {
  const [page, setPage] = useState(1);

  const totalPages = Math.ceil(products.length / PER_PAGE);

  const paginatedProducts = useMemo(() => {
    const start = (page - 1) * PER_PAGE;
    return products.slice(start, start + PER_PAGE);
  }, [products, page]);

  if (!products.length) {
    return <p className="empty-state">No products available</p>;
  }
  const filteredProducts = useMemo(() => {
    let list = [...products];

    // CATEGORY
    if (filters?.category) {
      list = list.filter(p => p.category === filters.category);
    }

    // RATING
    if (filters?.rating) {
      list = list.filter(p => p.rating?.rate >= Number(filters.rating));
    }

    // SORT
    if (filters?.sort === "low") {
      list.sort((a, b) => a.price - b.price);
    }

    if (filters?.sort === "high") {
      list.sort((a, b) => b.price - a.price);
    }

    return list;
  }, [products, filters]);

  if (!filteredProducts.length) {
    return <p className="empty-state">No products match filters</p>;
  }
  const prev = () => page > 1 && setPage(p => p - 1);
  const next = () => page < totalPages && setPage(p => p + 1);
  const pages = getPaginationPages(page, totalPages);
  return (
    <section className="product-grid-section">
      <div className="product-grid">
        {paginatedProducts.map(p => (
          <ProductCard
            key={p.id}
            product={p}
            isAdmin={isAdmin}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}

      </div>
      <div className="pagination">
        <button
          className="nav"
          disabled={page === 1}
          onClick={prev}
        >
          &lt;
        </button>

        {pages.map((p, idx) =>
          p === "dots" ? (
            <span key={idx} className="dots">…</span>
          ) : (
            <button
              key={idx}
              className={p === page ? "active" : ""}
              onClick={() => setPage(p)}
            >
              {p}
            </button>
          )
        )}

        <button
          className="nav"
          disabled={page === totalPages}
          onClick={next}
        >
          &gt;
        </button>
      </div>

    </section>
  );
}
