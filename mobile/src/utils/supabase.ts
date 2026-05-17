import { createClient } from '@supabase/supabase-js';

// Using EXPO_PUBLIC_ prefix since this is an Expo React Native application
const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

export const supabase = createClient(supabaseUrl!, supabaseKey!);
