import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const currentContext = createContext();

const CurrentProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const getCurrentUser = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/v1/current`, {
        withCredentials: true,
      });

      if (res.data.success && res.data.user) {
        setUser(res.data.user);
        localStorage.setItem("user", JSON.stringify(res.data.user));
      } else {
        setUser(null);
        localStorage.removeItem("user");
      }
    } catch (error) {
      console.error("getCurrentUser error:", error);
      setUser(null);
      localStorage.removeItem("user");
    }
  };

  // ⭐ FIXED: Add logout function
  const logout = async () => {
    try {
      await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/v1/logout`, {
        withCredentials: true,
      });

      setUser(null);
      localStorage.removeItem("user");
    } catch (error) {
      console.log("Logout Error:", error);
    }
  };

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  useEffect(() => {
    if (!user) {
      getCurrentUser();
    }
  }, []);

  return (
    <currentContext.Provider
      value={{ user, setUser, getCurrentUser, logout }}
    >
      {children}
    </currentContext.Provider>
  );
};

export default CurrentProvider;
