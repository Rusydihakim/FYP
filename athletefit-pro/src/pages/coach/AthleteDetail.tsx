import { useParams, Link } from 'react-router-dom';
import { Activity, Heart, ArrowLeft, MessageSquare, PlusSquare } from 'lucide-react';

export default function AthleteDetail() {
  const { id } = useParams();
  
  // Mock Data
  const athlete = {
    id,
    full_name: 'Sarah Connor',
    age: 28,
    fitness_level: 'Advanced',
    goals: 'Increase endurance, train for marathon',
    weight: '62 kg',
    height: '168 cm'
  };

  return (
    <div className="space-y-6 text-text">
      <Link to="/coach/athletes" className="text-gray-400 hover:text-white inline-flex items-center text-sm transition">
        <ArrowLeft className="h-4 w-4 mr-1" /> Back to Athletes
      </Link>

      <div className="bg-surface2 rounded-xl border border-border p-6 md:p-8 flex flex-col md:flex-row gap-6 md:items-center justify-between">
        <div className="flex items-center gap-6">
          <div className="h-20 w-20 rounded-full bg-blue-900 border-2 border-blue-500 flex items-center justify-center text-blue-200 text-2xl font-bold">
            {athlete.full_name.charAt(0)}
          </div>
          <div>
            <h1 className="text-3xl font-display font-bold text-white">{athlete.full_name}</h1>
            <div className="flex gap-4 mt-2 text-sm text-gray-400">
              <span>{athlete.age} yrs</span>
              <span>•</span>
              <span>{athlete.weight}</span>
              <span>•</span>
              <span className="text-green-400">{athlete.fitness_level}</span>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col gap-2 min-w-[200px]">
          <button className="flex items-center justify-center w-full px-4 py-2 bg-blue-500 hover:bg-blue-400 text-bg font-semibold rounded-lg transition">
            <MessageSquare className="h-4 w-4 mr-2" /> Message Athlete
          </button>
          <button className="flex items-center justify-center w-full px-4 py-2 bg-surface border border-border hover:bg-surface2 text-gray-300 font-semibold rounded-lg transition">
            <PlusSquare className="h-4 w-4 mr-2" /> Assign Plan
          </button>
        </div>
      </div>

      {/* Tabs Placeholder */}
      <div className="border-b border-border">
        <nav className="-mb-px flex space-x-8">
          {['Overview', 'Workouts', 'Health Data', 'Feedback'].map((tab, idx) => (
            <button
              key={tab}
              className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                idx === 0
                  ? 'border-green-500 text-green-400'
                  : 'border-transparent text-gray-500 hover:text-gray-300 hover:border-gray-300'
              }`}
            >
              {tab}
            </button>
          ))}
        </nav>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-surface2 rounded-xl border border-border p-6">
             <h2 className="text-xl font-display font-bold mb-4">Goals</h2>
             <p className="text-gray-300 bg-surface p-4 rounded-lg border border-border">{athlete.goals}</p>
          </div>

          <div className="bg-surface2 rounded-xl border border-border p-6">
             <h2 className="text-xl font-display font-bold mb-4">Recent Sessions</h2>
             <div className="space-y-4">
                <div className="p-4 bg-surface rounded-lg border border-border flex justify-between items-center">
                  <div>
                    <h3 className="font-semibold text-white">Full Body Power</h3>
                    <p className="text-sm text-gray-400">Completed 2 days ago • 45 mins</p>
                  </div>
                  <div className="text-green-400 font-mono text-sm bg-green-900/30 px-3 py-1 rounded-full">100%</div>
                </div>
             </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-surface2 rounded-xl border border-border p-6">
            <h2 className="text-xl font-display font-bold mb-4 flex items-center">
              <Activity className="mr-2 text-blue-400 h-5 w-5" /> Wearable Metrics
            </h2>
            <div className="space-y-4">
               <div className="flex justify-between items-center">
                  <span className="text-gray-400 flex items-center"><Heart className="h-4 w-4 mr-2 text-danger" /> Avg HR</span>
                  <span className="font-mono font-bold text-white">68 bpm</span>
               </div>
               <div className="flex justify-between items-center">
                  <span className="text-gray-400">Steps Today</span>
                  <span className="font-mono font-bold text-white">8,432</span>
               </div>
               <div className="flex justify-between items-center">
                  <span className="text-gray-400">Sleep</span>
                  <span className="font-mono font-bold text-white">7h 24m</span>
               </div>
            </div>
            <div className="mt-4 text-xs text-center text-gray-500">Synced 2 hours ago</div>
          </div>
        </div>
      </div>
    </div>
  );
}
