import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Brain, Search, Plus, GripVertical, Trash2 } from 'lucide-react';
import { generateWorkoutPlan } from '../../lib/api';


export default function PlanBuilder() {
  const navigate = useNavigate();
  const [loadingAI, setLoadingAI] = useState(false);
  
  // Mock form state
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [difficulty, setDifficulty] = useState('intermediate');
  const [weeks, setWeeks] = useState(4);
  
  const [exercises, setExercises] = useState([
    { id: '1', name: 'Barbell Squat', sets: 4, reps: 8, rest: 90 },
    { id: '2', name: 'Dumbbell Lunge', sets: 3, reps: 12, rest: 60 }
  ]);

  const handleGenerateAI = async () => {
    setLoadingAI(true);
    try {
      // Mock profile for now, should come from selected athlete
      const mockProfile = { age: 28, weight: 65, fitness_level: 'intermediate', goals: 'Endurance' };
      const plan = await generateWorkoutPlan(mockProfile);
      
      setTitle(plan.title || 'AI-Generated Plan');
      setDescription(plan.description || 'Custom built based on athlete profile metrics.');
      
      // Map first session exercises to our state format
      if (plan.weeks && plan.weeks[0] && plan.weeks[0].sessions && plan.weeks[0].sessions[0]) {
        const aiExercises = plan.weeks[0].sessions[0].exercises.map((ex: any, idx: number) => ({
          id: Date.now().toString() + idx,
          name: ex.name,
          sets: ex.sets || 3,
          reps: ex.reps || 10,
          rest: ex.rest_seconds || 60
        }));
        setExercises(aiExercises);
      }
    } catch (err) {
      console.error(err);
      alert("Failed to generate plan. Check your API key in .env");
    } finally {
      setLoadingAI(false);
    }
  };

  return (
    <div className="space-y-6 text-text max-w-5xl mx-auto">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-display font-bold">Plan Builder</h1>
        <div className="flex gap-3">
          <button 
            onClick={() => navigate('/coach/plans')}
            className="px-4 py-2 bg-surface2 border border-border text-gray-300 rounded-lg hover:bg-surface transition"
          >
            Cancel
          </button>
          <button className="px-4 py-2 bg-green-500 text-bg font-semibold rounded-lg hover:bg-green-400 transition">
            Save Plan
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Main Details */}
          <div className="bg-surface2 border border-border p-6 rounded-xl">
            <h2 className="text-xl font-bold font-display mb-4">Plan Details</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Plan Title</label>
                <input 
                  type="text" value={title} onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-surface border border-border rounded-lg px-4 py-2 text-white focus:outline-none focus:border-green-500" 
                  placeholder="e.g. 12-Week Marathon Prep" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Description</label>
                <textarea 
                  value={description} onChange={(e) => setDescription(e.target.value)}
                  className="w-full bg-surface border border-border rounded-lg px-4 py-2 text-white focus:outline-none focus:border-green-500" 
                  rows={3} placeholder="Describe the goal of this plan..." 
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                 <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Difficulty</label>
                    <select 
                      value={difficulty} onChange={(e) => setDifficulty(e.target.value)}
                      className="w-full bg-surface border border-border rounded-lg px-4 py-2 text-white focus:outline-none focus:border-green-500"
                    >
                      <option value="beginner">Beginner</option>
                      <option value="intermediate">Intermediate</option>
                      <option value="advanced">Advanced</option>
                    </select>
                 </div>
                 <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Duration (Weeks)</label>
                    <input 
                      type="number" value={weeks} onChange={(e) => setWeeks(Number(e.target.value))}
                      className="w-full bg-surface border border-border rounded-lg px-4 py-2 text-white focus:outline-none focus:border-green-500" 
                      min="1" max="52" 
                    />
                 </div>
              </div>
            </div>
          </div>

          {/* Exercise Builder */}
          <div className="bg-surface2 border border-border p-6 rounded-xl">
             <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold font-display">Workout Routine (Week 1, Day 1)</h2>
                <button className="text-blue-400 hover:text-blue-300 text-sm flex items-center">
                  <Plus className="h-4 w-4 mr-1" /> Add Day
                </button>
             </div>
             
             <div className="space-y-3 mb-6">
                {exercises.map((ex) => (
                  <div key={ex.id} className="bg-surface border border-border rounded-lg p-3 flex items-center gap-4">
                     <GripVertical className="text-gray-500 cursor-move h-5 w-5" />
                     <div className="flex-1">
                        <span className="font-medium text-white">{ex.name}</span>
                     </div>
                     <div className="flex items-center gap-3 text-sm">
                        <div className="flex flex-col">
                           <span className="text-gray-500 text-xs">Sets</span>
                           <input type="number" className="w-16 bg-surface2 border border-border rounded px-2 py-1 text-center" value={ex.sets} readOnly />
                        </div>
                        <div className="flex flex-col">
                           <span className="text-gray-500 text-xs">Reps</span>
                           <input type="number" className="w-16 bg-surface2 border border-border rounded px-2 py-1 text-center" value={ex.reps} readOnly />
                        </div>
                        <div className="flex flex-col">
                           <span className="text-gray-500 text-xs">Rest (s)</span>
                           <input type="number" className="w-16 bg-surface2 border border-border rounded px-2 py-1 text-center" value={ex.rest} readOnly />
                        </div>
                     </div>
                     <button className="text-gray-500 hover:text-danger ml-2 p-1">
                        <Trash2 className="h-5 w-5" />
                     </button>
                  </div>
                ))}
             </div>

             <div className="relative">
                <Search className="absolute left-3 top-3 h-5 w-5 text-gray-500" />
                <input 
                  type="text" 
                  placeholder="Search ExerciseDB to add..." 
                  className="w-full bg-surface border border-border rounded-lg pl-10 pr-4 py-3 text-white focus:outline-none focus:border-green-500" 
                />
             </div>
          </div>
        </div>

        {/* AI Generator Sidebar */}
        <div className="bg-surface2 border border-blue-900/50 p-6 rounded-xl relative overflow-hidden">
           <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-green-400"></div>
           <Brain className="h-10 w-10 text-blue-400 mb-4" />
           <h2 className="text-xl font-bold font-display mb-2 text-white">AI Plan Generator</h2>
           <p className="text-sm text-gray-400 mb-6">Let AthleteFit AI generate a customized workout plan based on an athlete's profile or specific requirements.</p>
           
           <div className="space-y-4 mb-6">
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1">Target Athlete (Optional)</label>
                <select className="w-full bg-surface border border-border rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500">
                  <option>Select Athlete...</option>
                  <option>Sarah Connor (Adv)</option>
                  <option>John Smith (Beg)</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1">Specific Prompt Focus</label>
                <textarea 
                  className="w-full bg-surface border border-border rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500" 
                  rows={3} placeholder="e.g. Needs low-impact cardio due to knee injury..." 
                />
              </div>
           </div>

           <button 
             onClick={handleGenerateAI}
             disabled={loadingAI}
             className="w-full bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-semibold py-3 rounded-lg transition flex items-center justify-center"
           >
             {loadingAI ? (
               <span className="animate-pulse">Generating Magic...</span>
             ) : (
               <>
                 <Brain className="h-5 w-5 mr-2" /> Generate with AI
               </>
             )}
           </button>
        </div>
      </div>
    </div>
  );
}
