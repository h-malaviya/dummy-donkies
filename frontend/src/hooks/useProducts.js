import { useState, useEffect } from "react";
import api from "../services/axios";
import { getStorage, setStorage } from "../shared/utils/storage";
import { generateId } from "../shared/utils/generateId";
import { BACKEND_ENDPOINTS } from "../app/appConfig";

export default function useProducts() {
  const storageKey = "products";
  const endpoint = BACKEND_ENDPOINTS.PRODUCTS;

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const local = getStorage(storageKey);
    if (local) {
      setProducts(local);
      setLoading(false);
    } else {
      api.get(endpoint)
        .then((res) => {
          if (res.status === 200) {
            setProducts(res.data);
            setStorage(storageKey, res.data);
          }
        })
        .catch((err) => setError(err))
        .finally(() => setLoading(false));
    }
  }, []);

  const createProduct = async (productData) => {
    try {
      const res = await api.post(endpoint, productData);
      if (res.status >= 200 && res.status < 300) {
        const newProduct = {
          ...productData,
          id: res.data.id ?? generateId(),
        };
        const updated = [newProduct, ...products];
        setProducts(updated);
        setStorage(storageKey, updated);
        return { success: true, product: newProduct };
      }
    } catch (err) {
      setError(err);
      return { success: false, error: err };
    }
  };

  const updateProduct = async (id, updates) => {
    try {
      const res = await api.put(`${BACKEND_ENDPOINTS.PRODUCT}${id}`, updates);
      if (res.status >= 200 && res.status < 300) {
        const updated = products.map((p) =>
          p.id === id ? { ...p, ...updates } : p
        );
        setProducts(updated);
        setStorage(storageKey, updated);
        return { success: true };
      }
    } catch (err) {
      setError(err);
      return { success: false, error: err };
    }
  };

  const deleteProduct = async (id) => {
    try {
      const res = await api.delete(`${BACKEND_ENDPOINTS.PRODUCT}${id}`);
      if (res.status >= 200 && res.status < 300) {
        const updated = products.filter((p) => p.id !== id);
        setProducts(updated);
        setStorage(storageKey, updated);
        return { success: true };
      }
    } catch (err) {
      setError(err);
      return { success: false, error: err };
    }
  };

  return {
    products,
    loading,
    error,
    createProduct,
    updateProduct,
    deleteProduct,
  };
}
