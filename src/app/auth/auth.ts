import { supabase } from "../lib/supabase";

export async function loginAdmin(
  email: string,
  password: string
): Promise<boolean> {
  const { error } = await supabase.auth.signInWithPassword({
    email: email.trim(),
    password,
  });

  if (error) {
    console.error("Erro ao fazer login:", error.message);
    return false;
  }

  return true;
}

export async function logoutAdmin(): Promise<void> {
  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error("Erro ao fazer logout:", error.message);
    throw error;
  }
}

export async function isAdminAuthenticated(): Promise<boolean> {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  return Boolean(session);
}