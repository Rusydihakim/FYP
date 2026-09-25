import { useAuth } from '../../hooks/useAuth';
import { Bell, Search, Zap, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import '../../styles/Topbar.css';

export function Topbar() {
  const { profile } = useAuth();
  const role = (profile?.role || 'Athlete').toLowerCase();

  return (
    <header className="topbar-header">
      {/* Left Breadcrumb */}
      <div className="topbar-breadcrumb">
        <div className="topbar-breadcrumb-icon-wrap">
          <Zap className="topbar-breadcrumb-icon" />
        </div>
        <span className="topbar-breadcrumb-text">Platform</span>
        <span className="topbar-breadcrumb-separator">›</span>
        <span className="topbar-breadcrumb-active">Pro Telemetry</span>
      </div>

      {/* Center Search Input */}
      <div className="topbar-search-container">
        <div className="topbar-search-wrapper">
          <Search className="topbar-search-icon" />
          <input
            type="text"
            placeholder="Search telemetry, sets, drills..."
            className="topbar-search-input"
          />
        </div>
      </div>

      {/* Right Action Icons & Profile */}
      <div className="topbar-actions">
        {/* Live Synced Indicator */}
        <div className="topbar-status-badge">
          <span className="topbar-status-pulse" />
          <span>SYNCED</span>
        </div>

        {/* Notifications */}
        <button className="topbar-icon-button">
          <Bell className="topbar-icon" />
          <span className="topbar-badge-dot" />
        </button>

        {/* Primary Action Button */}
        <Link
          to={role === 'coach' ? '/coach/assign' : '/dashboard/workouts'}
          className="topbar-cta-btn"
        >
          <Plus className="topbar-cta-icon" />
          <span>{role === 'coach' ? 'Assign Workout' : 'Start Session'}</span>
        </Link>

        {/* User Avatar */}
        <div className="topbar-avatar-border">
          <div className="topbar-avatar-inner">
            {profile?.full_name?.charAt(0) || (role === 'coach' ? 'M' : 'A')}
          </div>
        </div>
      </div>
    </header>
  );
}
