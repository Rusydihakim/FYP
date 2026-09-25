import { Play, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';

export default function Workouts() {
  const [showModal, setShowModal] = useState(false);

  const plans = [
    {
      id: 1,
      title: 'Spartan Prep - Week 3',
      difficulty: 'Advanced',
      progress: 65,
      sessionsRemaining: 2,
      sessions: [
        { day: 'Monday', name: 'Lower Body Power', completed: true },
        { day: 'Wednesday', name: 'Upper Body Strength', completed: false },
        { day: 'Friday', name: 'Conditioning & Core', completed: false },
      ]
    }
  ];

  return (
    <div className="space-y-6 text-text">
      <h1 className="text-3xl font-display font-bold">My Workouts</h1>

      {plans.map(plan => (
        <div key={plan.id} className="bg-surface2 border border-border rounded-xl overflow-hidden">
           <div className="p-6 border-b border-border flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-3 mb-2">
                   <h2 className="text-2xl font-bold font-display text-white">{plan.title}</h2>
                   <span className="text-xs px-2 py-1 rounded-full uppercase font-bold bg-danger/20 text-danger">{plan.difficulty}</span>
                </div>
                <p className="text-gray-400 text-sm">{plan.sessionsRemaining} sessions left this week</p>
              </div>
              <div className="w-full md:w-64">
                <div className="flex justify-between text-sm mb-1">
                   <span className="text-gray-400">Plan Progress</span>
                   <span className="text-green-400 font-mono font-bold">{plan.progress}%</span>
                </div>
                <div className="w-full bg-surface rounded-full h-2 border border-border overflow-hidden">
                   <div className="h-2 rounded-full bg-green-500" style={{ width: `${plan.progress}%` }}></div>
                </div>
              </div>
           </div>

           <div className="p-6">
              <h3 className="font-bold mb-4 text-gray-300">This Week's Sessions</h3>
              <div className="grid gap-4 md:grid-cols-3">
                 {plan.sessions.map((session, idx) => (
                    <div key={idx} className={`p-4 rounded-xl border ${session.completed ? 'bg-surface border-border opacity-70' : 'bg-surface2 border-blue-900'}`}>
                       <div className="flex justify-between items-start mb-4">
                          <div>
                            <p className="text-xs text-gray-500 font-bold uppercase mb-1">{session.day}</p>
                            <p className="font-bold text-white">{session.name}</p>
                          </div>
                          {session.completed && <CheckCircle2 className="text-green-500 h-5 w-5" />}
                       </div>
                       
                       {session.completed ? (
                         <button disabled className="w-full py-2 bg-surface text-gray-500 font-medium rounded-lg cursor-not-allowed">
                           Completed
                         </button>
                       ) : (
                         <button 
                           onClick={() => setShowModal(true)}
                           className="w-full py-2 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-lg transition flex items-center justify-center"
                         >
                           <Play className="h-4 w-4 mr-2" /> Log Session
                         </button>
                       )}
                    </div>
                 ))}
              </div>
           </div>
        </div>
      ))}

      {/* Mock Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-surface2 border border-border rounded-xl w-full max-w-lg overflow-hidden shadow-2xl">
             <div className="p-6 border-b border-border">
                <h3 className="text-xl font-bold font-display text-white">Log Workout Session</h3>
                <p className="text-sm text-gray-400">Upper Body Strength</p>
             </div>
             <div className="p-6 space-y-4">
                <div>
                   <label className="block text-sm text-gray-400 mb-1">Duration (minutes)</label>
                   <input type="number" className="w-full bg-surface border border-border rounded-lg px-4 py-2 text-white" defaultValue={45} />
                </div>
                <div>
                   <label className="block text-sm text-gray-400 mb-1">Notes / How did you feel?</label>
                   <textarea className="w-full bg-surface border border-border rounded-lg px-4 py-2 text-white" rows={3} placeholder="Felt strong today..."></textarea>
                </div>
             </div>
             <div className="p-6 border-t border-border flex justify-end gap-3 bg-surface">
                <button onClick={() => setShowModal(false)} className="px-4 py-2 text-gray-400 hover:text-white transition">Cancel</button>
                <button onClick={() => setShowModal(false)} className="px-4 py-2 bg-green-500 text-bg font-bold rounded-lg hover:bg-green-400 transition">Save Log</button>
             </div>
          </div>
        </div>
      )}
    </div>
  );
}
