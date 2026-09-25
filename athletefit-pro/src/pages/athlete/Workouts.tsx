import { Play, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';
import '../../styles/AthleteWorkouts.css';

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
    <div className="athlete-workouts-page">
      <h1 className="athlete-workouts-title">My Workouts</h1>

      {plans.map(plan => (
        <div key={plan.id} className="athlete-workouts-plan-card">
           <div className="athlete-workouts-plan-header">
              <div>
                <div className="flex items-center gap-3 mb-2">
                   <h2 className="athlete-workouts-plan-title">{plan.title}</h2>
                   <span className="athlete-workouts-difficulty-badge">{plan.difficulty}</span>
                </div>
                <p className="athlete-workouts-plan-subtitle">{plan.sessionsRemaining} sessions left this week</p>
              </div>
              <div className="athlete-workouts-progress-bar-wrap">
                <div className="athlete-workouts-progress-header">
                   <span className="text-gray-400">Plan Progress</span>
                   <span className="text-green-400 font-mono font-bold">{plan.progress}%</span>
                </div>
                <div className="athlete-workouts-progress-bar-track">
                   <div className="athlete-workouts-progress-bar-fill" style={{ width: `${plan.progress}%` }}></div>
                </div>
              </div>
           </div>

           <div className="athlete-workouts-sessions-body">
              <h3 className="athlete-workouts-sessions-heading">This Week's Sessions</h3>
              <div className="athlete-workouts-sessions-grid">
                 {plan.sessions.map((session, idx) => (
                    <div key={idx} className={session.completed ? 'athlete-workouts-session-card-completed' : 'athlete-workouts-session-card-pending'}>
                       <div className="athlete-workouts-session-header">
                          <div>
                            <p className="athlete-workouts-session-day">{session.day}</p>
                            <p className="athlete-workouts-session-name">{session.name}</p>
                          </div>
                          {session.completed && <CheckCircle2 className="text-green-500 h-5 w-5" />}
                       </div>
                       
                       {session.completed ? (
                         <button disabled className="athlete-workouts-btn-completed">
                           Completed
                         </button>
                       ) : (
                         <button 
                           onClick={() => setShowModal(true)}
                           className="athlete-workouts-btn-log"
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
        <div className="athlete-workouts-modal-overlay">
          <div className="athlete-workouts-modal">
             <div className="athlete-workouts-modal-header">
                <h3 className="text-xl font-bold font-display text-white">Log Workout Session</h3>
                <p className="text-sm text-gray-400">Upper Body Strength</p>
             </div>
             <div className="athlete-workouts-modal-body">
                <div>
                   <label className="block text-sm text-gray-400 mb-1">Duration (minutes)</label>
                   <input type="number" className="w-full bg-surface border border-border rounded-lg px-4 py-2 text-white" defaultValue={45} />
                </div>
                <div>
                   <label className="block text-sm text-gray-400 mb-1">Notes / How did you feel?</label>
                   <textarea className="w-full bg-surface border border-border rounded-lg px-4 py-2 text-white" rows={3} placeholder="Felt strong today..."></textarea>
                </div>
             </div>
             <div className="athlete-workouts-modal-footer">
                <button onClick={() => setShowModal(false)} className="px-4 py-2 text-gray-400 hover:text-white transition cursor-pointer">Cancel</button>
                <button onClick={() => setShowModal(false)} className="px-4 py-2 bg-green-500 text-bg font-bold rounded-lg hover:bg-green-400 transition cursor-pointer">Save Log</button>
             </div>
          </div>
        </div>
      )}
    </div>
  );
}
