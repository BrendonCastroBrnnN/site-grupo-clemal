/// <reference types="node" />

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;
const cronSecret = process.env.CRON_SECRET;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Variáveis do Supabase não configuradas.");
}

const supabase = createClient(
  supabaseUrl,
  supabaseAnonKey,
  {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false,
    },
  }
);

export default {
  async fetch(request: Request) {
    const authorization = request.headers.get("authorization");

    if (
      !cronSecret ||
      authorization !== `Bearer ${cronSecret}`
    ) {
      return Response.json(
        {
          ok: false,
          error: "Unauthorized",
        },
        {
          status: 401,
        }
      );
    }

    const { error } = await supabase
      .from("categories")
      .select("id")
      .limit(1);

    if (error) {
      console.error(
        "Erro no keep-alive do Supabase:",
        error
      );

      return Response.json(
        {
          ok: false,
          error: error.message,
        },
        {
          status: 500,
        }
      );
    }

    return Response.json({
      ok: true,
      message: "Supabase keep-alive executado com sucesso.",
      timestamp: new Date().toISOString(),
    });
  },
};