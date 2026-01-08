import FilterBar from './FilterBar'
import NavBar from '../../../shared/components/NavBar'
import ProductGrid from '../../../shared/components/ProductGrid'
import { useState,useMemo } from 'react';
import useProducts from '../../../hooks/useProducts';

function Home() {
  const { products, loading, error } = useProducts();
  const [filters, setFilters] = useState({
    category: "",
    rating: "",
    sort: ""
  });
  const [productSearch, setProductSearch] = useState("");
  console.log(productSearch);
  
  const filteredProducts = useMemo(() => {
    let result = [...products];

     if (productSearch.trim()) {
      const q = productSearch.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) 
        || p.description?.toLowerCase().includes(q)
          
      );
    }
    if (filters.category) {
      result = result.filter(
        (p) => p.category === filters.category
      );
    }

    if (filters.rating) {
      result = result.filter(
        (p) => p.rating?.rate >= Number(filters.rating)
      );
    }

    if (filters.sort === "low") {
      result.sort((a, b) => a.price - b.price);
    }
    if (filters.sort === "high") {
      result.sort((a, b) => b.price - a.price);
    }

    return result;
  }, [products, filters,productSearch]);

  if (loading) return <p>Loading products...</p>;
  if (error) return <p>Failed to load products</p>;
  return (
    <>
      <NavBar onSearch={setProductSearch} />
      <FilterBar products={products} onChange={setFilters} />
      <ProductGrid products={filteredProducts} />
    </>
  )
}

export default Home