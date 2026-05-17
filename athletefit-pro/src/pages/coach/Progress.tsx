import { Activity, TrendingUp, AlertTriangle } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Progress() {
  const data = [
    { athlete: 'Sarah Connor', plan: 'Spartan Prep', completed: 14, total: 24, percent: 58, last: 'Today', trend: 'up', status: 'On Track' },
    { athlete: 'John Smith', plan: 'Couch to 5K', completed: 2, total: 18, percent: 11, last: '5 days ago', trend: 'down', status: 'Slipping' },
    { athlete: 'Emily Davis', plan: 'Core Crusher', completed: 12, total: 12, percent: 100, last: 'Yesterday', trend: 'up', status: 'Completed' },
  ];

  return (
    <div className="space-y-6 text-text">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-display font-bold">Monitor Progress</h1>
      </div>

      <div className="bg-surface2 rounded-xl border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-border">
            <thead className="bg-surface">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Athlete</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Active Plan</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Progress</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-surface2 divide-y divide-border">
              {data.map((row, i) => (
                <tr key={i} className="hover:bg-surface transition cursor-pointer group">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium text-white">{row.athlete}</div>
                    <div className="text-xs text-gray-500">Last active: {row.last}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-300">
                    {row.plan}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-1 w-32 bg-surface rounded-full h-2 mr-3 border border-border overflow-hidden">
                        <div className={`h-2 rounded-full ${row.percent === 100 ? 'bg-green-400' : 'bg-blue-500'}`} style={{ width: `${row.percent}%` }}></div>
                      </div>
                      <span className="text-sm font-mono text-gray-400">{row.completed}/{row.total}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full 
                      ${row.status === 'On Track' ? 'bg-blue-100/10 text-blue-300' : 
                        row.status === 'Completed' ? 'bg-green-100/10 text-green-300' : 
                        'bg-warning/10 text-warning'}`}>
                      {row.status === 'Slipping' && <AlertTriangle className="h-3 w-3 mr-1 self-center" />}
                      {row.status === 'On Track' && <TrendingUp className="h-3 w-3 mr-1 self-center" />}
                      {row.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                    <Link to="/coach/athletes/1" className="text-blue-400 hover:text-blue-300 font-medium">View Detail</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
