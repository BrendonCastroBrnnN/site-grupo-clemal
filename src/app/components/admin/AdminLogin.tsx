import { LockKeyhole } from "lucide-react";
import { useState } from "react";

interface AdminLoginProps {
  onLogin: (username: string, password: string) => boolean;
}

export function AdminLogin({ onLogin }: AdminLoginProps) {
  const [username, setUsername] = useState("admin");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const success = onLogin(username, password);

    if (!success) {
      setError("Usuário ou senha inválidos.");
      return;
    }

    setError("");
  }

  return (
    <main className="min-h-screen bg-[#f6f6f6] flex items-center justify-center px-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white rounded-3xl border border-gray-100 p-8"
        style={{ fontFamily: "'Inter', sans-serif" }}
      >
        <div className="w-14 h-14 rounded-2xl bg-[#111111] flex items-center justify-center mb-6">
          <LockKeyhole className="w-7 h-7 text-white" />
        </div>

        <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#dc2626] mb-3">
          Acesso restrito
        </p>

        <h1
          className="text-[#111111] mb-3"
          style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontSize: 42,
            fontWeight: 900,
            lineHeight: 0.95,
            letterSpacing: "-0.04em",
          }}
        >
          Painel Administrativo
        </h1>

        <p className="text-sm text-gray-500 leading-relaxed mb-6">
          Entre com suas credenciais para gerenciar produtos, categorias e informações do catálogo.
        </p>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Usuário
            </label>
            <input
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#dc2626]"
              autoComplete="username"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Senha
            </label>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#dc2626]"
              autoComplete="current-password"
            />
          </div>

          {error && (
            <div className="rounded-xl bg-red-50 border border-red-100 px-4 py-3 text-sm text-red-600">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="w-full rounded-xl bg-[#111111] text-white font-bold py-4 hover:bg-[#262626] transition-colors"
          >
            Entrar
          </button>
        </div>
      </form>
    </main>
  );
}