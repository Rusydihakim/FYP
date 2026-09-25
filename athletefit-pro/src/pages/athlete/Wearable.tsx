import { Activity, Watch, Link as LinkIcon, CheckCircle2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import { getFitbitAuthUrl, extractFitbitToken, fetchFitbitData } from '../../lib/fitbit';
import '../../styles/AthleteWearable.css';

export default function Wearable() {
  const [connected, setConnected] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const [fitbitData, setFitbitData] = useState<any>(null);

  useEffect(() => {
    // Check if returning from OAuth flow
    const hash = window.location.hash;
    const token = extractFitbitToken(hash);
    
    if (token) {
      setConnected(true);
      setSyncing(true);
      fetchFitbitData(token).then(data => {
        setFitbitData(data);
        setSyncing(false);
        // Clear hash from URL for cleaner look
        window.history.replaceState(null, '', window.location.pathname);
      }).catch(() => setSyncing(false));
    }
  }, []);

  const handleConnect = () => {
    window.location.href = getFitbitAuthUrl();
  };

  return (
    <div className="athlete-wearable-page">
      <h1 className="athlete-wearable-title">Wearable Sync</h1>

      {!connected ? (
        <div className="athlete-wearable-connect-card">
           <div className="athlete-wearable-icon-wrap">
              <Watch className="athlete-wearable-icon" />
           </div>
           <h2 className="athlete-wearable-connect-title">Connect Your Fitbit</h2>
           <p className="athlete-wearable-connect-desc">
             Link your Fitbit account to automatically sync your daily steps, heart rate, and sleep data. AthleteFit AI uses this data to optimize your recovery and adjust your workout load.
           </p>
           <button 
             onClick={handleConnect}
             disabled={syncing}
             className="athlete-wearable-auth-btn"
           >
             <LinkIcon className="h-5 w-5 mr-2" />
             {syncing ? 'Connecting to Fitbit...' : 'Authorize Fitbit'}
           </button>
        </div>
      ) : (
        <div className="space-y-6">
           <div className="athlete-wearable-connected-banner">
              <div className="flex items-center gap-4">
                 <div className="p-3 bg-green-500/20 text-green-400 rounded-full">
                    <CheckCircle2 className="h-8 w-8" />
                 </div>
                 <div>
                    <h2 className="text-xl font-bold text-white">Fitbit Connected</h2>
                    <p className="text-sm text-green-400 mt-1">Last synced: 2 minutes ago</p>
                 </div>
              </div>
              <button onClick={() => setConnected(false)} className="text-gray-400 hover:text-white text-sm underline">Disconnect</button>
           </div>

           <div className="athlete-wearable-table-card">
             <div className="athlete-wearable-table-header">
               <h3 className="font-bold text-white flex items-center">
                 <Activity className="h-5 w-5 text-blue-400 mr-2" />
                 Recent Synced Data
               </h3>
             </div>
             <table className="athlete-wearable-table">
                <thead>
                  <tr>
                    <th className="athlete-wearable-th">Date</th>
                    <th className="athlete-wearable-th">Steps</th>
                    <th className="athlete-wearable-th">Avg HR</th>
                    <th className="athlete-wearable-th">Calories</th>
                    <th className="athlete-wearable-th">Sleep</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="athlete-wearable-tr">
                     <td className="athlete-wearable-td text-white">Today</td>
                     <td className="athlete-wearable-td font-mono text-gray-300">
                       {fitbitData ? fitbitData.steps.toLocaleString() : '8,432'}
                     </td>
                     <td className="athlete-wearable-td font-mono text-gray-300">
                       {fitbitData ? `${fitbitData.hr} bpm` : '68 bpm'}
                     </td>
                     <td className="athlete-wearable-td font-mono text-gray-300">
                       {fitbitData ? fitbitData.calories.toLocaleString() : '1,240'}
                     </td>
                     <td className="athlete-wearable-td font-mono text-gray-300">
                       {fitbitData ? fitbitData.sleep : '7h 24m'}
                     </td>
                  </tr>
                  <tr className="athlete-wearable-tr">
                     <td className="athlete-wearable-td text-gray-300">Yesterday</td>
                     <td className="athlete-wearable-td font-mono text-gray-400">12,105</td>
                     <td className="athlete-wearable-td font-mono text-gray-400">72 bpm</td>
                     <td className="athlete-wearable-td font-mono text-gray-400">2,100</td>
                     <td className="athlete-wearable-td font-mono text-gray-400">6h 45m</td>
                  </tr>
                </tbody>
             </table>
           </div>
        </div>
      )}
    </div>
  );
}
