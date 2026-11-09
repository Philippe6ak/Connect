// src/lib/supabaseClient.js
// The ONE Supabase client of the app. Import { supabase } from here everywhere.
// Never create a second client, and never put the secret / service_role key in the frontend.
import { createClient } from "@supabase/supabase-js";

const url = import.meta.env.VITE_SUPABASE_URL;
const key = import.meta.env.VITE_SUPABASE_KEY;

if (!url || !key) {
  throw new Error(
    "Missing VITE_SUPABASE_URL or VITE_SUPABASE_KEY. Check .env.local, then restart `npm run dev`.",
  );
}

// Defaults are what we want: the session is stored in the browser, refreshed automatically,
// and read from the URL when the user clicks an email link (confirmation, password reset).
export const supabase = createClient(url, key);
