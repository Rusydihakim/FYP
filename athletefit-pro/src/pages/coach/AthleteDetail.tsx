import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  Activity, Heart, ArrowLeft, MessageSquare, PlusSquare, Target, 
  Calendar, CheckCircle2, TrendingUp, Moon, Loader2,
  Plus
} from 'lucide-react';
import { supabase } from '../../utils/supabase';

export default function AthleteDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'overview' | 'workouts' | 'health' | 'feedback'>('overview');
  
  const [athlete, setAthlete] = useState<any>(null);
  const [goals, setGoals] = useState<any[]>([]);
  const [recentLogs, setRecentLogs] = useState<any[]>([]);
  const [deviceData, setDeviceData] = useState<any[]>([]);
  const [workouts, setWorkouts] = useState<any[]>([]);
  
  const [loading, setLoading] = useState(true);

  // Dynamic profiles for known seeded athletes
  const profileDetails = id === 'bd81ebd2-bd8e-4f8f-9e6b-f8b34741acb8' ? {
    age: 22,
    weight: '72 kg',
    height: '178 cm',
    fitness_level: 'Advanced'
  } : id === 'ff3237b9-dec1-4126-a74a-b55d889532e1' ? {
    age: 23,
    weight: '58 kg',
    height: '162 cm',
    fitness_level: 'Intermediate'
  } : {
    age: 25,
    weight: '65 kg',
    height: '170 cm',
    fitness_level: 'Intermediate'
  };

  useEffect(() => {
    async function fetchAthleteDetails() {
      if (!id) return;
      try {
        setLoading(true);

        // 1. Fetch User details
        const { data: user, error: userErr } = await supabase
          .from('users')
          .select('*')
          .eq('id', id)
          .single();

        if (userErr) throw userErr;
        setAthlete(user);

        // 2. Fetch Goals
        const { data: goalsData } = await supabase
          .from('goals')
          .select('*')
          .eq('user_id', id)
          .order('created_at', { ascending: false });
        
        setGoals(goalsData || []);

        // 3. Fetch Workout Logs joined with Workouts
        const { data: logsData } = await supabase
          .from('workout_logs')
          .select('*, workouts(title, scheduled_for)')
          .eq('user_id', id)
          .order('completed_at', { ascending: false });

        setRecentLogs(logsData || []);

        // 4. Fetch Device Data
        const { data: devData } = await supabase
          .from('device_data')
          .select('*')
          .eq('user_id', id)
          .order('timestamp', { ascending: false });

        setDeviceData(devData || []);

        // 5. Fetch assigned workouts with their exercises
        const { data: workoutsData } = await supabase
          .from('workouts')
          .select('*, exercises(*)')
          .eq('assigned_to', id)
          .order('scheduled_for', { ascending: false });

        setWorkouts(workoutsData || []);

      } catch (err) {
        console.error("Error fetching athlete detail:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchAthleteDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[500px] text-text">
        <Loader2 className="animate-spin h-12 w-12 text-green-500 mb-4" />
        <p className="text-gray-400">Fetching athlete profile and wearable health data...</p>
      </div>
    );
  }

  if (!athlete) {
    return (
      <div className="text-center p-12 text-text">
        <h2 className="text-2xl font-bold text-white mb-4">Athlete not found</h2>
        <Link to="/coach/athletes" className="text-green-400 hover:underline">
          &larr; Back to Athletes list
        </Link>
      </div>
    );
  }

  // Calculate stats from device data
  const stepsData = deviceData.filter(d => d.metric_type === 'Steps');
  const hrData = deviceData.filter(d => d.metric_type === 'HR');
  const sleepData = deviceData.filter(d => d.metric_type === 'Sleep');

  const latestSteps = stepsData[0]?.value || 'No Sync';
  const avgSteps = stepsData.length > 0 
    ? Math.round(stepsData.reduce((acc, curr) => acc + parseFloat(curr.value), 0) / stepsData.length) 
    : 0;

  const latestHR = hrData[0]?.value || 'No Sync';
  const avgHR = hrData.length > 0 
    ? Math.round(hrData.reduce((acc, curr) => acc + parseFloat(curr.value), 0) / hrData.length) 
    : 0;

  const latestSleep = sleepData[0]?.value || 'No Sync';
  const avgSleep = sleepData.length > 0 
    ? (sleepData.reduce((acc, curr) => acc + parseFloat(curr.value), 0) / sleepData.length).toFixed(1)
    : '0';

  return (
    <div className="space-y-6 text-text max-w-6xl mx-auto">
      <Link to="/coach/athletes" className="text-gray-400 hover:text-white inline-flex items-center text-sm transition">
        <ArrowLeft className="h-4 w-4 mr-1" /> Back to Athletes
      </Link>

      {/* Hero card */}
      <div className="bg-surface2 rounded-2xl border border-border p-6 md:p-8 flex flex-col md:flex-row gap-6 md:items-center justify-between shadow-xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-green-500 to-blue-500"></div>
        <div className="flex items-center gap-6">
          <div className="h-24 w-24 rounded-full bg-gradient-to-br from-blue-900 to-green-900 border-2 border-green-500 flex items-center justify-center text-green-300 text-3xl font-display font-extrabold shadow-inner shadow-green-500/20">
            {athlete.full_name.charAt(0).toUpperCase()}
          </div>
          <div>
            <h1 className="text-3xl font-display font-bold text-white tracking-tight flex items-center gap-2">
              {athlete.full_name}
              <span className={`text-xs px-2 py-1 rounded-full uppercase tracking-wider font-semibold ${
                profileDetails.fitness_level === 'Advanced' ? 'bg-danger/20 text-danger border border-danger/30' : 'bg-green-500/20 text-green-400 border border-green-500/30'
              }`}>
                {profileDetails.fitness_level}
              </span>
            </h1>
            <p className="text-sm text-gray-400 mt-1 font-mono">{athlete.email}</p>
            <div className="flex gap-4 mt-3 text-sm text-gray-300">
              <span className="bg-surface px-2.5 py-1 rounded-lg border border-border">{profileDetails.age} years old</span>
              <span className="bg-surface px-2.5 py-1 rounded-lg border border-border">{profileDetails.height}</span>
              <span className="bg-surface px-2.5 py-1 rounded-lg border border-border">{profileDetails.weight}</span>
            </div>
          </div>
        </div>
        
        <div className="flex flex-row md:flex-col gap-2 min-w-[200px]">
          <button 
            onClick={() => navigate('/coach/messages')}
            className="flex-1 flex items-center justify-center px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl transition shadow-lg shadow-blue-600/15"
          >
            <MessageSquare className="h-4 w-4 mr-2" /> Message
          </button>
          <button 
            onClick={() => navigate('/coach/assign')}
            className="flex-1 flex items-center justify-center px-4 py-2.5 bg-surface border border-border hover:bg-surface2 text-gray-300 font-semibold rounded-xl transition hover:border-gray-500"
          >
            <PlusSquare className="h-4 w-4 mr-2" /> Assign Plan
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-border">
        <nav className="-mb-px flex space-x-8">
          {(['Overview', 'Workouts', 'Health Data', 'Feedback'] as const).map((tab) => {
            const val = tab.toLowerCase().replace(' ', '') as 'overview' | 'workouts' | 'health' | 'feedback';
            const isActive = activeTab === val;
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(val)}
                className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-all ${
                  isActive
                    ? 'border-green-500 text-green-400'
                    : 'border-transparent text-gray-400 hover:text-gray-200 hover:border-gray-500'
                }`}
              >
                {tab}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Tab Panels */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {/* Goals */}
            <div className="bg-surface2 rounded-xl border border-border p-6 shadow-md">
              <h2 className="text-xl font-display font-bold mb-4 flex items-center text-white">
                <Target className="mr-2 text-green-400 h-5 w-5" /> Active Fitness Goals
              </h2>
              {goals.length > 0 ? (
                <div className="space-y-3">
                  {goals.map((g) => (
                    <div key={g.id} className="p-4 bg-surface rounded-xl border border-border flex justify-between items-center hover:border-green-500/30 transition">
                      <div>
                        <h3 className="font-semibold text-white">{g.goal_type}</h3>
                        <p className="text-xs text-gray-400 mt-1">Target date: {new Date(g.target_date).toLocaleDateString()}</p>
                      </div>
                      <span className={`text-xs px-2.5 py-1 rounded-full uppercase tracking-wider font-semibold ${
                        g.status === 'Completed' ? 'bg-green-500/20 text-green-400 border border-green-500/20' : 'bg-blue-500/20 text-blue-400 border border-blue-500/20'
                      }`}>
                        {g.status}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-400 italic bg-surface p-4 rounded-xl border border-border text-center">No fitness goals set yet.</p>
              )}
            </div>

            {/* Recent Completed Sessions */}
            <div className="bg-surface2 rounded-xl border border-border p-6 shadow-md">
              <h2 className="text-xl font-display font-bold mb-4 flex items-center text-white">
                <CheckCircle2 className="mr-2 text-blue-400 h-5 w-5" /> Recent Sessions
              </h2>
              {recentLogs.length > 0 ? (
                <div className="space-y-4">
                  {recentLogs.slice(0, 3).map((log) => (
                    <div key={log.id} className="p-4 bg-surface rounded-xl border border-border flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div>
                        <h3 className="font-semibold text-white">{log.workouts?.title || 'Single Workout'}</h3>
                        <p className="text-sm text-gray-400 mt-0.5">
                          Completed {new Date(log.completed_at).toLocaleDateString()} at {new Date(log.completed_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                        {log.feedback_notes && (
                          <p className="text-xs text-gray-400 italic mt-2 bg-surface2 px-3 py-2 rounded-lg border border-border/50">
                            "{log.feedback_notes}"
                          </p>
                        )}
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-xs px-2 py-1 rounded bg-green-500/10 text-green-400 font-mono">100% Done</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-400 italic bg-surface p-4 rounded-xl border border-border text-center">No workout logs completed yet.</p>
              )}
            </div>
          </div>

          {/* Sidebar wearable summaries */}
          <div className="space-y-6">
            <div className="bg-surface2 rounded-xl border border-border p-6 shadow-md relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-green-500"></div>
              <h2 className="text-xl font-display font-bold mb-4 flex items-center text-white">
                <Activity className="mr-2 text-blue-400 h-5 w-5" /> Wearable Metrics
              </h2>
              
              <div className="space-y-5">
                {/* Steps card */}
                <div className="bg-surface p-3.5 rounded-xl border border-border">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Steps Today</span>
                    <TrendingUp className="h-4 w-4 text-green-400" />
                  </div>
                  <div className="text-2xl font-mono font-bold text-white mt-1.5">{latestSteps.toLocaleString()}</div>
                  <div className="text-xs text-gray-500 mt-1">7-Day Avg: <span className="text-gray-300 font-mono">{avgSteps.toLocaleString()}</span></div>
                </div>

                {/* Heart Rate card */}
                <div className="bg-surface p-3.5 rounded-xl border border-border">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider flex items-center">
                      <Heart className="h-3.5 w-3.5 mr-1 text-danger animate-pulse" /> Resting Heart Rate
                    </span>
                  </div>
                  <div className="text-2xl font-mono font-bold text-white mt-1.5">{latestHR} <span className="text-xs text-gray-500 font-normal">bpm</span></div>
                  <div className="text-xs text-gray-500 mt-1">7-Day Avg: <span className="text-gray-300 font-mono">{avgHR} bpm</span></div>
                </div>

                {/* Sleep card */}
                <div className="bg-surface p-3.5 rounded-xl border border-border">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider flex items-center">
                      <Moon className="h-3.5 w-3.5 mr-1 text-yellow-400" /> Sleep Duration
                    </span>
                  </div>
                  <div className="text-2xl font-mono font-bold text-white mt-1.5">{latestSleep} <span className="text-xs text-gray-500 font-normal">hours</span></div>
                  <div className="text-xs text-gray-500 mt-1">7-Day Avg: <span className="text-gray-300 font-mono">{avgSleep} hrs</span></div>
                </div>
              </div>
              <div className="mt-4 text-[10px] text-center text-gray-500 font-mono">Wearable last synced: {deviceData[0] ? new Date(deviceData[0].timestamp).toLocaleTimeString() : 'Never'}</div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'workouts' && (
        <div className="bg-surface2 rounded-xl border border-border p-6 shadow-md">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-display font-bold text-white flex items-center">
              <Calendar className="mr-2 text-green-400 h-6 w-6" /> Assigned Workouts
            </h2>
            <Link to="/coach/assign" className="bg-green-500 hover:bg-green-400 text-bg text-sm font-bold px-3 py-1.5 rounded-lg flex items-center transition">
              <Plus className="h-4 w-4 mr-1" /> New Workout
            </Link>
          </div>

          {workouts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {workouts.map((w) => (
                <div key={w.id} className="bg-surface border border-border rounded-xl p-5 hover:border-green-500/30 transition flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="font-bold text-lg text-white font-display">{w.title}</h3>
                      <span className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full ${
                        w.is_ai_generated ? 'bg-blue-600/20 text-blue-400 border border-blue-500/20' : 'bg-green-500/20 text-green-400 border border-green-500/20'
                      }`}>
                        {w.is_ai_generated ? 'AI' : 'Coach'}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 mb-4 flex items-center">
                      <Calendar className="h-3.5 w-3.5 mr-1" /> Scheduled for: {new Date(w.scheduled_for).toLocaleDateString()}
                    </p>

                    {/* Exercises list */}
                    {w.exercises && w.exercises.length > 0 ? (
                      <div className="space-y-2 mt-4 pt-4 border-t border-border/50">
                        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Exercise Routine</p>
                        {w.exercises.map((ex: any) => (
                          <div key={ex.id} className="flex justify-between items-center text-sm py-1 bg-surface2 px-3 rounded-lg border border-border/30">
                            <span className="font-medium text-white">{ex.name}</span>
                            <span className="text-xs text-gray-400 font-mono">
                              {ex.sets}x{ex.reps} {ex.weight_kg ? `@ ${ex.weight_kg}kg` : ''}
                            </span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-xs text-gray-500 italic mt-4 pt-4 border-t border-border/50">No detailed exercises loaded.</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center bg-surface border border-border rounded-xl">
              <p className="text-gray-400 italic">No scheduled workouts found. Start by assigning one!</p>
            </div>
          )}
        </div>
      )}

      {activeTab === 'health' && (
        <div className="bg-surface2 rounded-xl border border-border p-6 shadow-md">
          <h2 className="text-2xl font-display font-bold text-white mb-6 flex items-center">
            <Activity className="mr-2 text-blue-400 h-6 w-6" /> Device Data Sync Logs
          </h2>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-border">
              <thead className="bg-surface">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Date & Time</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Source API</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Metric Type</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Value</th>
                </tr>
              </thead>
              <tbody className="bg-surface2 divide-y divide-border">
                {deviceData.length > 0 ? (
                  deviceData.map((d) => (
                    <tr key={d.id} className="hover:bg-surface transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-text font-mono">
                        {new Date(d.timestamp).toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                        {d.source_api}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <span className={`px-2 py-0.5 inline-flex text-xs leading-5 font-semibold rounded-full capitalize ${
                          d.metric_type === 'Steps' ? 'bg-green-500/10 text-green-400' :
                          d.metric_type === 'HR' ? 'bg-danger/10 text-danger' :
                          'bg-yellow-500/10 text-yellow-400'
                        }`}>
                          {d.metric_type}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-white font-mono font-bold">
                        {d.value.toLocaleString()} {d.metric_type === 'HR' ? 'bpm' : d.metric_type === 'Sleep' ? 'hrs' : ''}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="px-6 py-8 text-center text-gray-400 italic">No health synchronization logs found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'feedback' && (
        <div className="bg-surface2 rounded-xl border border-border p-6 shadow-md">
          <h2 className="text-2xl font-display font-bold text-white mb-6 flex items-center">
            <MessageSquare className="mr-2 text-blue-400 h-6 w-6" /> Workout Log Feedback History
          </h2>

          <div className="space-y-4">
            {recentLogs.filter(log => log.feedback_notes).length > 0 ? (
              recentLogs.filter(log => log.feedback_notes).map((log) => (
                <div key={log.id} className="p-5 bg-surface rounded-xl border border-border hover:border-green-500/20 transition-all">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-semibold text-lg text-white font-display">{log.workouts?.title || 'Workout Session'}</h3>
                      <p className="text-xs text-gray-500 mt-0.5">Completed: {new Date(log.completed_at).toLocaleString()}</p>
                    </div>
                  </div>
                  <div className="bg-surface2 border border-border/50 rounded-xl p-4 mt-2">
                    <p className="text-gray-300 text-sm italic font-sans leading-relaxed">
                      "{log.feedback_notes}"
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-400 italic bg-surface p-6 rounded-xl border border-border text-center">No workout feedback comments submitted by the athlete yet.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

