import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://qobhbnbbqnzbsnacbfxm.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFvYmhibmJicW56YnNuYWNiZnhtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzMyNjU2MTgsImV4cCI6MjA4ODg0MTYxOH0.hmRyy6OsGZRfx9B5KZsuN45mokd6FOflq4zNhbc0JVc';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
