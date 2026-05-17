import { useAuth } from '../../hooks/useAuth';
import { Bell } from 'lucide-react';

export function Topbar() {
  const { profile } = useAuth();

  return (
    <div className="h-16 bg-surface2 border-b border-border flex items-center justify-between px-6 sticky top-0 z-10">
      <div className="text-xl font-display text-text">
        Welcome back, <span className="text-blue-400">{profile?.full_name || 'User'}</span>
      </div>
      
      <div className="flex items-center space-x-4">
        <button className="text-gray-500 hover:text-gray-300 relative">
          <Bell className="h-5 w-5" />
          <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-danger ring-2 ring-surface2" />
        </button>
        
        <div className="h-8 w-8 rounded-full bg-blue-900 flex items-center justify-center text-blue-200 font-semibold border border-blue-700">
          {profile?.full_name?.charAt(0) || 'U'}
        </div>
      </div>
    </div>
  );
}
