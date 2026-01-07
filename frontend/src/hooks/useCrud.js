import { useEffect, useState } from "react";
import api from "../services/axios";
import { getStorage, setStorage } from "../shared/utils/storage";
import { generateId } from "../utils/generateId";
export default function useCrud(resourceKey, endpoint) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const localData = getStorage(resourceKey);

    if (localData && Array.isArray(localData)) {
      setData(localData);
      setLoading(false);
    } else {
      api
        .get(endpoint)
        .then((res) => {
          if (res.status === 200) {
            setData(res.data);
            setStorage(resourceKey, res.data);
          }
        })
        .catch((err) => setError(err))
        .finally(() => setLoading(false));
    }
  }, [endpoint, resourceKey]);

  

  // CREATE
  const createItem = async (payload) => {
    try {
      const res = await api.post(endpoint, payload);

      if (res.status === 201 || res.status === 200) {
        const newItem = {
          ...payload,
          id: res.data?.id ?? generateId(), // fallback
        };

        const updated = [newItem, ...data];
        setData(updated);
        setStorage(resourceKey, updated);

        return { success: true, data: newItem };
      }
    } catch (err) {
      setError(err);
      return { success: false, error: err };
    }
  };

  // UPDATE
  const updateItem = async (id, updates) => {
    try {
      const res = await api.put(`${endpoint}/${id}`, updates);

      if (res.status === 200) {
        const updated = data.map((item) =>
          item.id === id ? { ...item, ...updates } : item
        );

        setData(updated);
        setStorage(resourceKey, updated);

        return { success: true };
      }
    } catch (err) {
      setError(err);
      return { success: false, error: err };
    }
  };

  // DELETE
  const deleteItem = async (id) => {
    try {
      const res = await api.delete(`${endpoint}/${id}`);

      if (res.status === 200) {
        const updated = data.filter((item) => item.id !== id);

        setData(updated);
        setStorage(resourceKey, updated);

        return { success: true };
      }
    } catch (err) {
      setError(err);
      return { success: false, error: err };
    }
  };

  return {
    data,
    loading,
    error,
    createItem,
    updateItem,
    deleteItem,
  };
}
