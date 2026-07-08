import { useState } from "react";
import { isAdminAuthenticated, loginAdmin, logoutAdmin } from "../auth/auth";

export function useAdminAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(isAdminAuthenticated());

  function login(username: string, password: string): boolean {
    const success = loginAdmin(username, password);

    if (success) {
      setIsAuthenticated(true);
    }

    return success;
  }

  function logout() {
    logoutAdmin();
    setIsAuthenticated(false);
  }

  return {
    isAuthenticated,
    login,
    logout,
  };
}