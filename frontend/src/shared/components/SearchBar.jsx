import { useState ,useEffect} from "react";
import "../styles/searchBar.scss";
export default function SearchBar({ onSearch }) {
  const [query,setQuery]=useState("")
  
  useEffect(() => {
    const id = setTimeout(() => {
      onSearch?.(query);
    }, 500);

    return () => clearTimeout(id);
  }, [query, onSearch]);

  return (
    <div className="search-bar">
      <svg
        className="search-icon"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path d="M21 21l-4.35-4.35m1.6-5.4a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>

      <input
        type="text"
        placeholder="Search products…"
        value={query}
        onChange={(e)=>setQuery(e.target.value)}
      />
    </div>
  );
}
