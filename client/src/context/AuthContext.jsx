import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Check if user is logged in on app start
  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setLoading(false);
        return;
      }

      const response = await fetch("http://localhost:5000/api/auth/me", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const userData = await response.json();
        setUser(userData.user);
      } else {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      }
    } catch (error) {
      console.error("Auth check failed:", error);
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    } finally {
      setLoading(false);
    }
  };

  const signup = async (userData) => {
    try {
      setError(null);
      console.log("Attempting signup with data:", userData);

      const response = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      console.log("Signup response status:", response.status);
      const data = await response.json();
      console.log("Signup response data:", data);

      if (!response.ok) {
        throw new Error(data.message || "Signup failed");
      }

      // The server returns data in a nested structure: { success: true, data: { user, token } }
      localStorage.setItem("token", data.data.token);
      localStorage.setItem("user", JSON.stringify(data.data.user));
      setUser(data.data.user);
      console.log("Signup successful, user set:", data.data.user);
      return { success: true };
    } catch (error) {
      console.error("Signup error:", error);
      setError(error.message);
      return { success: false, error: error.message };
    }
  };

  const signin = async (credentials) => {
    try {
      setError(null);
      const response = await fetch("http://localhost:5000/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Signin failed");
      }

      localStorage.setItem("token", data.data.token);
      localStorage.setItem("user", JSON.stringify(data.data.user));
      setUser(data.data.user);
      return { success: true };
    } catch (error) {
      setError(error.message);
      return { success: false, error: error.message };
    }
  };

  const signout = async () => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        // Try to call the server signout endpoint
        try {
          await fetch("http://localhost:5000/api/auth/signout", {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
        } catch (networkError) {
          console.warn(
            "Server signout failed, but continuing with local cleanup:",
            networkError
          );
          // Continue with local cleanup even if server call fails
        }
      }
    } catch (error) {
      console.error("Signout error:", error);
      // Continue with local cleanup even if there's an error
    } finally {
      // Always clean up local storage and state
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setUser(null);
      setError(null);
    }
  };

  const value = {
    user,
    loading,
    error,
    signup,
    signin,
    signout,
    isAuthenticated: !!user,
    isAdmin: user?.role === "admin",
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
