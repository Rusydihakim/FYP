import { Activity, Watch, Link as LinkIcon, CheckCircle2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import { getFitbitAuthUrl, extractFitbitToken, fetchFitbitData } from '../../lib/fitbit';


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
    <div className="space-y-6 text-text max-w-4xl mx-auto">
      <h1 className="text-3xl font-display font-bold">Wearable Sync</h1>

      {!connected ? (
        <div className="bg-surface2 border border-border p-8 rounded-xl text-center">
           <div className="mx-auto w-20 h-20 bg-blue-900/30 rounded-full flex items-center justify-center mb-6">
              <Watch className="h-10 w-10 text-blue-400" />
           </div>
           <h2 className="text-2xl font-bold text-white mb-2 font-display">Connect Your Fitbit</h2>
           <p className="text-gray-400 max-w-md mx-auto mb-8">
             Link your Fitbit account to automatically sync your daily steps, heart rate, and sleep data. AthleteFit AI uses this data to optimize your recovery and adjust your workout load.
           </p>
           <button 
             onClick={handleConnect}
             disabled={syncing}
             className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 px-6 rounded-lg inline-flex items-center transition disabled:opacity-50"
           >
             <LinkIcon className="h-5 w-5 mr-2" />
             {syncing ? 'Connecting to Fitbit...' : 'Authorize Fitbit'}
           </button>
        </div>
      ) : (
        <div className="space-y-6">
           <div className="bg-green-900/20 border border-green-500 p-6 rounded-xl flex items-center justify-between">
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

           <div className="bg-surface2 border border-border rounded-xl overflow-hidden">
             <div className="p-4 bg-surface border-b border-border">
               <h3 className="font-bold text-white flex items-center">
                 <Activity className="h-5 w-5 text-blue-400 mr-2" />
                 Recent Synced Data
               </h3>
             </div>
             <table className="min-w-full divide-y divide-border">
                <thead className="bg-surface2">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Steps</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Avg HR</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Calories</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Sleep</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border bg-surface">
                  <tr className="hover:bg-surface2">
                     <td className="px-6 py-4 whitespace-nowrap text-white">Today</td>
                     <td className="px-6 py-4 whitespace-nowrap font-mono text-gray-300">
                       {fitbitData ? fitbitData.steps.toLocaleString() : '8,432'}
                     </td>
                     <td className="px-6 py-4 whitespace-nowrap font-mono text-gray-300">
                       {fitbitData ? `${fitbitData.hr} bpm` : '68 bpm'}
                     </td>
                     <td className="px-6 py-4 whitespace-nowrap font-mono text-gray-300">
                       {fitbitData ? fitbitData.calories.toLocaleString() : '1,240'}
                     </td>
                     <td className="px-6 py-4 whitespace-nowrap font-mono text-gray-300">
                       {fitbitData ? fitbitData.sleep : '7h 24m'}
                     </td>
                  </tr>
                  <tr className="hover:bg-surface2">
                     <td className="px-6 py-4 whitespace-nowrap text-gray-300">Yesterday</td>
                     <td className="px-6 py-4 whitespace-nowrap font-mono text-gray-400">12,105</td>
                     <td className="px-6 py-4 whitespace-nowrap font-mono text-gray-400">72 bpm</td>
                     <td className="px-6 py-4 whitespace-nowrap font-mono text-gray-400">2,100</td>
                     <td className="px-6 py-4 whitespace-nowrap font-mono text-gray-400">6h 45m</td>
                  </tr>
                </tbody>
             </table>
           </div>
        </div>
      )}
    </div>
  );
}
