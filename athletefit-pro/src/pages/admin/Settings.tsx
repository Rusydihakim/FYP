export default function Settings() {
  return (
    <div className="space-y-6 text-text max-w-4xl">
      <h1 className="text-3xl font-display font-bold">System Settings</h1>

      <div className="bg-surface2 rounded-xl border border-border overflow-hidden">
        <div className="p-6 border-b border-border">
           <h2 className="text-xl font-bold font-display text-white mb-1">API Integrations</h2>
           <p className="text-sm text-gray-400">Configure third-party API keys and limits.</p>
        </div>
        <div className="p-6 space-y-6">
           <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">OpenAI API Key (Plan Generator)</label>
              <input 
                type="password" 
                defaultValue="sk-................................" 
                className="w-full bg-surface border border-border rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500" 
              />
              <p className="text-xs text-gray-500 mt-1">Used for AI workout generation.</p>
           </div>
           
           <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">ExerciseDB API Key</label>
              <input 
                type="password" 
                defaultValue="xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx" 
                className="w-full bg-surface border border-border rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500" 
              />
           </div>
        </div>
        <div className="p-4 bg-surface border-t border-border flex justify-end">
           <button className="bg-blue-600 hover:bg-blue-500 text-white font-semibold px-4 py-2 rounded-lg transition">
             Save Changes
           </button>
        </div>
      </div>

      <div className="bg-surface2 rounded-xl border border-border overflow-hidden mt-6">
        <div className="p-6 border-b border-border">
           <h2 className="text-xl font-bold font-display text-white mb-1">Global Platform Settings</h2>
           <p className="text-sm text-gray-400">Manage rules for all users.</p>
        </div>
        <div className="p-6 space-y-4">
           <label className="flex items-center space-x-3 cursor-pointer">
              <input type="checkbox" defaultChecked className="form-checkbox h-5 w-5 text-blue-500 rounded border-border bg-surface" />
              <span className="text-white">Require email verification for new accounts</span>
           </label>
           <label className="flex items-center space-x-3 cursor-pointer">
              <input type="checkbox" defaultChecked className="form-checkbox h-5 w-5 text-blue-500 rounded border-border bg-surface" />
              <span className="text-white">Allow coaches to invite athletes directly</span>
           </label>
           <label className="flex items-center space-x-3 cursor-pointer">
              <input type="checkbox" className="form-checkbox h-5 w-5 text-blue-500 rounded border-border bg-surface" />
              <span className="text-white">Maintenance Mode (disable non-admin logins)</span>
           </label>
        </div>
      </div>
    </div>
  );
}
