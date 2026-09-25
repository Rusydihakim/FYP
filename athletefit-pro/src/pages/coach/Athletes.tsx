import { useState, useEffect } from 'react';
import { AthleteRow } from '../../components/ui/AthleteRow';
import { Search, Filter, Loader2 } from 'lucide-react';
import { supabase } from '../../utils/supabase';

export default function Athletes() {
  const [searchTerm, setSearchTerm] = useState('');
  const [athletes, setAthletes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAthletes() {
      try {
        setLoading(true);
        const { data: users, error } = await supabase
          .from('users')
          .select('*')
          .eq('role', 'Athlete');

        if (error) throw error;

        if (users) {
          const athletesList = await Promise.all(
            users.map(async (u) => {
              const { data: workouts } = await supabase
                .from('workouts')
                .select('title, scheduled_for')
                .eq('assigned_to', u.id)
                .order('scheduled_for', { ascending: false })
                .limit(1);

              const { data: logs } = await supabase
                .from('workout_logs')
                .select('completed_at')
                .eq('user_id', u.id)
                .order('completed_at', { ascending: false })
                .limit(1);

              const assignedPlan = workouts && workouts.length > 0 ? workouts[0].title : 'No Active Plan';
              
              let lastActive = 'Never';
              if (logs && logs.length > 0) {
                const date = new Date(logs[0].completed_at);
                const diffTime = Math.abs(new Date().getTime() - date.getTime());
                const diffMinutes = Math.floor(diffTime / (1000 * 60));
                const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
                const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
                
                if (diffMinutes < 60) {
                  lastActive = `${diffMinutes} mins ago`;
                } else if (diffHours < 24) {
                  lastActive = `${diffHours} hours ago`;
                } else {
                  lastActive = `${diffDays} days ago`;
                }
              }

              return {
                id: u.id,
                full_name: u.full_name,
                fitness_level: u.id === 'bd81ebd2-bd8e-4f8f-9e6b-f8b34741acb8' ? 'advanced' : 'intermediate',
                assigned_plan: assignedPlan,
                last_active: lastActive,
              };
            })
          );
          setAthletes(athletesList);
        }
      } catch (err) {
        console.error('Error fetching athletes:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchAthletes();
  }, []);

  const filteredAthletes = athletes.filter(a => 
    a.full_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 text-text">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-display font-bold">My Athletes</h1>
        <button className="bg-green-500 hover:bg-green-400 text-bg font-semibold px-4 py-2 rounded-lg transition">
          + Add Athlete
        </button>
      </div>

      <div className="bg-surface2 rounded-xl border border-border overflow-hidden">
        <div className="p-4 border-b border-border flex space-x-4">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-500" />
            </div>
            <input
              type="text"
              placeholder="Search athletes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-border rounded-lg bg-surface text-text placeholder-gray-500 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
            />
          </div>
          <button className="flex items-center px-4 py-2 bg-surface border border-border rounded-lg text-gray-300 hover:bg-surface2 transition">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-border">
            <thead className="bg-surface">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Name</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Fitness Level</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Assigned Plan</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Last Active</th>
                <th scope="col" className="relative px-6 py-3">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-surface2 divide-y divide-border">
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-gray-400">
                    <Loader2 className="animate-spin h-8 w-8 mx-auto mb-2 text-green-500" />
                    <span>Loading athletes...</span>
                  </td>
                </tr>
              ) : (
                filteredAthletes.map((athlete) => (
                  <AthleteRow key={athlete.id} athlete={athlete} />
                ))
              )}
            </tbody>
          </table>
          
          {filteredAthletes.length === 0 && (
            <div className="p-8 text-center text-gray-500">
              No athletes found matching your search.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
