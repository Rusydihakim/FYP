import { useState, useEffect } from 'react';
import { AthleteRow } from '../../components/ui/AthleteRow';
import { Search, Filter, Loader2 } from 'lucide-react';
import { supabase } from '../../utils/supabase';
import '../../styles/CoachAthletes.css';

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
    <div className="coach-athletes-page">
      <div className="coach-athletes-header">
        <h1 className="coach-athletes-title">My Athletes</h1>
        <button className="coach-athletes-add-btn">
          + Add Athlete
        </button>
      </div>

      <div className="coach-athletes-table-container">
        <div className="coach-athletes-filter-bar">
          <div className="coach-athletes-search-wrap">
            <div className="coach-athletes-search-icon">
              <Search className="h-5 w-5 text-gray-500" />
            </div>
            <input
              type="text"
              placeholder="Search athletes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="coach-athletes-search-input"
            />
          </div>
          <button className="coach-athletes-filter-btn">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="coach-athletes-table">
            <thead className="coach-athletes-thead">
              <tr>
                <th scope="col" className="coach-athletes-th">Name</th>
                <th scope="col" className="coach-athletes-th">Fitness Level</th>
                <th scope="col" className="coach-athletes-th">Assigned Plan</th>
                <th scope="col" className="coach-athletes-th">Last Active</th>
                <th scope="col" className="coach-athletes-th-right">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="coach-athletes-tbody">
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
            <div className="coach-athletes-empty">
              No athletes found matching your search.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
