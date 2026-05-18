import { useState, useEffect } from 'react';
import { TrendingUp, AlertTriangle, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '../../utils/supabase';

export default function Progress() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProgress() {
      try {
        setLoading(true);
        // Fetch all athletes
        const { data: users, error: usersError } = await supabase
          .from('users')
          .select('*')
          .eq('role', 'Athlete');

        if (usersError) throw usersError;

        if (users) {
          const progressData = await Promise.all(
            users.map(async (u) => {
              // Fetch workouts assigned to this athlete
              const { data: workouts, error: workoutsError } = await supabase
                .from('workouts')
                .select('*')
                .eq('assigned_to', u.id)
                .order('scheduled_for', { ascending: false });

              if (workoutsError) console.error("Workouts fetch error", workoutsError);

              // Fetch completed workout logs
              const { data: logs, error: logsError } = await supabase
                .from('workout_logs')
                .select('*')
                .eq('user_id', u.id)
                .order('completed_at', { ascending: false });

              if (logsError) console.error("Logs fetch error", logsError);

              const total = workouts ? workouts.length : 0;
              const completed = logs ? logs.length : 0;
              const percent = total > 0 ? Math.min(100, Math.round((completed / total) * 100)) : 0;
              const plan = workouts && workouts.length > 0 ? workouts[0].title : 'No Active Plan';

              let last = 'Never';
              if (logs && logs.length > 0) {
                const date = new Date(logs[0].completed_at);
                const diffTime = Math.abs(new Date().getTime() - date.getTime());
                const diffMinutes = Math.floor(diffTime / (1000 * 60));
                const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
                const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

                if (diffMinutes < 60) {
                  last = `${diffMinutes} mins ago`;
                } else if (diffHours < 24) {
                  last = `${diffHours} hours ago`;
                } else {
                  last = `${diffDays} days ago`;
                }
              }

              // Determine status
              let status = 'On Track';
              if (total === 0) {
                status = 'No Plan';
              } else if (percent === 100) {
                status = 'Completed';
              } else if (percent < 40 || (logs && logs.length > 0 && (new Date().getTime() - new Date(logs[0].completed_at).getTime()) > 5 * 24 * 60 * 60 * 1000)) {
                status = 'Slipping';
              }

              return {
                id: u.id,
                athlete: u.full_name,
                plan,
                completed,
                total,
                percent,
                last,
                status,
              };
            })
          );
          setData(progressData);
        }
      } catch (err) {
        console.error('Error fetching progress data:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchProgress();
  }, []);

  return (
    <div className="space-y-6 text-text">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-display font-bold text-white">Monitor Progress</h1>
      </div>

      <div className="bg-surface2 rounded-xl border border-border overflow-hidden">
        <div className="overflow-x-auto">
          {loading ? (
            <div className="px-6 py-12 text-center text-gray-400">
              <Loader2 className="animate-spin h-8 w-8 mx-auto mb-2 text-green-500" />
              <span>Loading progress data...</span>
            </div>
          ) : data.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              No athletes found.
            </div>
          ) : (
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
                {data.map((row) => (
                  <tr key={row.id} className="hover:bg-surface transition cursor-pointer group">
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
                          row.status === 'No Plan' ? 'bg-gray-100/10 text-gray-400' : 
                          'bg-warning/10 text-warning'}`}>
                        {row.status === 'Slipping' && <AlertTriangle className="h-3 w-3 mr-1 self-center" />}
                        {row.status === 'On Track' && <TrendingUp className="h-3 w-3 mr-1 self-center" />}
                        {row.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                      <Link to={`/coach/athletes/${row.id}`} className="text-blue-400 hover:text-blue-300 font-medium">View Detail</Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
