import '../../styles/AdminSettings.css';

export default function Settings() {
  return (
    <div className="admin-settings-page">
      <h1 className="admin-settings-title">System Settings</h1>

      <div className="admin-settings-card">
        <div className="admin-settings-header">
           <h2 className="admin-settings-card-title">API Integrations</h2>
           <p className="admin-settings-card-subtitle">Configure third-party API keys and limits.</p>
        </div>
        <div className="admin-settings-body">
           <div>
              <label className="admin-settings-field-label">OpenAI API Key (Plan Generator)</label>
              <input 
                type="password" 
                defaultValue="sk-................................" 
                className="admin-settings-input" 
              />
              <p className="admin-settings-hint">Used for AI workout generation.</p>
           </div>
           
           <div>
              <label className="admin-settings-field-label">ExerciseDB API Key</label>
              <input 
                type="password" 
                defaultValue="xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx" 
                className="admin-settings-input" 
              />
           </div>
        </div>
        <div className="admin-settings-footer">
           <button className="admin-settings-save-btn">
             Save Changes
           </button>
        </div>
      </div>

      <div className="admin-settings-card mt-6">
        <div className="admin-settings-header">
           <h2 className="admin-settings-card-title">Global Platform Settings</h2>
           <p className="admin-settings-card-subtitle">Manage rules for all users.</p>
        </div>
        <div className="admin-settings-checkbox-list">
           <label className="admin-settings-checkbox-item">
              <input type="checkbox" defaultChecked className="admin-settings-checkbox" />
              <span className="text-white">Require email verification for new accounts</span>
           </label>
           <label className="admin-settings-checkbox-item">
              <input type="checkbox" defaultChecked className="admin-settings-checkbox" />
              <span className="text-white">Allow coaches to invite athletes directly</span>
           </label>
           <label className="admin-settings-checkbox-item">
              <input type="checkbox" className="admin-settings-checkbox" />
              <span className="text-white">Maintenance Mode (disable non-admin logins)</span>
           </label>
        </div>
      </div>
    </div>
  );
}
