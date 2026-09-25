import { Link } from 'react-router-dom';
import { PlusSquare, Clock, Users } from 'lucide-react';
import '../../styles/CoachPlans.css';

export default function Plans() {
  const plans = [
    { id: '1', title: 'Spartan Prep', difficulty: 'Advanced', duration: 8, assigned: 3, created: '2026-05-10' },
    { id: '2', title: 'Couch to 5K', difficulty: 'Beginner', duration: 6, assigned: 5, created: '2026-05-12' },
    { id: '3', title: 'Core Crusher', difficulty: 'Intermediate', duration: 4, assigned: 2, created: '2026-05-15' },
  ];

  return (
    <div className="coach-plans-page">
      <div className="coach-plans-header">
        <h1 className="coach-plans-title">Workout Plans</h1>
        <Link to="/coach/plans/new" className="coach-plans-create-btn">
          <PlusSquare className="h-5 w-5 mr-2" /> Create New Plan
        </Link>
      </div>

      <div className="coach-plans-grid">
        {plans.map((plan) => (
          <div key={plan.id} className="coach-plans-card">
            <div className="p-6 border-b border-border">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-xl font-bold font-display text-white">{plan.title}</h2>
                <span className={`text-xs px-2 py-1 rounded-full uppercase font-bold
                  ${plan.difficulty === 'Advanced' ? 'bg-danger/20 text-danger' : 
                    plan.difficulty === 'Beginner' ? 'bg-blue-500/20 text-blue-400' : 
                    'bg-green-500/20 text-green-400'}`}>
                  {plan.difficulty}
                </span>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-sm text-gray-400 mb-4">
                <div className="flex items-center"><Clock className="h-4 w-4 mr-2" /> {plan.duration} weeks</div>
                <div className="flex items-center"><Users className="h-4 w-4 mr-2" /> {plan.assigned} assigned</div>
              </div>
            </div>
            
            <div className="bg-surface p-4 flex justify-between items-center">
               <span className="text-xs text-gray-500 font-mono">Created {plan.created}</span>
               <Link to={`/coach/plans/${plan.id}/edit`} className="text-blue-400 hover:text-blue-300 font-medium text-sm">
                 Edit Plan &rarr;
               </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
