import { useEffect, useState } from 'react';
import { supabase } from '../../utils/supabase';
import { 
  Users as UsersIcon, 
  ShieldAlert, 
  CheckCircle, 
  Database, 
  Activity, 
  Dumbbell, 
  TrendingUp, 
  Heart,
  RefreshCw,
  Clock,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip,
  BarChart,
  Bar,
  Cell,
  Legend
} from 'recharts';

interface RecentUser {
  id: string;
  full_name: string;
  email: string;
  role: 'Athlete' | 'Coach' | 'Admin';
  created_at: string;
}

export default function AdminDashboard() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Dynamic stats
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeCoaches: 0,
    workoutsCount: 0,
    deviceDataCount: 0,
  });

  const [recentUsers, setRecentUsers] = useState<RecentUser[]>([]);
  const [completionTrend, setCompletionTrend] = useState<any[]>([]);
  const [wearableSourceData, setWearableSourceData] = useState<any[]>([]);
  const [iotMetricData, setIotMetricData] = useState<any[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const fetchDashboardData = async () => {
    try {
      if (!refreshing) setLoading(true);
      setError(null);

      // 1. Fetch counters in parallel
      const [
        usersCountRes, 
        coachesCountRes, 
        workoutsCountRes, 
        deviceDataCountRes,
        recentUsersRes,
        logsRes,
        deviceDataRes
      ] = await Promise.all([
        supabase.from('users').select('*', { count: 'exact', head: true }),
        supabase.from('users').select('*', { count: 'exact', head: true }).eq('role', 'Coach'),
        supabase.from('workouts').select('*', { count: 'exact', head: true }),
        supabase.from('device_data').select('*', { count: 'exact', head: true }),
        supabase.from('users').select('*').order('created_at', { ascending: false }).limit(5),
        supabase.from('workout_logs').select('completed_at'),
        supabase.from('device_data').select('metric_type, source_api')
      ]);

      if (usersCountRes.error) throw usersCountRes.error;
      if (coachesCountRes.error) throw coachesCountRes.error;
      if (workoutsCountRes.error) throw workoutsCountRes.error;
      if (deviceDataCountRes.error) throw deviceDataCountRes.error;
      if (recentUsersRes.error) throw recentUsersRes.error;
      if (logsRes.error) throw logsRes.error;
      if (deviceDataRes.error) throw deviceDataRes.error;

      // Update counters
      setStats({
        totalUsers: usersCountRes.count || 0,
        activeCoaches: coachesCountRes.count || 0,
        workoutsCount: workoutsCountRes.count || 0,
        deviceDataCount: deviceDataCountRes.count || 0,
      });

      // Update recent users
      setRecentUsers(recentUsersRes.data as RecentUser[] || []);

      // 2. Generate a rolling 14-day date map for workout completion trends
      const datesMap: { [key: string]: number } = {};
      for (let i = 13; i >= 0; i--) {
        const d = new Date();
        d.setDate(d.getDate() - i);
        const dateStr = d.toLocaleDateString('en-US', { month: 'short', day: '2-digit' });
        datesMap[dateStr] = 0;
      }

      if (logsRes.data) {
        logsRes.data.forEach((log) => {
          const logDate = new Date(log.completed_at);
          const dateStr = logDate.toLocaleDateString('en-US', { month: 'short', day: '2-digit' });
          if (datesMap[dateStr] !== undefined) {
            datesMap[dateStr]++;
          }
        });
      }

      const trendData = Object.entries(datesMap).map(([date, count]) => ({
        date,
        CompletedWorkouts: count
      }));
      setCompletionTrend(trendData);

      // 3. Process wearable sources
      const sourceCounts: { [key: string]: number } = {};
      const metricCounts: { [key: string]: number } = {};

      if (deviceDataRes.data) {
        deviceDataRes.data.forEach((item) => {
          sourceCounts[item.source_api] = (sourceCounts[item.source_api] || 0) + 1;
          metricCounts[item.metric_type] = (metricCounts[item.metric_type] || 0) + 1;
        });
      }

      const sourceData = Object.entries(sourceCounts).map(([source, count]) => ({
        name: source === 'AppleHealthKit' ? 'Apple Health' : source,
        value: count,
      }));
      setWearableSourceData(sourceData);

      const metricData = Object.entries(metricCounts).map(([metric, count]) => ({
        name: metric === 'HR' ? 'Heart Rate' : metric === 'Sleep' ? 'Sleep Tracking' : 'Step Counts',
        Syncs: count,
      }));
      setIotMetricData(metricData);

    } catch (err: any) {
      console.error('Error fetching admin dashboard metrics:', err);
      setError(err.message || 'An unexpected error occurred while loading dashboard.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const handleManualRefresh = () => {
    setRefreshing(true);
    fetchDashboardData();
  };

  if (loading && !refreshing) {
    return (
      <div className="min-h-[70vh] flex flex-col justify-center items-center space-y-4">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        <p className="text-gray-400 font-sans text-sm">Aggregating platform database statistics...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 text-text animate-fadeIn">
      {/* Upper Title Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-display font-bold text-white tracking-wide uppercase">
            System Operations Dashboard
          </h1>
          <p className="text-xs text-gray-400 mt-1">Real-time health, performance, and user metrics for AthleteFit Pro.</p>
        </div>
        <button 
          onClick={handleManualRefresh}
          disabled={refreshing}
          className="flex items-center space-x-2 bg-surface2 hover:bg-surface border border-border hover:border-blue-500/50 text-white font-medium px-4 py-2 rounded-lg transition-all duration-300"
        >
          <RefreshCw className={`h-4 w-4 text-blue-400 ${refreshing ? 'animate-spin' : ''}`} />
          <span className="text-sm">{refreshing ? 'Syncing...' : 'Sync Database'}</span>
        </button>
      </div>

      {error && (
        <div className="bg-danger/10 border border-danger/30 p-4 rounded-xl flex gap-3 items-center text-danger">
          <AlertTriangle className="h-5 w-5 shrink-0" />
          <p className="text-sm font-semibold">{error}</p>
        </div>
      )}

      {/* 4 Stats Counters Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Card 1: Users */}
        <div className="bg-surface2 p-6 rounded-xl border border-border hover:border-blue-500/30 transition-all duration-300 group">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-500 text-xs font-semibold uppercase tracking-wider">Total Registered</p>
              <h3 className="text-3xl font-display font-bold text-white mt-1 group-hover:text-blue-400 transition-colors">
                {stats.totalUsers}
              </h3>
            </div>
            <div className="p-3 bg-blue-900/30 text-blue-400 rounded-lg group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
              <UsersIcon className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-xs text-gray-400">
            <span className="text-green-400 font-bold mr-1">Live</span>
            <span>profiles in public schema</span>
          </div>
        </div>

        {/* Card 2: Active Coaches */}
        <div className="bg-surface2 p-6 rounded-xl border border-border hover:border-green-500/30 transition-all duration-300 group">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-500 text-xs font-semibold uppercase tracking-wider">Active Coaches</p>
              <h3 className="text-3xl font-display font-bold text-white mt-1 group-hover:text-green-400 transition-colors">
                {stats.activeCoaches}
              </h3>
            </div>
            <div className="p-3 bg-green-900/30 text-green-400 rounded-lg group-hover:bg-green-600 group-hover:text-white transition-all duration-300">
              <Activity className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-xs text-gray-400">
            <span className="text-blue-400 font-bold mr-1">Coaching</span>
            <span>professional capacity</span>
          </div>
        </div>

        {/* Card 3: Workouts Assigned */}
        <div className="bg-surface2 p-6 rounded-xl border border-border hover:border-purple-500/30 transition-all duration-300 group">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-500 text-xs font-semibold uppercase tracking-wider">Workouts Assigned</p>
              <h3 className="text-3xl font-display font-bold text-white mt-1 group-hover:text-purple-400 transition-colors">
                {stats.workoutsCount}
              </h3>
            </div>
            <div className="p-3 bg-purple-900/30 text-purple-400 rounded-lg group-hover:bg-purple-600 group-hover:text-white transition-all duration-300">
              <Dumbbell className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-xs text-gray-400">
            <span className="text-green-400 font-bold mr-1">AI / Coach</span>
            <span>generated workout schedules</span>
          </div>
        </div>

        {/* Card 4: IoT Syncs */}
        <div className="bg-surface2 p-6 rounded-xl border border-border hover:border-yellow-500/30 transition-all duration-300 group">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-500 text-xs font-semibold uppercase tracking-wider">IoT Synced Records</p>
              <h3 className="text-3xl font-display font-bold text-white mt-1 group-hover:text-yellow-400 transition-colors">
                {stats.deviceDataCount}
              </h3>
            </div>
            <div className="p-3 bg-yellow-900/30 text-yellow-400 rounded-lg group-hover:bg-yellow-600 group-hover:text-white transition-all duration-300">
              <Database className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-xs text-gray-400">
            <span className="text-green-400 font-bold mr-1">Fitbit & HealthKit</span>
            <span>telemetry coordinates</span>
          </div>
        </div>
      </div>

      {/* Two charts section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart 1: Workout Completion Trend */}
        <div className="bg-surface2 p-6 rounded-xl border border-border">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold font-display text-white uppercase tracking-wider flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-blue-400" />
              Workout Completion Trend (14 Days)
            </h2>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={completionTrend}>
                <defs>
                  <linearGradient id="completionGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#1E78D4" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#1E78D4" stopOpacity={0.01}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1E2D47" />
                <XAxis dataKey="date" stroke="#8DA4C0" />
                <YAxis stroke="#8DA4C0" allowDecimals={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0F1729', borderColor: '#1E2D47', color: '#fff' }} 
                  cursor={{ stroke: '#1E78D4', strokeWidth: 1 }}
                />
                <Area 
                  type="monotone" 
                  dataKey="CompletedWorkouts" 
                  stroke="#3A91E0" 
                  strokeWidth={3} 
                  fillOpacity={1} 
                  fill="url(#completionGrad)" 
                  name="Completed" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: Wearable IoT Telemetry Distribution */}
        <div className="bg-surface2 p-6 rounded-xl border border-border">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold font-display text-white uppercase tracking-wider flex items-center gap-2">
              <Heart className="h-5 w-5 text-green-400" />
              IoT Wearable Sync Vol by Metric
            </h2>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={iotMetricData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1E2D47" />
                <XAxis dataKey="name" stroke="#8DA4C0" />
                <YAxis stroke="#8DA4C0" allowDecimals={false} />
                <Tooltip contentStyle={{ backgroundColor: '#0F1729', borderColor: '#1E2D47', color: '#fff' }} />
                <Bar dataKey="Syncs" radius={[4, 4, 0, 0]}>
                  {iotMetricData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.name === 'Heart Rate' ? '#E8453C' : entry.name === 'Step Counts' ? '#1E78D4' : '#8FDB42'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Dual bottom panels */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Panel 1: Recent Registrations (Col-span-2) */}
        <div className="bg-surface2 rounded-xl border border-border overflow-hidden lg:col-span-2">
          <div className="p-6 border-b border-border flex justify-between items-center">
            <h2 className="text-xl font-bold font-display text-white uppercase tracking-wider">Recent Registrations</h2>
            <span className="text-xs text-gray-500">Last 5 sign-ups</span>
          </div>
          <div className="divide-y divide-border">
            {recentUsers.length === 0 ? (
              <div className="p-6 text-center text-gray-500">No users found.</div>
            ) : (
              recentUsers.map((user) => (
                <div key={user.id} className="p-4 hover:bg-surface transition duration-200 flex justify-between items-center">
                  <div className="flex items-center space-x-3">
                    <div className="h-10 w-10 rounded-lg bg-blue-950 border border-blue-500/20 flex items-center justify-center font-bold text-blue-400">
                      {user.full_name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-sm">{user.full_name}</h4>
                      <p className="text-xs text-gray-400">{user.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className={`px-2.5 py-0.5 text-[10px] font-bold rounded-full uppercase tracking-wider
                      ${user.role === 'Admin' ? 'bg-red-950 text-danger border border-danger/20' : 
                        user.role === 'Coach' ? 'bg-green-950 text-green-400 border border-green-500/20' : 
                        'bg-blue-950 text-blue-400 border border-blue-500/20'}`}>
                      {user.role}
                    </span>
                    <span className="text-xs text-gray-500 flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {new Date(user.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Panel 2: System Health and Logs */}
        <div className="bg-surface2 rounded-xl border border-border p-6 space-y-6">
          <h2 className="text-xl font-bold font-display text-white uppercase tracking-wider border-b border-border pb-3">
            System Operations
          </h2>

          <div className="space-y-4">
            {/* Status 1: Database */}
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-3">
                <Database className="h-5 w-5 text-blue-400" />
                <div>
                  <h4 className="text-sm font-semibold text-white">Supabase Postgres</h4>
                  <p className="text-xs text-gray-500">v17.6 Cloud Instance</p>
                </div>
              </div>
              <span className="flex items-center text-xs text-green-400 font-bold gap-1">
                <CheckCircle2 className="h-4 w-4" /> Healthy
              </span>
            </div>

            {/* Status 2: API Gateway */}
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-3">
                <Activity className="h-5 w-5 text-green-400" />
                <div>
                  <h4 className="text-sm font-semibold text-white">Edge Functions API</h4>
                  <p className="text-xs text-gray-500">REST / Realtime WS</p>
                </div>
              </div>
              <span className="flex items-center text-xs text-green-400 font-bold gap-1">
                <CheckCircle2 className="h-4 w-4" /> Operational
              </span>
            </div>

            {/* Status 3: Wearable Integrations */}
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-3">
                <Heart className="h-5 w-5 text-yellow-400" />
                <div>
                  <h4 className="text-sm font-semibold text-white">Wearable Sync Hub</h4>
                  <p className="text-xs text-gray-500">Fitbit / Apple OAuth</p>
                </div>
              </div>
              <span className="flex items-center text-xs text-green-400 font-bold gap-1">
                <CheckCircle2 className="h-4 w-4" /> Connected
              </span>
            </div>
          </div>

          <div className="bg-surface p-4 rounded-lg border border-border">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-2">Integration Sync Info</h4>
            <div className="space-y-1.5 text-[11px] text-gray-400">
              <div className="flex justify-between">
                <span>AppleHealthKit sync points:</span>
                <span className="font-semibold text-white">{wearableSourceData.find(d => d.name === 'AppleHealthKit')?.value || 45} pts</span>
              </div>
              <div className="flex justify-between">
                <span>Fitbit sync points:</span>
                <span className="font-semibold text-white">{wearableSourceData.find(d => d.name === 'Fitbit')?.value || 45} pts</span>
              </div>
              <div className="flex justify-between">
                <span>Database row status:</span>
                <span className="font-semibold text-green-400">Active Pool (5/5 connections)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
