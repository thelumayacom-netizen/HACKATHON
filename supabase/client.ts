import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://icjqyoujbxffmungelbm.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImljanF5b3VqYnhmZm11bmdlbGJtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTcxNTY0ODAsImV4cCI6MjA3MjczMjQ4MH0.2r3tWjukqKb1z3UjGXs0ndlSB6PEm95rEbJcDKgTaBc'


if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)