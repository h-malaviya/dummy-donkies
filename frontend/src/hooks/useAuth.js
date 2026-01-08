import { useState } from "react";
import api from "../services/axios";
import { setStorage, getStorage } from "../shared/utils/storage";
import { BACKEND_ENDPOINTS } from "../app/appConfig";

export default function useAuth() {
  const [user, setUser] = useState(getStorage("authUser") || null);
  const [token, setToken] = useState(getStorage("token") || null);
  const [error, setError] = useState(null);

  const login = async (username, password, roleFromUI) => {
    try {
      const res = await api.post(BACKEND_ENDPOINTS.LOGIN, {
        username,
        password,
      });

      if (res.status === 201) {
        const role = res.data.role || roleFromUI || "user";

        setStorage("token", res.data.token);
        setStorage("authUser", { username });
        setStorage("userRole", role);

        setToken(res.data.token);
        setUser({ username });
        setError(null);

        return { success: true, role };
      }
    } catch (err) {
      const localUsers = getStorage("users") || [];

      const matchedUser = localUsers.find(
        (u) => u.username === username && u.password === password
      );

      if (matchedUser) {
        const mockToken = "local-session-" + btoa(username);

        setStorage("token", mockToken);
        setStorage("authUser", { username });
        setStorage("userRole", matchedUser.role);

        setToken(mockToken);
        setUser({ username });
        setError(null);

        return { success: true, role: matchedUser.role };
      }

      setError("Invalid credentials");
      return { success: false };
    }
  };

  

  return { user, token, error, login };
}
