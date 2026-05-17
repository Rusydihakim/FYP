import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_PUBLISHABLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing Supabase URL or Key in .env");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function testConnection() {
  console.log("Testing connection to Supabase...");
  console.log("URL:", supabaseUrl);
  
  try {
    const { data, error } = await supabase.from('users').select('*').limit(1);
    
    if (error) {
      console.error("Error querying 'users' table:", error.message);
    } else {
      console.log("Success! Connected to Supabase and queried 'users' table.");
      console.log("Data returned:", data);
    }
  } catch (err) {
    console.error("Connection failed:", err);
  }
}

testConnection();
