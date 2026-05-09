import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://cmlrzckaamxuhjlfvcyb.supabase.co";

// Pega aquí la clave gigante que empieza por eyJ...
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNtbHJ6Y2thYW14dWhqbGZ2Y3liIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgwOTcwMjAsImV4cCI6MjA5MzY3MzAyMH0.CsaAF_bORWiCKEmLYrjjn4e1XlK4hVtlObKqwQ9bN_U";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
