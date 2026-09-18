import { useAuth } from '../../hooks/useAuth';
import { Bell, Search, Zap, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Topbar() {
  const { profile } = useAuth();
  const role = (profile?.role || 'Athlete').toLowerCase();

  return (
    <header className="h-20 bg-[#050811]/90 backdrop-blur-md border-b border-[#15233D] flex items-center justify-between px-6 sticky top-0 z-30">
      {/* Left Breadcrumb */}
      <div className="flex items-center space-x-2 text-xs font-mono">
        <div className="h-6 w-6 rounded-md bg-[#0C172E] border border-[#1B2F56] flex items-center justify-center text-cyan-400">
          <Zap className="h-3.5 w-3.5" />
        </div>
        <span className="text-gray-400">Platform</span>
        <span className="text-gray-600">›</span>
        <span className="text-cyan-300 font-semibold">Pro Telemetry</span>
      </div>

      {/* Center Search Input */}
      <div className="hidden md:flex items-center w-80 lg:w-96">
        <div className="relative w-full">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-500" />
          <input
            type="text"
            placeholder="Search telemetry, sets, drills..."
            className="w-full bg-[#091224] border border-[#162744] hover:border-[#1E365E] focus:border-cyan-500/80 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-gray-500 focus:outline-none transition-all shadow-inner"
          />
        </div>
      </div>

      {/* Right Action Icons & Profile */}
      <div className="flex items-center space-x-3 sm:space-x-4">
        {/* Live Synced Indicator */}
        <div className="hidden sm:flex items-center space-x-1.5 px-3 py-1 rounded-full bg-cyan-950/40 border border-cyan-500/30 text-[11px] font-mono text-cyan-300">
          <span className="h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse" />
          <span>SYNCED</span>
        </div>

        {/* Notifications */}
        <button className="h-9 w-9 rounded-xl bg-[#091224] border border-[#162744] hover:border-cyan-500/40 flex items-center justify-center text-gray-400 hover:text-white transition-colors relative cursor-pointer">
          <Bell className="h-4 w-4" />
          <span className="absolute top-2 right-2 block h-1.5 w-1.5 rounded-full bg-cyan-400 shadow-[0_0_6px_rgba(6,182,212,0.8)]" />
        </button>

        {/* Primary Action Button */}
        <Link
          to={role === 'coach' ? '/coach/assign' : '/dashboard/workouts'}
          className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-400 to-cyan-300 hover:from-cyan-300 hover:to-green-300 text-slate-950 font-bold text-xs flex items-center space-x-1.5 shadow-[0_0_20px_rgba(6,182,212,0.3)] transition-all cursor-pointer"
        >
          <Plus className="h-3.5 w-3.5 stroke-[3]" />
          <span>{role === 'coach' ? 'Assign Workout' : 'Start Session'}</span>
        </Link>

        {/* User Avatar */}
        <div className="h-9 w-9 rounded-full bg-gradient-to-tr from-cyan-400 to-blue-600 p-[1.5px] cursor-pointer">
          <div className="h-full w-full rounded-full bg-[#080D1A] flex items-center justify-center text-xs font-bold text-cyan-300">
            {profile?.full_name?.charAt(0) || (role === 'coach' ? 'M' : 'A')}
          </div>
        </div>
      </div>
    </header>
  );
}
