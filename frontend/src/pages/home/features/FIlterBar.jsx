import { useState,useEffect } from "react";
import "./styles/filterBar.scss";

const SORT_OPTIONS = [
  { value: "", label: "Sort by price" },
  { value: "low", label: "Price: Low → High" },
  { value: "high", label: "Price: High → Low" }
];

const RATING_OPTIONS = [
  { value: "", label: "Min rating" },
  { value: 4, label: "4 ★ & above" },
  { value: 3, label: "3 ★ & above" },
  { value: 2, label: "2 ★ & above" }
];

export default function FilterBar({ products = [], onChange }) {
  const [category, setCategory] = useState("");
  const [rating, setRating] = useState("");
  const [sort, setSort] = useState("");

  // derive categories dynamically from products
  const categories = [
    "",
    ...Array.from(new Set(products.map(p => p.category)))
  ];

  useEffect(() => {
    onChange({
      category,
      rating,
      sort
    });
  }, [category, rating, sort]);

  return (
    <section className="filter-bar">
      <div className="filter-container">

        {/* CATEGORY */}
        <select value={category} onChange={e => setCategory(e.target.value)}>
          <option value="">All Categories</option>
          {categories
            .filter(Boolean)
            .map(cat => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
        </select>

        {/* RATING */}
        <select value={rating} onChange={e => setRating(e.target.value)}>
          {RATING_OPTIONS.map(opt => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>

        {/* SORT */}
        <select value={sort} onChange={e => setSort(e.target.value)}>
          {SORT_OPTIONS.map(opt => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>

        {/* CLEAR */}
        {(category || rating || sort) && (
          <button className="clear-btn" onClick={() => {
            setCategory("");
            setRating("");
            setSort("");
          }}>
            Clear
          </button>
        )}
      </div>
    </section>
  );
}