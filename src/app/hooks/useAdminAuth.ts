import { useEffect, useState } from "react";
import {
  isAdminAuthenticated,
  loginAdmin,
  logoutAdmin,
} from "../auth/auth";
import { supabase } from "../lib/supabase";

export function useAdminAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoadingAuth, setIsLoadingAuth] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function checkSession() {
      try {
        const authenticated = await isAdminAuthenticated();

        if (isMounted) {
          setIsAuthenticated(authenticated);
        }
      } catch (error) {
        console.error("Erro ao verificar sessão:", error);

        if (isMounted) {
          setIsAuthenticated(false);
        }
      } finally {
        if (isMounted) {
          setIsLoadingAuth(false);
        }
      }
    }

    checkSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!isMounted) return;

      setIsAuthenticated(Boolean(session));
      setIsLoadingAuth(false);
    });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, []);

  async function login(email: string, password: string): Promise<boolean> {
    const success = await loginAdmin(email, password);

    if (success) {
      setIsAuthenticated(true);
    }

    return success;
  }

  async function logout(): Promise<void> {
    try {
      await logoutAdmin();
    } finally {
      setIsAuthenticated(false);
    }
  }

  return {
    isAuthenticated,
    isLoadingAuth,
    login,
    logout,
  };
}