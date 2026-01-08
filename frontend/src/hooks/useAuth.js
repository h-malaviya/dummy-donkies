import { useState,useEffect } from "react";
import api from "../services/axios";
import { setStorage, getStorage } from "../shared/utils/storage";
import { BACKEND_ENDPOINTS } from "../app/appConfig";

export default function useAuth() {
  const [user, setUser] = useState(getStorage("authUser"));
  const [token, setToken] = useState(getStorage("token"));
  const [error, setError] = useState(null);
  useEffect(() => {
    const local = getStorage("users");
    if (local) {
      setUser(local);
    } else {
      api
        .get(BACKEND_ENDPOINTS.USERS)
        .then((res) => {
          setUser(res.data);
          setStorage("users", res.data);
        })
        .catch((err) => setError(err));
    }
  }, []);
  const login = async (username, password, roleFromUI) => {
    try {
      const res = await api.post(BACKEND_ENDPOINTS.LOGIN, {
        username,
        password,
      });
      
      if (res.status == 201) {
        
        const users = getStorage("users") || [];
        const matchedUser = users.find(u => u.username == username);
        console.log("matched : ",matchedUser);
        
        if (!matchedUser) {
          throw new Error("User not found in local storage");
        }
        const authUser = {
          id: matchedUser.id,
          username: matchedUser.username,
          role:roleFromUI,
        };
        setStorage("userRole", authUser.role);
        console.log(authUser);
        
        setStorage("token", res.data.token);
        setStorage("authUser", authUser);
        setToken(res.data.token);
        setUser(authUser);
        setError(null);
        return { success: true, roleFromUI };
      }
    } catch (err) {
      const users = getStorage("users") || [];
      const matchedUser = users.find(
        u => u.username === username && u.password === password
      );

      if (matchedUser) {
        const mockToken = "local-session-" + btoa(username);

        const authUser = {
          id: matchedUser.id,
          username: matchedUser.username,
          role: roleFromUI,
        };
        
        setStorage("userRole", authUser.role);
        setStorage("token", mockToken);
        setStorage("authUser", authUser);
     

        setToken(mockToken);
        setUser(authUser);
        setError(null);

        return { success: true, role: authUser.role };
      }

      setError("Invalid credentials");
      return { success: false };
    }
  };

  

  return { user, token, error, login };
}
