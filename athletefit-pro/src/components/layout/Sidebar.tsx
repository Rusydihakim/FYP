import { NavLink } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { 
  LayoutDashboard, 
  Dumbbell, 
  Sparkles, 
  Activity, 
  Watch, 
  User, 
  Settings, 
  LogOut, 
  Zap, 
  Users, 
  FileText, 
  PlusSquare, 
  MessageSquare
} from 'lucide-react';
import '../../styles/Sidebar.css';

export function Sidebar() {
  const { profile, signOut } = useAuth();
  const role = (profile?.role || 'Athlete').toLowerCase();

  const menuItems = {
    coach: [
      { name: 'Overview', icon: LayoutDashboard, path: '/coach' },
      { name: 'My Athletes', icon: Users, path: '/coach/athletes' },
      { name: 'Workout Plans', icon: FileText, path: '/coach/plans' },
      { name: 'Assign Workouts', icon: PlusSquare, path: '/coach/assign' },
      { name: 'AI Coach Studio', icon: Sparkles, path: '/coach/progress' },
      { name: 'Analytics', icon: Activity, path: '/coach/reports' },
      { name: 'Messages', icon: MessageSquare, path: '/coach/messages' },
      { name: 'Settings', icon: Settings, path: '/coach/settings' },
    ],
    athlete: [
      { name: 'Overview', icon: LayoutDashboard, path: '/dashboard' },
      { name: 'Workouts', icon: Dumbbell, path: '/dashboard/workouts' },
      { name: 'AI Coach Studio', icon: Sparkles, path: '/dashboard/analytics' },
      { name: 'Analytics', icon: Activity, path: '/dashboard/analytics' },
      { name: 'Devices', icon: Watch, path: '/dashboard/wearable' },
      { name: 'Profile', icon: User, path: '/dashboard/messages' },
      { name: 'Settings', icon: Settings, path: '/dashboard/settings' },
    ],
    admin: [
      { name: 'Overview', icon: LayoutDashboard, path: '/admin' },
      { name: 'Manage Users', icon: Users, path: '/admin/users' },
      { name: 'System Settings', icon: Settings, path: '/admin/settings' },
    ]
  };

  const links = menuItems[role as keyof typeof menuItems] || menuItems.athlete;

  const displayName = profile?.full_name || (role === 'coach' ? 'Coach Marcus' : 'Afiq Hakim');
  const userSubtitle = role === 'coach' ? 'Head Coach • Elite Lab' : 'Tier 1 Elite • Vo2 Max 58';

  return (
    <aside className="sidebar-container">
      {/* Brand Header */}
      <div className="sidebar-header">
        <div className="sidebar-logo-glow">
          <div className="sidebar-logo-inner">
            <Zap className="sidebar-logo-icon" />
          </div>
        </div>
        <div>
          <span className="sidebar-title">
            ATHLETEFIT
          </span>
          <span className="sidebar-subtitle">
            PRO PERFORMANCE
          </span>
        </div>
      </div>
      
      {/* Navigation Section */}
      <div className="sidebar-nav-container">
        <div>
          <div className="sidebar-section-label">
            OPERATIONS
          </div>
          <nav className="sidebar-nav-list">
            {links.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                end={item.path === '/coach' || item.path === '/dashboard' || item.path === '/admin'}
                className={({ isActive }) =>
                  `sidebar-nav-link ${isActive ? 'sidebar-nav-link-active' : ''}`
                }
              >
                <item.icon className="sidebar-nav-icon" />
                <span>{item.name}</span>
              </NavLink>
            ))}
          </nav>
        </div>
      </div>

      {/* Bottom User Card */}
      <div className="sidebar-footer">
        <div className="sidebar-user-card">
          <div className="sidebar-user-info">
            <div className="sidebar-avatar-glow">
              <div className="sidebar-avatar-inner">
                {displayName.charAt(0)}
              </div>
            </div>
            <div className="sidebar-user-details">
              <p className="sidebar-user-name">{displayName}</p>
              <p className="sidebar-user-role">{userSubtitle}</p>
            </div>
          </div>
          
          <button 
            onClick={signOut}
            title="Sign Out"
            className="sidebar-logout-btn"
          >
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </div>
    </aside>
  );
}
