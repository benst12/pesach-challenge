import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://tpihhrlgyijmneaomwlf.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRwaWhocmxneWlqbW5lYW9td2xmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI2NDU3NTgsImV4cCI6MjA4ODIyMTc1OH0.PGrUIAMjgUIG3CbrmpQLQEnXq9Gsbv9K0DxqLm269oQ';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
