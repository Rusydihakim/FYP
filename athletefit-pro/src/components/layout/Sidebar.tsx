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
    <aside className="w-64 bg-[#050811] border-r border-[#15233D] h-screen flex flex-col fixed left-0 top-0 z-40 selection:bg-cyan-500 selection:text-black">
      {/* Brand Header */}
      <div className="h-20 flex items-center px-6 border-b border-[#15233D] space-x-3">
        <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-cyan-400 via-blue-500 to-green-400 p-[1px] shadow-[0_0_15px_rgba(6,182,212,0.3)]">
          <div className="h-full w-full bg-[#080D1A] rounded-[11px] flex items-center justify-center">
            <Zap className="h-4 w-4 text-cyan-400 fill-cyan-400" />
          </div>
        </div>
        <div>
          <span className="font-display text-lg font-bold tracking-wider text-white block leading-none">
            ATHLETEFIT
          </span>
          <span className="text-[9px] font-mono tracking-widest text-cyan-400 font-semibold uppercase">
            PRO PERFORMANCE
          </span>
        </div>
      </div>
      
      {/* Navigation Section */}
      <div className="flex-1 overflow-y-auto py-5 px-4 space-y-6">
        <div>
          <div className="text-[10px] font-mono tracking-widest text-gray-500 uppercase px-3 mb-2 font-semibold">
            OPERATIONS
          </div>
          <nav className="space-y-1">
            {links.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                end={item.path === '/coach' || item.path === '/dashboard' || item.path === '/admin'}
                className={({ isActive }) =>
                  `flex items-center px-3.5 py-2.5 text-xs font-semibold rounded-xl transition-all ${
                    isActive
                      ? 'bg-[#102447] text-cyan-300 border border-cyan-500/40 shadow-[0_0_20px_rgba(6,182,212,0.2)]'
                      : 'text-gray-400 hover:text-white hover:bg-[#0C162A]'
                  }`
                }
              >
                <item.icon className="mr-3 h-4 w-4 shrink-0" />
                <span>{item.name}</span>
              </NavLink>
            ))}
          </nav>
        </div>
      </div>

      {/* Bottom User Card */}
      <div className="p-3 border-t border-[#15233D] bg-[#070D1C]">
        <div className="flex items-center justify-between p-2 rounded-xl bg-[#0B152A] border border-[#162744]">
          <div className="flex items-center space-x-2.5 overflow-hidden">
            <div className="h-9 w-9 rounded-full bg-gradient-to-tr from-cyan-400 to-blue-600 p-[2px] shrink-0">
              <div className="h-full w-full rounded-full bg-[#080D1A] flex items-center justify-center font-bold text-xs text-cyan-300">
                {displayName.charAt(0)}
              </div>
            </div>
            <div className="truncate text-left">
              <p className="text-xs font-bold text-white truncate">{displayName}</p>
              <p className="text-[10px] font-mono text-cyan-400 truncate">{userSubtitle}</p>
            </div>
          </div>
          
          <button 
            onClick={signOut}
            title="Sign Out"
            className="text-gray-500 hover:text-red-400 p-1.5 rounded-lg hover:bg-[#122242] transition-colors shrink-0 cursor-pointer"
          >
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </div>
    </aside>
  );
}
