import { useState, useEffect } from "react";
import api from "../services/axios";
import { getStorage, setStorage } from "../shared/utils/storage";
import { generateId } from "../shared/utils/generateId";
import { BACKEND_ENDPOINTS } from "../app/appConfig";

export default function useCarts() {
  const storageKey = "carts";
  const endpoint = BACKEND_ENDPOINTS.CARTS;

  const [carts, setCarts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const local = getStorage(storageKey);
    if (local) {
      setCarts(local);
      setLoading(false);
    } else {
      api.get(endpoint)
        .then((res) => {
          if (res.status === 200) {
            setCarts(res.data);
            setStorage(storageKey, res.data);
          }
        })
        .catch((err) => setError(err))
        .finally(() => setLoading(false));
    }
  }, []);

  const createCart = async (cartData) => {
    try {
      const res = await api.post(endpoint, cartData);
      if (res.status >= 200 && res.status < 300) {
        const newCart = {
          ...cartData,
          id: res.data.id ?? generateId(),
        };
        const updated = [newCart, ...carts];
        setCarts(updated);
        setStorage(storageKey, updated);
        return { success: true, cart: newCart };
      }
    } catch (err) {
      setError(err);
      return { success: false, error: err };
    }
  };

  const updateCart = async (id, updates) => {
    try {
      const res = await api.put(`${BACKEND_ENDPOINTS.CART}${id}`, updates);
      if (res.status >= 200 && res.status < 300) {
        const updatedCarts = carts.map((c) =>
          c.id === id ? { ...c, ...updates } : c
        );
        setCarts(updatedCarts);
        setStorage(storageKey, updatedCarts);
        return { success: true };
      }
    } catch (err) {
      setError(err);
      return { success: false, error: err };
    }
  };

  const deleteCart = async (id) => {
    try {
      const res = await api.delete(`${BACKEND_ENDPOINTS.CART}${id}`);
      if (res.status >= 200 && res.status < 300) {
        const updated = carts.filter((c) => c.id !== id);
        setCarts(updated);
        setStorage(storageKey, updated);
        return { success: true };
      }
    } catch (err) {
      setError(err);
      return { success: false, error: err };
    }
  };

  return {
    carts,
    loading,
    error,
    createCart,
    updateCart,
    deleteCart,
  };
}
