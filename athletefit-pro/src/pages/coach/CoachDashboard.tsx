import { Users, FileText, MessageSquare, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function CoachDashboard() {
  const stats = [
    { name: 'Total Athletes', value: '12', icon: Users, color: 'text-blue-400' },
    { name: 'Active Plans', value: '8', icon: FileText, color: 'text-green-400' },
    { name: 'Pending Feedback', value: '3', icon: AlertCircle, color: 'text-warning' },
    { name: 'Unread Messages', value: '5', icon: MessageSquare, color: 'text-blue-200' },
  ];

  return (
    <div className="space-y-6 text-text">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-display font-bold">Coach Dashboard</h1>
        <div className="flex space-x-3">
          <Link to="/coach/athletes/new" className="bg-surface2 border border-border hover:bg-surface text-gray-300 px-4 py-2 rounded-lg transition">
            + Add Athlete
          </Link>
          <Link to="/coach/plans/new" className="bg-green-500 hover:bg-green-400 text-bg font-semibold px-4 py-2 rounded-lg transition">
            + Create Plan
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-surface2 p-6 rounded-xl border border-border flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400 font-medium">{stat.name}</p>
              <p className="text-3xl font-mono font-bold mt-2">{stat.value}</p>
            </div>
            <div className={`p-3 bg-surface rounded-lg ${stat.color}`}>
              <stat.icon className="h-6 w-6" />
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-surface2 rounded-xl border border-border p-6">
          <h2 className="text-xl font-display font-bold mb-4">Recent Athlete Activity</h2>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center justify-between py-3 border-b border-border last:border-0">
                <div className="flex items-center space-x-4">
                  <div className="h-10 w-10 rounded-full bg-blue-900 flex items-center justify-center text-blue-200 font-bold">
                    A{i}
                  </div>
                  <div>
                    <p className="font-medium">Athlete {i} completed a session</p>
                    <p className="text-sm text-gray-400">Strength & Conditioning - Week {i}</p>
                  </div>
                </div>
                <div className="text-sm text-gray-500 font-mono">2h ago</div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-surface2 rounded-xl border border-border p-6">
          <h2 className="text-xl font-display font-bold mb-4">Quick Actions</h2>
          <div className="space-y-3">
            <Link to="/coach/assign" className="block w-full text-center py-3 bg-surface border border-border rounded-lg text-blue-400 hover:bg-surface2 transition">
              Assign Workouts
            </Link>
            <Link to="/coach/reports" className="block w-full text-center py-3 bg-surface border border-border rounded-lg text-green-400 hover:bg-surface2 transition">
              View Reports
            </Link>
            <Link to="/coach/messages" className="block w-full text-center py-3 bg-surface border border-border rounded-lg text-gray-300 hover:bg-surface2 transition">
              Open Messages
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
