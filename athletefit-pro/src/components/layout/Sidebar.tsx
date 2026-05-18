import { NavLink } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { 
  LayoutDashboard, Users, CalendarDays, PlusSquare, 
  Activity, MessageSquare, PieChart, Settings, LogOut, FileText
} from 'lucide-react';

export function Sidebar() {
  const { profile, signOut } = useAuth();

  const role = (profile?.role || 'athlete').toLowerCase();

  const menuItems = {
    coach: [
      { name: 'Dashboard', icon: LayoutDashboard, path: '/coach' },
      { name: 'My Athletes', icon: Users, path: '/coach/athletes' },
      { name: 'Workout Plans', icon: FileText, path: '/coach/plans' },
      { name: 'Assign Workouts', icon: PlusSquare, path: '/coach/assign' },
      { name: 'Monitor Progress', icon: Activity, path: '/coach/progress' },
      { name: 'Reports', icon: PieChart, path: '/coach/reports' },
      { name: 'Messages', icon: MessageSquare, path: '/coach/messages' },
    ],
    athlete: [
      { name: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
      { name: 'My Workouts', icon: CalendarDays, path: '/dashboard/workouts' },
      { name: 'Progress', icon: Activity, path: '/dashboard/analytics' },
      { name: 'Wearable Sync', icon: Activity, path: '/dashboard/wearable' },
      { name: 'Messages', icon: MessageSquare, path: '/dashboard/messages' },
    ],
    admin: [
      { name: 'Dashboard', icon: LayoutDashboard, path: '/admin' },
      { name: 'Manage Users', icon: Users, path: '/admin/users' },
      { name: 'System Settings', icon: Settings, path: '/admin/settings' },
    ]
  };

  const links = menuItems[role as keyof typeof menuItems] || menuItems.athlete;

  return (
    <div className="w-64 bg-surface2 border-r border-border h-screen flex flex-col fixed left-0 top-0">
      <div className="h-16 flex items-center px-6 border-b border-border">
        <img src="/assets/logo.png" alt="AthleteFit Pro" className="h-8 object-contain" />
      </div>
      
      <div className="flex-1 overflow-y-auto py-4">
        <nav className="space-y-1 px-3">
          {links.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              end={item.path === '/coach' || item.path === '/dashboard' || item.path === '/admin'}
              className={({ isActive }) =>
                `flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                  isActive
                    ? 'bg-surface border-l-2 border-green-500 text-text'
                    : 'text-gray-500 hover:text-gray-300 hover:bg-surface'
                }`
              }
            >
              <item.icon className="mr-3 h-5 w-5 flex-shrink-0" />
              {item.name}
            </NavLink>
          ))}
        </nav>
      </div>

      <div className="p-4 border-t border-border">
        <button
          onClick={signOut}
          className="flex items-center w-full px-3 py-2 text-sm font-medium text-gray-500 rounded-lg hover:text-gray-300 hover:bg-surface transition-colors"
        >
          <LogOut className="mr-3 h-5 w-5" />
          Sign Out
        </button>
      </div>
    </div>
  );
}
