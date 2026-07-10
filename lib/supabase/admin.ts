// Cliente Supabase com a Secret key — ignora RLS, só pode rodar no servidor.
// Uso restrito: script de importação em massa (Parte 4) e rotinas administrativas internas.
// NUNCA importar este arquivo em Client Components nem expor a Secret key ao navegador.

import "server-only";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";

export function createAdminClient() {
  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SECRET_KEY!,
    { auth: { persistSession: false } }
  );
}
