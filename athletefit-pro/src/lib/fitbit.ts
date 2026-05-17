// src/lib/fitbit.ts

const FITBIT_CLIENT_ID = import.meta.env.VITE_FITBIT_CLIENT_ID || 'mock_client_id';
const REDIRECT_URI = 'http://localhost:5173/dashboard/wearable';
const SCOPES = 'activity heartrate sleep profile';

export function getFitbitAuthUrl() {
  return `https://www.fitbit.com/oauth2/authorize?response_type=token&client_id=${FITBIT_CLIENT_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&scope=${encodeURIComponent(SCOPES)}&expires_in=604800`;
}

// Function to extract token from URL hash after redirect
export function extractFitbitToken(hash: string) {
  if (!hash) return null;
  const params = new URLSearchParams(hash.substring(1));
  return params.get('access_token');
}

// Function to fetch today's data from Fitbit using token
export async function fetchFitbitData(token: string) {
  const headers = { Authorization: `Bearer ${token}` };
  
  try {
    // These are mocked responses for now if real calls fail without valid token
    const endpoints = {
      profile: 'https://api.fitbit.com/1/user/-/profile.json',
      steps: 'https://api.fitbit.com/1/user/-/activities/date/today.json',
      hr: 'https://api.fitbit.com/1/user/-/activities/heart/date/today/1d.json'
    };

    // Note: To make real calls, uncomment these and handle CORS/fetch
    /*
    const [profile, activities, heart] = await Promise.all([
      fetch(endpoints.profile, { headers }).then(res => res.json()),
      fetch(endpoints.steps, { headers }).then(res => res.json()),
      fetch(endpoints.hr, { headers }).then(res => res.json())
    ]);
    */

    return {
       steps: 8432,
       calories: 1240,
       hr: 68,
       sleep: '7h 24m'
    };
  } catch (err) {
    console.error('Fitbit fetch failed', err);
    throw err;
  }
}
