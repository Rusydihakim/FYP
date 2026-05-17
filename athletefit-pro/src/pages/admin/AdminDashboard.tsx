import { Users, ShieldCheck, Database, Server } from 'lucide-react';

export default function AdminDashboard() {
  return (
    <div className="space-y-6 text-text">
      <div className="flex justify-between items-center bg-surface2 p-6 rounded-xl border border-border">
        <div>
          <h1 className="text-3xl font-display font-bold">Admin Dashboard</h1>
          <p className="text-gray-400 mt-2">Platform Overview & System Status</p>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-surface2 p-6 rounded-xl border border-border">
          <div className="flex justify-between items-start">
             <div>
                <p className="text-sm text-gray-400 font-medium">Total Users</p>
                <p className="text-2xl font-mono font-bold mt-2 text-white">1,248</p>
             </div>
             <div className="p-2 bg-blue-500/10 text-blue-400 rounded-lg"><Users className="h-5 w-5" /></div>
          </div>
        </div>
        <div className="bg-surface2 p-6 rounded-xl border border-border">
          <div className="flex justify-between items-start">
             <div>
                <p className="text-sm text-gray-400 font-medium">Active Coaches</p>
                <p className="text-2xl font-mono font-bold mt-2 text-white">45</p>
             </div>
             <div className="p-2 bg-green-500/10 text-green-400 rounded-lg"><ShieldCheck className="h-5 w-5" /></div>
          </div>
        </div>
        <div className="bg-surface2 p-6 rounded-xl border border-border">
          <div className="flex justify-between items-start">
             <div>
                <p className="text-sm text-gray-400 font-medium">Database Load</p>
                <p className="text-2xl font-mono font-bold mt-2 text-white">14<span className="text-sm text-gray-500">%</span></p>
             </div>
             <div className="p-2 bg-purple-500/10 text-purple-400 rounded-lg"><Database className="h-5 w-5" /></div>
          </div>
        </div>
        <div className="bg-surface2 p-6 rounded-xl border border-border">
          <div className="flex justify-between items-start">
             <div>
                <p className="text-sm text-gray-400 font-medium">API Health</p>
                <p className="text-2xl font-mono font-bold mt-2 text-green-400">99.9<span className="text-sm text-gray-500">%</span></p>
             </div>
             <div className="p-2 bg-green-500/10 text-green-400 rounded-lg"><Server className="h-5 w-5" /></div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
         <div className="bg-surface2 border border-border rounded-xl p-6">
           <h2 className="text-lg font-bold font-display mb-4">Recent Registrations</h2>
           <div className="space-y-4">
             {['David Johnson', 'Emma Wilson', 'Michael Brown'].map((name, i) => (
                <div key={i} className="flex justify-between items-center p-3 bg-surface rounded-lg border border-border">
                   <div>
                      <p className="font-semibold text-white">{name}</p>
                      <p className="text-xs text-gray-400">Registered {i + 1} hours ago</p>
                   </div>
                   <span className="text-xs bg-blue-900/30 text-blue-400 px-2 py-1 rounded-full uppercase font-bold">Athlete</span>
                </div>
             ))}
           </div>
         </div>

         <div className="bg-surface2 border border-border rounded-xl p-6">
           <h2 className="text-lg font-bold font-display mb-4">System Alerts</h2>
           <div className="space-y-4">
             <div className="flex items-start p-3 bg-warning/10 border border-warning/30 rounded-lg">
                <ShieldCheck className="h-5 w-5 text-warning mr-3 shrink-0" />
                <div>
                   <p className="font-semibold text-warning">Pending Coach Approvals</p>
                   <p className="text-sm text-gray-400">3 new coach accounts are awaiting verification.</p>
                </div>
             </div>
             <div className="flex items-start p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
                <Database className="h-5 w-5 text-green-400 mr-3 shrink-0" />
                <div>
                   <p className="font-semibold text-green-400">Database Backup Complete</p>
                   <p className="text-sm text-gray-400">Automated backup finished at 04:00 AM UTC.</p>
                </div>
             </div>
           </div>
         </div>
      </div>
    </div>
  );
}
