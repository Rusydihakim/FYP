import { useState } from 'react';
import { Send, CheckCircle2 } from 'lucide-react';

export default function Assign() {
  const [selectedPlan, setSelectedPlan] = useState('');
  const [selectedAthletes, setSelectedAthletes] = useState<string[]>([]);
  const [startDate, setStartDate] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
      setSelectedPlan('');
      setSelectedAthletes([]);
      setStartDate('');
    }, 3000);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 text-text">
      <h1 className="text-3xl font-display font-bold">Assign Workouts</h1>

      {success && (
        <div className="bg-green-500/20 border border-green-500 text-green-400 p-4 rounded-lg flex items-center">
          <CheckCircle2 className="h-5 w-5 mr-3" />
          Workout plan successfully assigned to {selectedAthletes.length} athlete(s)!
        </div>
      )}

      <div className="bg-surface2 rounded-xl border border-border p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">1. Select Plan</label>
            <select 
              required
              value={selectedPlan}
              onChange={(e) => setSelectedPlan(e.target.value)}
              className="w-full bg-surface border border-border rounded-lg px-4 py-3 text-white focus:outline-none focus:border-green-500"
            >
              <option value="" disabled>Choose a workout plan...</option>
              <option value="1">Spartan Prep (Advanced, 8 weeks)</option>
              <option value="2">Couch to 5K (Beginner, 6 weeks)</option>
              <option value="3">Core Crusher (Intermediate, 4 weeks)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">2. Select Athletes</label>
            <div className="bg-surface border border-border rounded-lg p-4 max-h-48 overflow-y-auto space-y-2">
               {['Sarah Connor', 'John Smith', 'Emily Davis', 'Michael Johnson'].map((athlete) => (
                 <label key={athlete} className="flex items-center space-x-3 p-2 hover:bg-surface2 rounded cursor-pointer transition">
                   <input 
                     type="checkbox" 
                     className="form-checkbox h-5 w-5 text-green-500 rounded border-border bg-surface focus:ring-green-500"
                     checked={selectedAthletes.includes(athlete)}
                     onChange={(e) => {
                       if (e.target.checked) setSelectedAthletes([...selectedAthletes, athlete]);
                       else setSelectedAthletes(selectedAthletes.filter(a => a !== athlete));
                     }}
                   />
                   <span className="text-white">{athlete}</span>
                 </label>
               ))}
            </div>
            <p className="text-xs text-gray-500 mt-2">{selectedAthletes.length} selected</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">3. Start Date</label>
            <input 
              required
              type="date" 
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full bg-surface border border-border rounded-lg px-4 py-3 text-white focus:outline-none focus:border-green-500" 
            />
          </div>

          <div className="pt-4 border-t border-border">
            <button 
              type="submit"
              disabled={!selectedPlan || selectedAthletes.length === 0 || !startDate}
              className="w-full bg-green-500 hover:bg-green-400 text-bg font-bold py-3 px-4 rounded-lg flex justify-center items-center transition disabled:opacity-50"
            >
              <Send className="h-5 w-5 mr-2" /> Assign to Athletes
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
