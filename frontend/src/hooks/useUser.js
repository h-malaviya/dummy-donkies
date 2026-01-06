import { useState, useEffect } from "react";
import api from "../services/axios";
import { getStorage, setStorage } from "../shared/utils/storage";
import { generateId } from "../shared/utils/generateId";
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
        .get("/users")
        .then((res) => {
          setUsers(res.data);
          setStorage("users", res.data);
        })
        .catch((err) => setError(err));
    }
  }, []);

  const signup = async (userData) => {
    try {
      const res = await api.post("/users", userData);

      if (res.status >= 200 && res.status < 300) {
        const newUser = {
          ...userData,
          id: res.data?.id ?? generateId(), 
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

  return { users, loading, error, signup };
}
