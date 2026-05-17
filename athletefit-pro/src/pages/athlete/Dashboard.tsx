import { Activity, Flame, Heart, TrendingUp, CalendarDays } from 'lucide-react';
import { Link } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function AthleteDashboard() {
  const chartData = [
    { day: 'Mon', completed: 1, target: 1 },
    { day: 'Tue', completed: 1, target: 1 },
    { day: 'Wed', completed: 0, target: 1 },
    { day: 'Thu', completed: 1, target: 1 },
    { day: 'Fri', completed: 0, target: 0 },
    { day: 'Sat', completed: 2, target: 1 },
    { day: 'Sun', completed: 0, target: 1 },
  ];

  return (
    <div className="space-y-6 text-text">
      <div className="flex justify-between items-center bg-gradient-to-r from-blue-900/50 to-green-900/20 p-6 rounded-xl border border-blue-900/50">
        <div>
          <h1 className="text-3xl font-display font-bold">Ready to work, Sarah?</h1>
          <p className="text-gray-300 mt-2">Your next workout is scheduled for today.</p>
        </div>
        <div className="hidden md:block">
          <Link to="/dashboard/workouts" className="bg-green-500 text-bg font-bold px-6 py-3 rounded-lg hover:bg-green-400 transition inline-flex items-center">
            <CalendarDays className="mr-2 h-5 w-5" /> Start Workout
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-surface2 p-6 rounded-xl border border-border">
          <div className="flex justify-between items-start">
             <div>
                <p className="text-sm text-gray-400 font-medium">Steps Today</p>
                <p className="text-2xl font-mono font-bold mt-2 text-white">8,432</p>
             </div>
             <div className="p-2 bg-blue-500/10 text-blue-400 rounded-lg"><Activity className="h-5 w-5" /></div>
          </div>
        </div>
        <div className="bg-surface2 p-6 rounded-xl border border-border">
          <div className="flex justify-between items-start">
             <div>
                <p className="text-sm text-gray-400 font-medium">Calories Burned</p>
                <p className="text-2xl font-mono font-bold mt-2 text-white">1,240</p>
             </div>
             <div className="p-2 bg-orange-500/10 text-orange-400 rounded-lg"><Flame className="h-5 w-5" /></div>
          </div>
        </div>
        <div className="bg-surface2 p-6 rounded-xl border border-border">
          <div className="flex justify-between items-start">
             <div>
                <p className="text-sm text-gray-400 font-medium">Active Minutes</p>
                <p className="text-2xl font-mono font-bold mt-2 text-white">45<span className="text-sm text-gray-500">m</span></p>
             </div>
             <div className="p-2 bg-green-500/10 text-green-400 rounded-lg"><TrendingUp className="h-5 w-5" /></div>
          </div>
        </div>
        <div className="bg-surface2 p-6 rounded-xl border border-border">
          <div className="flex justify-between items-start">
             <div>
                <p className="text-sm text-gray-400 font-medium">Heart Rate</p>
                <p className="text-2xl font-mono font-bold mt-2 text-white">68<span className="text-sm text-gray-500">bpm</span></p>
             </div>
             <div className="p-2 bg-danger/10 text-danger rounded-lg"><Heart className="h-5 w-5" /></div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-surface2 rounded-xl border border-border p-6">
          <h2 className="text-xl font-display font-bold mb-6">Weekly Progress</h2>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1E2D47" />
                <XAxis dataKey="day" stroke="#8DA4C0" tick={{fill: '#8DA4C0'}} />
                <YAxis stroke="#8DA4C0" tick={{fill: '#8DA4C0'}} />
                <Tooltip contentStyle={{ backgroundColor: '#0F1729', borderColor: '#1E2D47', color: '#fff' }} />
                <Line type="step" dataKey="target" stroke="#3A91E0" strokeWidth={2} strokeDasharray="5 5" name="Target Sessions" />
                <Line type="monotone" dataKey="completed" stroke="#8FDB42" strokeWidth={3} name="Completed Sessions" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-surface2 rounded-xl border border-border p-6">
          <h2 className="text-xl font-display font-bold mb-4">Recent Activity</h2>
          <div className="space-y-4">
            <div className="relative pl-6 border-l-2 border-border pb-4">
               <div className="absolute -left-[9px] top-1 h-4 w-4 rounded-full bg-green-500 border-4 border-surface2"></div>
               <p className="font-medium text-white">Completed Leg Day</p>
               <p className="text-sm text-gray-400">Yesterday, 45 mins</p>
            </div>
            <div className="relative pl-6 border-l-2 border-border pb-4">
               <div className="absolute -left-[9px] top-1 h-4 w-4 rounded-full bg-blue-500 border-4 border-surface2"></div>
               <p className="font-medium text-white">Synced Fitbit Data</p>
               <p className="text-sm text-gray-400">Yesterday, 10,230 steps</p>
            </div>
            <div className="relative pl-6 border-l-2 border-border">
               <div className="absolute -left-[9px] top-1 h-4 w-4 rounded-full bg-gray-500 border-4 border-surface2"></div>
               <p className="font-medium text-white">Coach Assigned Plan</p>
               <p className="text-sm text-gray-400">2 days ago</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
