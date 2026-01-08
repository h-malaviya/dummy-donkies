import { useState, useEffect } from "react";
import api from "../services/axios";
import { getStorage, setStorage } from "../shared/utils/storage";
import { generateId } from "../shared/utils/generateId";
import { BACKEND_ENDPOINTS } from "../app/appConfig";
export default function useUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const local = getStorage("users");
    if (local) {
      setUsers(local);
    } else {
      api
        .get(BACKEND_ENDPOINTS.USERS)
        .then((res) => {
          setUsers(res.data);
          setStorage("users", res.data);
        })
        .catch((err) => setError(err));
    }
  }, []);

  const signup = async (userData) => {
    try {
      const res = await api.post(BACKEND_ENDPOINTS.USERS, userData);

      if (res.status == 201) {
        const newUser = {
          ...userData,
          id: generateId(),
        };

        const updated = [newUser, ...users];
        setUsers(updated);
        setStorage("users", updated);

        return { success: true, user: newUser };
      }
    } catch (err) {
      setError(err);
      return { success: false, error: err };
    }
  };

  const updateUser = async (id, updatedData) => {
    try {
      const res = await api.put(`${BACKEND_ENDPOINTS.USER}${id}`, updatedData);

      if (res.status === 200) {
        const updatedUsers = users.map((u) =>
          u.id === id ? { ...u, ...updatedData } : u
        );

        setUsers(updatedUsers);
        setStorage("users", updatedUsers);

        return { success: true };
      }
    } catch (err) {
      setError(err);
      return { success: false, error: err };
    }
  };

  const deleteUser = async (id) => {
    try {
      const res = await api.delete(`${BACKEND_ENDPOINTS.USER}${id}`);

      if (res.status === 200) {
        const updatedUsers = users.filter((u) => u.id !== id);

        setUsers(updatedUsers);
        setStorage("users", updatedUsers);

        return { success: true };
      }
    } catch (err) {
      setError(err);
      return { success: false, error: err };
    }
  };
  const getUser = async (id)=>{
    try {
      const res = api.get(`${BACKEND_ENDPOINTS.USER}${id}`)
      return {
        success :true,res
      }
      
    } catch (err) {
      return { success: false, error: err };
    }
  }

  return {
    users,
    loading,
    error,
    signup,
    updateUser,
    deleteUser,
    getUser
  };
}