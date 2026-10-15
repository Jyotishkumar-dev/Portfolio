import { createClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Null when the env vars are missing, so the site still works without a backend.
export const supabase = url && anonKey ? createClient(url, anonKey) : null
