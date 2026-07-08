const ADMIN_AUTH_KEY = "grupo-clemal-admin-auth";

const TEMP_ADMIN_USER = "admin";
const TEMP_ADMIN_PASSWORD = "GrupoClemal@2026";

export function loginAdmin(username: string, password: string): boolean {
  const isValid =
    username.trim() === TEMP_ADMIN_USER &&
    password === TEMP_ADMIN_PASSWORD;

  if (!isValid) return false;

  localStorage.setItem(ADMIN_AUTH_KEY, "true");
  return true;
}

export function logoutAdmin(): void {
  localStorage.removeItem(ADMIN_AUTH_KEY);
}

export function isAdminAuthenticated(): boolean {
  return localStorage.getItem(ADMIN_AUTH_KEY) === "true";
}