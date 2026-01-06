import { useState } from "react";
import api from "../services/axios";
import { setStorage, getStorage } from "../shared/utils/storage";
import { BACKEND_ENDPOINTS } from "../app/appConfig";
export default function useAuth() {
  const [user, setUser] = useState(getStorage("authUser") || null);
  const [token, setToken] = useState(getStorage("token") || null);
  const [error, setError] = useState(null);

  const login = async (username, password) => {
    try {
      const res = await api.post(BACKEND_ENDPOINTS.LOGIN, { username, password });

      if (res.status >= 200 && res.status < 300) {
        setStorage("token", res.data.token);
        setStorage("authUser", { username });

        setToken(res.data.token);
        setUser({ username });
        setError(null);

        return { success: true };
      }
    } catch (err) {
      setError(err);
      return { success: false, error: err };
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("authUser");
    setToken(null);
    setUser(null);
  };

  return { user, token, error, login, logout };
}
