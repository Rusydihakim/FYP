import { useState } from 'react';
import { 
  Flame, 
  Heart, 
  CheckCircle2, 
  AlertTriangle, 
  RefreshCw, 
  Download, 
  Play, 
  Watch, 
  Activity, 
  Award, 
  Plus, 
  Clock, 
  Dumbbell, 
  Info,
  Radio,
  Sparkles,
  Zap,
  Check
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer,
  CartesianGrid
} from 'recharts';
import { useAuth } from '../../hooks/useAuth';
import { Link } from 'react-router-dom';

export default function AthleteDashboard() {
  const { profile } = useAuth();
  const [timeframe, setTimeframe] = useState<'Daily' | 'Weekly' | 'Monthly'>('Weekly');
  const [synced, setSynced] = useState(false);

  const athleteName = profile?.full_name?.split(' ')[0] || 'Afiq';

  // Kinematic performance trend data
  const trendData = [
    { day: 'Mon', formScore: 72, strainIndex: 65, formPercent: '72%' },
    { day: 'Tue', formScore: 78, strainIndex: 70, formPercent: '78%' },
    { day: 'Wed', formScore: 80, strainIndex: 75, formPercent: '80%' },
    { day: 'Thu', formScore: 83, strainIndex: 78, formPercent: '83%' },
    { day: 'Fri', formScore: 94, strainIndex: 89, formPercent: '94%' },
    { day: 'Sat', formScore: 88, strainIndex: 82, formPercent: '88%' },
    { day: 'Sun', formScore: 86, strainIndex: 76, formPercent: '86%' },
  ];

  const handleSync = () => {
    setSynced(true);
    setTimeout(() => setSynced(false), 3000);
  };

  return (
    <div className="space-y-6 text-[#EEF3FA] max-w-[1600px] mx-auto pb-12">
      
      {/* ──────────────── 1. HERO GREETING BANNER ──────────────── */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-[#091224] border border-[#162744] p-6 rounded-2xl relative overflow-hidden shadow-lg">
        {/* Glow effect */}
        <div className="absolute -top-10 -left-10 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <div>
          <div className="flex items-center space-x-2 text-[10px] font-mono tracking-widest text-cyan-400 uppercase font-semibold mb-1">
            <Zap className="h-3 w-3" />
            <span>PERFORMANCE OPTIMIZATION READY / SESSION BLOCK 04</span>
          </div>

          <h1 className="text-3xl font-display font-extrabold text-white tracking-tight">
            Good Morning, <span className="text-cyan-400">{athleteName}!</span>
          </h1>

          <p className="text-xs sm:text-sm text-gray-400 mt-1">
            Ready for today's high-velocity strength protocol?
          </p>

          {/* Status Pills */}
          <div className="flex flex-wrap items-center gap-2 mt-4">
            <div className="flex items-center space-x-1.5 px-3 py-1 rounded-full bg-[#0E1A33] border border-green-500/30 text-[11px] font-mono text-green-400">
              <span className="h-1.5 w-1.5 rounded-full bg-green-400" />
              <span>Recovery: 92% Optimal</span>
            </div>

            <div className="flex items-center space-x-1.5 px-3 py-1 rounded-full bg-[#0E1A33] border border-cyan-500/30 text-[11px] font-mono text-cyan-300">
              <span>🌙 Sleep Quality: 7h 45m</span>
            </div>

            <div className="flex items-center space-x-1.5 px-3 py-1 rounded-full bg-[#0E1A33] border border-blue-500/30 text-[11px] font-mono text-blue-300">
              <Zap className="h-3 w-3 text-cyan-400" />
              <span>Readiness: Peak Stage</span>
            </div>
          </div>
        </div>

        {/* Controls: Daily/Weekly Toggle + Actions */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 lg:self-end">
          {/* Segmented Filter */}
          <div className="bg-[#060D1C] p-1 rounded-xl border border-[#14233D] flex text-xs font-semibold">
            {(['Daily', 'Weekly', 'Monthly'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setTimeframe(tab)}
                className={`px-3.5 py-1.5 rounded-lg transition-all cursor-pointer ${
                  timeframe === tab
                    ? 'bg-[#15325B] text-cyan-300 shadow-sm'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handleSync}
              className="px-3 py-2 bg-[#0B172E] hover:bg-[#122447] border border-cyan-500/30 text-cyan-300 rounded-xl text-xs font-mono font-medium flex items-center space-x-1.5 transition-colors cursor-pointer"
            >
              <RefreshCw className={`h-3.5 w-3.5 ${synced ? 'animate-spin text-green-400' : ''}`} />
              <span>{synced ? 'Synced!' : 'Sync IoT'}</span>
            </button>

            <button className="px-3 py-2 bg-[#0B172E] hover:bg-[#122447] border border-[#182C50] text-gray-300 hover:text-white rounded-xl text-xs font-mono font-medium flex items-center space-x-1.5 transition-colors cursor-pointer">
              <Download className="h-3.5 w-3.5" />
              <span>Telemetry</span>
            </button>
          </div>
        </div>
      </div>

      {/* ──────────────── 2. FOUR PRIMARY STAT CARDS ──────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Workouts */}
        <div className="bg-[#091224] border border-[#162744] p-5 rounded-2xl flex flex-col justify-between relative overflow-hidden">
          <div>
            <div className="flex justify-between items-center mb-3">
              <span className="text-[11px] font-mono text-gray-400 uppercase font-semibold flex items-center space-x-1">
                <Dumbbell className="h-3.5 w-3.5 text-cyan-400 mr-1" /> WORKOUTS
              </span>
              <span className="text-[10px] font-mono text-green-400 bg-green-950/60 border border-green-500/30 px-1.5 py-0.5 rounded font-bold">
                +2 wk
              </span>
            </div>

            <div className="flex items-baseline space-x-2">
              <span className="text-3xl font-display font-extrabold text-white">6</span>
              <span className="text-xs text-gray-400">sessions</span>
              {/* Mini sparkline */}
              <div className="ml-auto w-16 h-6">
                <svg viewBox="0 0 60 20" className="w-full h-full stroke-cyan-400 fill-none" strokeWidth="2">
                  <path d="M0,15 Q15,18 30,10 T60,5" />
                </svg>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-[#13223B] flex justify-between text-[11px] font-mono">
            <span className="text-gray-400">Target: 7 / week</span>
            <span className="text-cyan-400 font-semibold">86% of goal</span>
          </div>
        </div>

        {/* Card 2: Burned */}
        <div className="bg-[#091224] border border-[#162744] p-5 rounded-2xl flex flex-col justify-between relative overflow-hidden">
          <div>
            <div className="flex justify-between items-center mb-3">
              <span className="text-[11px] font-mono text-gray-400 uppercase font-semibold flex items-center space-x-1">
                <Flame className="h-3.5 w-3.5 text-amber-400 mr-1" /> BURNED
              </span>
              <span className="text-[10px] font-mono text-amber-400 bg-amber-950/60 border border-amber-500/30 px-1.5 py-0.5 rounded font-bold">
                +12% vs avg
              </span>
            </div>

            <div className="flex items-baseline space-x-2">
              <span className="text-3xl font-display font-extrabold text-white">3,452</span>
              <span className="text-xs text-gray-400 font-mono">kcal</span>
              <div className="ml-auto text-right">
                <span className="text-[9px] font-mono text-gray-500 block">TODAY</span>
                <span className="text-xs font-mono text-green-400 font-bold">512 kcal</span>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-[#13223B] flex justify-between text-[11px] font-mono">
            <span className="text-gray-400">Daily Baseline: 2,400</span>
            <span className="text-green-400 font-semibold">High Metabolic Burn</span>
          </div>
        </div>

        {/* Card 3: Time Active */}
        <div className="bg-[#091224] border border-[#162744] p-5 rounded-2xl flex flex-col justify-between relative overflow-hidden">
          <div>
            <div className="flex justify-between items-center mb-3">
              <span className="text-[11px] font-mono text-gray-400 uppercase font-semibold flex items-center space-x-1">
                <Clock className="h-3.5 w-3.5 text-green-400 mr-1" /> TIME ACTIVE
              </span>
              <span className="text-[10px] font-mono text-green-400 bg-green-950/60 border border-green-500/30 px-1.5 py-0.5 rounded font-bold">
                ↑ 18%
              </span>
            </div>

            <div className="flex items-baseline space-x-2">
              <span className="text-3xl font-display font-extrabold text-white">4h 32m</span>
              {/* Mini sparkline */}
              <div className="ml-auto w-16 h-6">
                <svg viewBox="0 0 60 20" className="w-full h-full stroke-green-400 fill-none" strokeWidth="2">
                  <path d="M0,18 Q15,10 30,12 T60,4" />
                </svg>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-[#13223B] flex justify-between text-[11px] font-mono">
            <span className="text-gray-400">Weekly Target: 5h 00m</span>
            <span className="text-cyan-400 font-semibold">Zone 4: 52 mins</span>
          </div>
        </div>

        {/* Card 4: Avg Heart Rate */}
        <div className="bg-[#091224] border border-[#162744] p-5 rounded-2xl flex flex-col justify-between relative overflow-hidden">
          <div>
            <div className="flex justify-between items-center mb-3">
              <span className="text-[11px] font-mono text-gray-400 uppercase font-semibold flex items-center space-x-1">
                <Heart className="h-3.5 w-3.5 text-red-400 mr-1" /> AVG HEART RATE
              </span>
              <span className="text-[10px] font-mono text-red-400 bg-red-950/60 border border-red-500/30 px-1.5 py-0.5 rounded font-bold flex items-center space-x-1">
                <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-ping" />
                <span>LIVE</span>
              </span>
            </div>

            <div className="flex items-baseline space-x-2">
              <span className="text-3xl font-display font-extrabold text-white">128</span>
              <span className="text-xs text-gray-400 font-mono">bpm</span>
              <div className="ml-auto text-right">
                <span className="text-[9px] font-mono text-gray-500 block">RESTING / PEAK</span>
                <span className="text-xs font-mono text-white font-bold">54 / 172 <span className="text-[9px] text-gray-500">bpm</span></span>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-[#13223B] flex justify-between text-[11px] font-mono">
            <span className="text-gray-400">HRV Baseline: 78 ms</span>
            <span className="text-green-400 font-semibold">Aerobic Efficiency A+</span>
          </div>
        </div>
      </div>

      {/* ──────────────── 3. PERFORMANCE TREND CHART & BIOMETRIC DIAL ──────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* Left (8 Cols): Performance Trend & Biometric Load */}
        <div className="lg:col-span-8 bg-[#091224] border border-[#162744] rounded-2xl p-6 flex flex-col justify-between shadow-md">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
            <div>
              <h2 className="text-lg font-display font-bold text-white flex items-center space-x-2">
                <Activity className="h-4 w-4 text-cyan-400" />
                <span>Performance Trend & Biometric Load</span>
              </h2>
              <p className="text-xs text-gray-400 mt-0.5 font-mono">
                12 – 18 May 2026 • Real-Time AI Kinematic Tracking
              </p>
            </div>

            {/* Legend & Current Tag */}
            <div className="flex items-center space-x-4 text-xs font-mono">
              <div className="flex items-center space-x-1.5">
                <span className="w-2 h-2 rounded-full bg-cyan-400" />
                <span className="text-gray-300">Form Score</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <span className="w-2 h-2 rounded-full bg-green-400" />
                <span className="text-gray-300">Strain Index</span>
              </div>
              <span className="bg-[#0F203D] text-cyan-300 text-[10px] px-2 py-0.5 rounded border border-cyan-500/30">
                W1 Current
              </span>
            </div>
          </div>

          {/* Area Chart with custom annotation tooltip */}
          <div className="h-64 w-full relative">
            {/* Custom Tooltip Banner Mock */}
            <div className="absolute top-2 right-20 z-10 bg-[#0A162B]/95 border border-cyan-500/40 p-2.5 rounded-xl shadow-lg text-left text-[10px] font-mono pointer-events-none hidden sm:block">
              <div className="text-cyan-300 font-bold uppercase mb-1">FRIDAY PEAK SESSION</div>
              <div className="text-gray-300 flex items-center space-x-1">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                <span>Form Precision: <strong className="text-white">94%</strong></span>
              </div>
              <div className="text-gray-300 flex items-center space-x-1">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                <span>Cardio Output: <strong className="text-white">168 bpm</strong></span>
              </div>
            </div>

            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="cyanArea" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#22D3EE" stopOpacity={0.35}/>
                    <stop offset="95%" stopColor="#22D3EE" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="greenArea" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4ADE80" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#4ADE80" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#13233D" vertical={false} />
                <XAxis 
                  dataKey="day" 
                  stroke="#4E6788" 
                  tick={{ fill: '#8DA4C0', fontSize: 11 }} 
                  axisLine={{ stroke: '#15243F' }}
                />
                <YAxis 
                  stroke="#4E6788" 
                  tick={{ fill: '#8DA4C0', fontSize: 11 }} 
                  axisLine={{ stroke: '#15243F' }}
                  domain={[50, 100]}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#070E1C', 
                    borderColor: '#192C4E', 
                    borderRadius: '12px',
                    fontSize: '11px',
                    fontFamily: 'monospace',
                    color: '#fff' 
                  }} 
                />
                <Area 
                  type="monotone" 
                  dataKey="strainIndex" 
                  stroke="#4ADE80" 
                  strokeWidth={2} 
                  fillOpacity={1} 
                  fill="url(#greenArea)" 
                />
                <Area 
                  type="monotone" 
                  dataKey="formScore" 
                  stroke="#22D3EE" 
                  strokeWidth={3} 
                  fillOpacity={1} 
                  fill="url(#cyanArea)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Day Ticks breakdown */}
          <div className="grid grid-cols-7 gap-2 pt-4 border-t border-[#13223B] text-center text-[10px] font-mono">
            {trendData.map((d) => (
              <div key={d.day} className="p-1">
                <span className="text-gray-400 block">{d.day}</span>
                <span className={`font-bold ${d.day === 'Fri' ? 'text-green-400' : 'text-gray-300'}`}>
                  {d.formPercent}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right (4 Cols): Biometric Synthesis - Daily Performance */}
        <div className="lg:col-span-4 bg-[#091224] border border-[#162744] rounded-2xl p-6 flex flex-col justify-between shadow-md text-left">
          <div>
            <div className="flex justify-between items-center mb-4">
              <div>
                <span className="text-[9px] font-mono uppercase tracking-widest text-cyan-400 block">
                  BIOMETRIC SYNTHESIS
                </span>
                <h3 className="text-base font-display font-bold text-white">Daily Performance</h3>
              </div>
              <Info className="h-4 w-4 text-gray-500 hover:text-cyan-400 transition-colors cursor-pointer" />
            </div>

            {/* Radial Dial Gauge */}
            <div className="my-6 flex flex-col items-center justify-center">
              <div className="relative h-40 w-40 flex items-center justify-center">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                  {/* Background Track */}
                  <path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#101F3B"
                    strokeWidth="3"
                  />
                  {/* Outer Ring */}
                  <path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="url(#dialGradient2)"
                    strokeWidth="3.2"
                    strokeDasharray="78, 100"
                    strokeLinecap="round"
                  />
                  {/* Inner Track */}
                  <path
                    d="M18 5.0845 a 12.9155 12.9155 0 0 1 0 25.831 a 12.9155 12.9155 0 0 1 0 -25.831"
                    fill="none"
                    stroke="#0C172E"
                    strokeWidth="2"
                  />
                  {/* Inner Ring */}
                  <path
                    d="M18 5.0845 a 12.9155 12.9155 0 0 1 0 25.831 a 12.9155 12.9155 0 0 1 0 -25.831"
                    fill="none"
                    stroke="#22D3EE"
                    strokeWidth="2"
                    strokeDasharray="85, 100"
                    strokeLinecap="round"
                  />
                  <defs>
                    <linearGradient id="dialGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#22D3EE" />
                      <stop offset="100%" stopColor="#4ADE80" />
                    </linearGradient>
                  </defs>
                </svg>

                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className="text-3xl font-bold font-display text-white">78%</span>
                  <span className="text-[9px] font-mono text-green-400 font-bold tracking-wider uppercase">
                    EXCELLENT
                  </span>
                </div>
              </div>

              <p className="text-xs text-gray-400 text-center max-w-[240px] mt-2">
                Afiq's mechanical stability is in the <strong className="text-white">top 4%</strong> of Tier-1 Athletes this week.
              </p>
            </div>

            {/* Metric Bars */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-300 flex items-center">
                  <Activity className="h-3.5 w-3.5 text-cyan-400 mr-2" /> Posture Integrity
                </span>
                <span className="font-mono text-cyan-300 font-bold">94% <span className="text-[10px] text-green-400 font-normal">Great</span></span>
              </div>
              <div className="w-full h-1.5 bg-[#101F3B] rounded-full overflow-hidden">
                <div className="h-full w-[94%] bg-gradient-to-r from-cyan-400 to-green-400 rounded-full" />
              </div>

              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-300 flex items-center">
                  <Zap className="h-3.5 w-3.5 text-green-400 mr-2" /> Strength Output
                </span>
                <span className="font-mono text-green-300 font-bold">85% <span className="text-[10px] text-green-400 font-normal">Good</span></span>
              </div>
              <div className="w-full h-1.5 bg-[#101F3B] rounded-full overflow-hidden">
                <div className="h-full w-[85%] bg-green-400 rounded-full" />
              </div>

              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-300 flex items-center">
                  <Heart className="h-3.5 w-3.5 text-blue-400 mr-2" /> Cardio Endurance
                </span>
                <span className="font-mono text-blue-300 font-bold">81% <span className="text-[10px] text-cyan-400 font-normal">Target</span></span>
              </div>
              <div className="w-full h-1.5 bg-[#101F3B] rounded-full overflow-hidden">
                <div className="h-full w-[81%] bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full" />
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* ──────────────── 4. THREE FEATURE COLUMNS ──────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
        
        {/* Col 1: AI Coach Telemetry */}
        <div className="bg-[#091224] border border-[#162744] rounded-2xl p-5 flex flex-col justify-between shadow-md text-left">
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-sm font-display font-bold text-white flex items-center space-x-2">
                <Sparkles className="h-4 w-4 text-cyan-400" />
                <span>AI Coach Telemetry</span>
              </h3>
              <span className="text-[10px] font-mono text-cyan-300 bg-cyan-950/60 border border-cyan-500/30 px-2 py-0.5 rounded font-semibold">
                VISION V4.2
              </span>
            </div>

            {/* Video Frame Simulation */}
            <div className="relative rounded-xl overflow-hidden border border-[#182C50] bg-[#040814] aspect-video flex items-center justify-center mb-4">
              {/* Camera Grid & HUD */}
              <div className="absolute top-2 left-2 text-[9px] font-mono text-red-400 bg-black/60 px-1.5 py-0.5 rounded flex items-center space-x-1">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />
                <span>REC • 60 FPS</span>
              </div>
              <div className="absolute top-2 right-2 text-[9px] font-mono text-gray-400 bg-black/60 px-1.5 py-0.5 rounded">
                SQUAT_ANALYSIS_02
              </div>

              {/* Skeletal Pose Graphic */}
              <svg viewBox="0 0 160 100" className="w-36 h-auto opacity-90">
                <circle cx="80" cy="20" r="6" fill="none" stroke="#22D3EE" strokeWidth="2" />
                <line x1="80" y1="26" x2="80" y2="55" stroke="#4ADE80" strokeWidth="2.5" />
                <line x1="80" y1="35" x2="55" y2="30" stroke="#22D3EE" strokeWidth="2" />
                <line x1="80" y1="35" x2="105" y2="30" stroke="#22D3EE" strokeWidth="2" />
                <line x1="80" y1="55" x2="60" y2="75" stroke="#4ADE80" strokeWidth="2" />
                <line x1="60" y1="75" x2="70" y2="95" stroke="#4ADE80" strokeWidth="2" />
                <line x1="80" y1="55" x2="100" y2="75" stroke="#4ADE80" strokeWidth="2" />
                <line x1="100" y1="75" x2="90" y2="95" stroke="#4ADE80" strokeWidth="2" />
                <circle cx="60" cy="75" r="2.5" fill="#22D3EE" />
                <circle cx="100" cy="75" r="2.5" fill="#22D3EE" />
              </svg>

              <div className="absolute bottom-2 left-2 right-2 flex justify-between text-[9px] font-mono text-cyan-300 bg-black/70 px-2 py-1 rounded">
                <span>• Knee Flexion: 91°</span>
                <span className="text-green-400 font-bold">Depth: Valid</span>
              </div>
            </div>

            {/* Checklist */}
            <div className="space-y-2 text-xs">
              <div className="flex items-start space-x-2 text-gray-300">
                <CheckCircle2 className="h-4 w-4 text-green-400 shrink-0 mt-0.5" />
                <span>Knees tracked parallel over toe path</span>
              </div>
              <div className="flex items-start space-x-2 text-amber-300/90">
                <AlertTriangle className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
                <span>Minor lumbar shift noted at Rep 8 lockout</span>
              </div>
            </div>
          </div>

          <button className="mt-6 w-full py-2.5 px-3 bg-[#0E1A33] hover:bg-[#14264A] border border-cyan-500/30 text-cyan-300 rounded-xl text-xs font-mono font-semibold transition-colors flex items-center justify-center space-x-1.5 cursor-pointer">
            <Play className="h-3.5 w-3.5 text-cyan-400 fill-cyan-400" />
            <span>Open Full Kinematic Telemetry</span>
          </button>
        </div>

        {/* Col 2: Prescribed Workout */}
        <div className="bg-[#091224] border border-[#162744] rounded-2xl p-5 flex flex-col justify-between shadow-md text-left">
          <div>
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-sm font-display font-bold text-white flex items-center space-x-2">
                <Dumbbell className="h-4 w-4 text-green-400" />
                <span>Prescribed Workout</span>
              </h3>
              <Link to="/dashboard/workouts" className="text-xs text-cyan-400 hover:underline">
                Change
              </Link>
            </div>

            {/* Workout Header Pill */}
            <div className="bg-[#0D1830] border border-[#182C50] rounded-xl p-3.5 mb-4">
              <span className="text-[9px] font-mono text-cyan-400 uppercase font-bold block mb-1">
                INTERMEDIATE PHASE 2
              </span>
              <h4 className="text-sm font-bold text-white">Full Body Power & Hypertrophy</h4>
              <div className="flex items-center space-x-3 text-[11px] font-mono text-gray-400 mt-2">
                <span>⏱ 45 mins</span>
                <span>🔥 512 kcal</span>
                <span>🏋️ 4 Sets</span>
              </div>
            </div>

            {/* Exercise List */}
            <div className="space-y-2.5 text-xs font-mono">
              <div className="bg-[#070E1C] p-2.5 rounded-lg border border-[#152744] flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="text-gray-500 font-bold">01</span>
                  <div>
                    <span className="text-white font-medium block">Barbell Back Squats</span>
                    <span className="text-[10px] text-gray-400">4 sets × 8 reps @ 110 kg</span>
                  </div>
                </div>
                <Check className="h-4 w-4 text-green-400" />
              </div>

              <div className="bg-[#0B1A35] p-2.5 rounded-lg border border-cyan-500/40 flex items-center justify-between shadow-sm">
                <div className="flex items-center space-x-2">
                  <span className="text-cyan-400 font-bold">02</span>
                  <div>
                    <span className="text-white font-medium block">Incline DB Bench Press</span>
                    <span className="text-[10px] text-cyan-300">3 sets × 10 reps @ 34 kg</span>
                  </div>
                </div>
                <Play className="h-3.5 w-3.5 text-cyan-400 fill-cyan-400" />
              </div>

              <div className="bg-[#070E1C] p-2.5 rounded-lg border border-[#152744] flex items-center justify-between opacity-75">
                <div className="flex items-center space-x-2">
                  <span className="text-gray-500 font-bold">03</span>
                  <div>
                    <span className="text-white font-medium block">Neutral Grip Pull-ups</span>
                    <span className="text-[10px] text-gray-400">4 sets × To Failure</span>
                  </div>
                </div>
                <span className="text-[9px] text-gray-500 font-bold">UP NEXT</span>
              </div>
            </div>
          </div>

          <Link
            to="/dashboard/workouts"
            className="mt-6 w-full py-2.5 px-3 bg-gradient-to-r from-cyan-400 to-cyan-300 hover:from-cyan-300 hover:to-green-300 text-slate-950 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center space-x-1.5 shadow-[0_0_20px_rgba(6,182,212,0.3)]"
          >
            <Clock className="h-3.5 w-3.5" />
            <span>Launch Assisted Workout</span>
          </Link>
        </div>

        {/* Col 3: Connected Devices */}
        <div className="bg-[#091224] border border-[#162744] rounded-2xl p-5 flex flex-col justify-between shadow-md text-left">
          <div>
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-sm font-display font-bold text-white flex items-center space-x-2">
                <Radio className="h-4 w-4 text-cyan-400" />
                <span>Connected Devices</span>
              </h3>
              <button className="h-6 w-6 rounded-md bg-[#0C172E] border border-[#182C50] text-gray-400 hover:text-white flex items-center justify-center text-xs cursor-pointer">
                <Plus className="h-3.5 w-3.5" />
              </button>
            </div>

            {/* Devices List */}
            <div className="space-y-2.5 text-xs">
              <div className="bg-[#070E1C] p-2.5 rounded-xl border border-[#152744] flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Watch className="h-5 w-5 text-cyan-400" />
                  <div>
                    <p className="font-medium text-white">Apple Watch Series 9</p>
                    <p className="text-[10px] text-green-400 font-mono">• Ultra-Sync Active • 85% Battery</p>
                  </div>
                </div>
                <div className="w-2 h-2 rounded-full bg-green-400" />
              </div>

              <div className="bg-[#070E1C] p-2.5 rounded-xl border border-[#152744] flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Heart className="h-5 w-5 text-red-400" />
                  <div>
                    <p className="font-medium text-white">Polar H10 Chest Strap</p>
                    <p className="text-[10px] text-green-400 font-mono">• Streaming 128 bpm • Live ECG</p>
                  </div>
                </div>
                <div className="w-2 h-2 rounded-full bg-green-400" />
              </div>

              <div className="bg-[#070E1C] p-2.5 rounded-xl border border-[#152744] flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Activity className="h-5 w-5 text-purple-400" />
                  <div>
                    <p className="font-medium text-white">Withings Smart Body Scan</p>
                    <p className="text-[10px] text-gray-400 font-mono">Last Weigh-In: 07:15 AM (78.4 kg)</p>
                  </div>
                </div>
                <span className="text-[10px] font-mono text-cyan-400 font-bold">11.8% BF</span>
              </div>

              <div className="bg-[#070E1C] p-2.5 rounded-xl border border-[#152744] flex items-center justify-between opacity-80">
                <div className="flex items-center space-x-3">
                  <Flame className="h-5 w-5 text-blue-400" />
                  <div>
                    <p className="font-medium text-white">Smart Hydration Bottle</p>
                    <p className="text-[10px] text-gray-500 font-mono">Standby • 1.6L consumed</p>
                  </div>
                </div>
                <span className="text-[10px] font-mono text-gray-500">PAIRED</span>
              </div>
            </div>
          </div>

          <button className="mt-6 w-full py-2.5 px-3 bg-[#0E1A33] hover:bg-[#14264A] border border-cyan-500/30 text-cyan-300 rounded-xl text-xs font-mono font-semibold transition-colors flex items-center justify-center space-x-1.5 cursor-pointer">
            <Radio className="h-3.5 w-3.5 text-cyan-400" />
            <span>Pair New Biometric Peripheral</span>
          </button>
        </div>

      </div>

      {/* ──────────────── 5. BOTTOM ACHIEVEMENTS & DRILLS BAR ──────────────── */}
      <div className="bg-[#070D1A] border border-[#162642] rounded-2xl p-4 sm:p-5 flex flex-col lg:flex-row items-center justify-between gap-6 text-left">
        {/* 3 Badges */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full lg:w-auto">
          {/* Badge 1 */}
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 rounded-xl bg-[#0F1E38] border border-amber-500/40 flex items-center justify-center text-amber-400 shrink-0 shadow-sm">
              <Award className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-white">Consistency Beast</p>
              <p className="text-[10px] text-cyan-400 font-mono">14-Day Perfect Streak</p>
            </div>
          </div>

          {/* Badge 2 */}
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 rounded-xl bg-[#0F1E38] border border-cyan-500/40 flex items-center justify-center text-cyan-400 shrink-0 shadow-sm">
              <Activity className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-white">VO2 Max Elite</p>
              <p className="text-[10px] text-green-400 font-mono">58.4 ml/kg/min</p>
            </div>
          </div>

          {/* Badge 3 */}
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 rounded-xl bg-[#0F1E38] border border-green-500/40 flex items-center justify-center text-green-400 shrink-0 shadow-sm">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-white">Workout Master</p>
              <p className="text-[10px] text-gray-400 font-mono">Level 18 Pro (2,450 / 3,000 XP)</p>
            </div>
          </div>
        </div>

        {/* Right CTA buttons */}
        <div className="flex items-center space-x-3 shrink-0 w-full sm:w-auto justify-end">
          <button className="px-4 py-2.5 bg-[#0C1830] hover:bg-[#122345] border border-[#1A2E52] text-gray-300 hover:text-white rounded-xl text-xs font-mono font-medium transition-colors cursor-pointer">
            View All 24 Badges
          </button>

          <Link
            to="/dashboard/workouts"
            className="px-5 py-2.5 bg-gradient-to-r from-green-500 to-emerald-400 hover:from-green-400 hover:to-emerald-300 text-slate-950 font-bold text-xs rounded-xl flex items-center space-x-1.5 shadow-[0_0_20px_rgba(74,222,128,0.3)] transition-all"
          >
            <Plus className="h-3.5 w-3.5 stroke-[3]" />
            <span>Log Completed Drills</span>
          </Link>
        </div>
      </div>

    </div>
  );
}
