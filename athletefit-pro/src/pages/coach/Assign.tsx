import { useState, useEffect } from 'react';
import { Send, CheckCircle2, Plus, Trash2, Calendar, Dumbbell, Award, Loader2, Sparkles, AlertCircle } from 'lucide-react';
import { supabase } from '../../utils/supabase';
import { useAuth } from '../../hooks/useAuth';

interface ExerciseInput {
  name: string;
  sets: number;
  reps: number;
  weight_kg: string;
  duration_seconds: string;
}

export default function Assign() {
  const { profile } = useAuth();
  const [activeTab, setActiveTab] = useState<'plan' | 'custom'>('custom');
  
  // Database state
  const [athletes, setAthletes] = useState<any[]>([]);
  const [loadingAthletes, setLoadingAthletes] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  // Tab 1 state: Assign Predefined Plan
  const [selectedPlan, setSelectedPlan] = useState('');
  const [selectedAthletes, setSelectedAthletes] = useState<string[]>([]);
  const [startDate, setStartDate] = useState('');

  // Tab 2 state: Create Custom Workout
  const [customAthleteId, setCustomAthleteId] = useState('');
  const [customTitle, setCustomTitle] = useState('');
  const [customDate, setCustomDate] = useState('');
  const [customExercises, setCustomExercises] = useState<ExerciseInput[]>([
    { name: '', sets: 3, reps: 10, weight_kg: '', duration_seconds: '' }
  ]);

  const planTemplates: Record<string, { title: string; exercises: ExerciseInput[] }> = {
    '1': {
      title: 'Spartan Prep',
      exercises: [
        { name: 'Barbell Squat', sets: 4, reps: 8, weight_kg: '80', duration_seconds: '' },
        { name: 'Deadlift', sets: 4, reps: 5, weight_kg: '100', duration_seconds: '' },
        { name: 'Dumbbell Lunge', sets: 3, reps: 12, weight_kg: '15', duration_seconds: '' }
      ]
    },
    '2': {
      title: 'Couch to 5K',
      exercises: [
        { name: 'Jogging Warmup', sets: 1, reps: 1, weight_kg: '', duration_seconds: '300' },
        { name: 'Interval Jogging', sets: 5, reps: 1, weight_kg: '', duration_seconds: '120' },
        { name: 'Walking Recovery', sets: 5, reps: 1, weight_kg: '', duration_seconds: '60' }
      ]
    },
    '3': {
      title: 'Core Crusher',
      exercises: [
        { name: 'Forearm Plank', sets: 3, reps: 1, weight_kg: '', duration_seconds: '60' },
        { name: 'Hanging Leg Raise', sets: 3, reps: 12, weight_kg: '', duration_seconds: '' },
        { name: 'Russian Twist', sets: 3, reps: 20, weight_kg: '10', duration_seconds: '' }
      ]
    }
  };

  useEffect(() => {
    async function fetchAthletes() {
      try {
        setLoadingAthletes(true);
        const { data, error } = await supabase
          .from('users')
          .select('*')
          .eq('role', 'Athlete')
          .order('full_name', { ascending: true });
        
        if (error) throw error;
        setAthletes(data || []);
      } catch (err) {
        console.error('Error fetching athletes:', err);
      } finally {
        setLoadingAthletes(false);
      }
    }
    fetchAthletes();
  }, []);

  const getCoachId = async () => {
    if (!profile) return null;
    try {
      const { data: coachData } = await supabase
        .from('coaches')
        .select('id')
        .eq('user_id', profile.id)
        .maybeSingle();
      
      if (coachData) return coachData.id;
      
      // Auto-create coaches entry if missing (self-healing db layer)
      const { data: newCoach, error: coachErr } = await supabase
        .from('coaches')
        .insert({ user_id: profile.id, specialization: 'General Training', certification: 'Certified Coach' })
        .select('id')
        .single();
      
      if (coachErr) {
        console.error('Error creating coach entry:', coachErr);
        return null;
      }
      return newCoach?.id || null;
    } catch (err) {
      console.error('Error getting coach id:', err);
      return null;
    }
  };

  const handleAssignPlan = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPlan || selectedAthletes.length === 0 || !startDate) return;
    
    setSubmitting(true);
    setErrorMsg('');
    try {
      const coachId = await getCoachId();
      const template = planTemplates[selectedPlan];
      if (!template) throw new Error('Selected plan template not found.');

      for (const athleteId of selectedAthletes) {
        // Create the workout
        const { data: workout, error: workoutErr } = await supabase
          .from('workouts')
          .insert({
            assigned_by: coachId,
            assigned_to: athleteId,
            title: template.title,
            scheduled_for: new Date(startDate).toISOString(),
            is_ai_generated: false
          })
          .select('id')
          .single();

        if (workoutErr) throw workoutErr;
        if (!workout) throw new Error('Failed to create workout');

        // Insert exercises
        const exercisesToInsert = template.exercises.map(ex => ({
          workout_id: workout.id,
          name: ex.name,
          sets: ex.sets,
          reps: ex.reps,
          weight_kg: ex.weight_kg ? parseFloat(ex.weight_kg) : null,
          duration_seconds: ex.duration_seconds ? parseInt(ex.duration_seconds) : null
        }));

        const { error: exercisesErr } = await supabase
          .from('exercises')
          .insert(exercisesToInsert);

        if (exercisesErr) throw exercisesErr;
      }

      setSuccessMessage(`Workout plan "${template.title}" successfully assigned to ${selectedAthletes.length} athlete(s)!`);
      setSuccess(true);
      
      // Reset form state
      setSelectedPlan('');
      setSelectedAthletes([]);
      setStartDate('');
      
      setTimeout(() => setSuccess(false), 5000);
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || 'Failed to assign plan.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleCreateCustomWorkout = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customAthleteId || !customTitle || !customDate) return;
    
    // Validate custom exercises
    const invalidEx = customExercises.some(ex => !ex.name.trim());
    if (invalidEx) {
      setErrorMsg('Please enter a name for all exercises.');
      return;
    }

    setSubmitting(true);
    setErrorMsg('');
    try {
      const coachId = await getCoachId();
      
      // Create the workout
      const { data: workout, error: workoutErr } = await supabase
        .from('workouts')
        .insert({
          assigned_by: coachId,
          assigned_to: customAthleteId,
          title: customTitle,
          scheduled_for: new Date(customDate).toISOString(),
          is_ai_generated: false
        })
        .select('id')
        .single();

      if (workoutErr) throw workoutErr;
      if (!workout) throw new Error('Failed to create custom workout');

      // Insert exercises
      const exercisesToInsert = customExercises.map(ex => ({
        workout_id: workout.id,
        name: ex.name,
        sets: ex.sets,
        reps: ex.reps,
        weight_kg: ex.weight_kg ? parseFloat(ex.weight_kg) : null,
        duration_seconds: ex.duration_seconds ? parseInt(ex.duration_seconds) : null
      }));

      const { error: exercisesErr } = await supabase
        .from('exercises')
        .insert(exercisesToInsert);

      if (exercisesErr) throw exercisesErr;

      const selectedAthleteName = athletes.find(a => a.id === customAthleteId)?.full_name || 'Athlete';
      setSuccessMessage(`Custom workout "${customTitle}" successfully created and assigned to ${selectedAthleteName}!`);
      setSuccess(true);

      // Reset custom form state
      setCustomAthleteId('');
      setCustomTitle('');
      setCustomDate('');
      setCustomExercises([{ name: '', sets: 3, reps: 10, weight_kg: '', duration_seconds: '' }]);

      setTimeout(() => setSuccess(false), 5000);
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || 'Failed to create and assign custom workout.');
    } finally {
      setSubmitting(false);
    }
  };

  const addCustomExerciseRow = () => {
    setCustomExercises([...customExercises, { name: '', sets: 3, reps: 10, weight_kg: '', duration_seconds: '' }]);
  };

  const removeCustomExerciseRow = (index: number) => {
    if (customExercises.length === 1) return;
    setCustomExercises(customExercises.filter((_, idx) => idx !== index));
  };

  const handleCustomExerciseChange = (index: number, field: keyof ExerciseInput, value: any) => {
    const updated = [...customExercises];
    updated[index] = {
      ...updated[index],
      [field]: value
    };
    setCustomExercises(updated);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 text-text">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-display font-bold text-white">Workout Assignments</h1>
        
        {/* Tab Selector */}
        <div className="bg-surface rounded-lg p-1 border border-border flex">
          <button 
            onClick={() => { setActiveTab('custom'); setErrorMsg(''); }}
            className={`px-4 py-2 text-sm font-semibold rounded-md transition ${activeTab === 'custom' ? 'bg-green-500 text-bg' : 'text-gray-400 hover:text-white'}`}
          >
            <Sparkles className="h-4 w-4 inline mr-1" /> Personal Workout
          </button>
          <button 
            onClick={() => { setActiveTab('plan'); setErrorMsg(''); }}
            className={`px-4 py-2 text-sm font-semibold rounded-md transition ${activeTab === 'plan' ? 'bg-green-500 text-bg' : 'text-gray-400 hover:text-white'}`}
          >
            <Award className="h-4 w-4 inline mr-1" /> Assign Template
          </button>
        </div>
      </div>

      {success && (
        <div className="bg-green-500/20 border border-green-500 text-green-400 p-4 rounded-xl flex items-center shadow-lg animate-fadeIn">
          <CheckCircle2 className="h-6 w-6 mr-3 text-green-400 shrink-0" />
          <span className="font-medium">{successMessage}</span>
        </div>
      )}

      {errorMsg && (
        <div className="bg-danger/20 border border-danger text-danger p-4 rounded-xl flex items-center shadow-lg">
          <AlertCircle className="h-6 w-6 mr-3 text-danger shrink-0" />
          <span className="font-medium">{errorMsg}</span>
        </div>
      )}

      {loadingAthletes ? (
        <div className="bg-surface2 rounded-xl border border-border p-12 text-center text-gray-400">
          <Loader2 className="animate-spin h-8 w-8 mx-auto mb-2 text-green-500" />
          <span>Loading athlete data from Supabase...</span>
        </div>
      ) : athletes.length === 0 ? (
        <div className="bg-surface2 rounded-xl border border-border p-8 text-center text-gray-500">
          No registered athletes found. Please add athletes first.
        </div>
      ) : (
        <div className="bg-surface2 rounded-xl border border-border p-6 shadow-xl">
          {activeTab === 'plan' ? (
            /* Tab 1: Assign Plan Form */
            <form onSubmit={handleAssignPlan} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">1. Select Template Plan</label>
                <select 
                  required
                  value={selectedPlan}
                  onChange={(e) => setSelectedPlan(e.target.value)}
                  className="w-full bg-surface border border-border rounded-lg px-4 py-3 text-white focus:outline-none focus:border-green-500 transition"
                >
                  <option value="" disabled>Choose a template plan...</option>
                  <option value="1">Spartan Prep (Advanced, 3 exercises)</option>
                  <option value="2">Couch to 5K (Beginner, Cardio intervals)</option>
                  <option value="3">Core Crusher (Intermediate, Ab targeted)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">2. Select Athletes</label>
                <div className="bg-surface border border-border rounded-lg p-4 max-h-48 overflow-y-auto space-y-2">
                   {athletes.map((athlete) => (
                     <label key={athlete.id} className="flex items-center space-x-3 p-2 hover:bg-surface2 rounded cursor-pointer transition">
                       <input 
                         type="checkbox" 
                         className="form-checkbox h-5 w-5 text-green-500 rounded border-border bg-surface focus:ring-green-500 focus:ring-offset-0"
                         checked={selectedAthletes.includes(athlete.id)}
                         onChange={(e) => {
                           if (e.target.checked) setSelectedAthletes([...selectedAthletes, athlete.id]);
                           else setSelectedAthletes(selectedAthletes.filter(id => id !== athlete.id));
                         }}
                       />
                       <span className="text-white font-medium">{athlete.full_name}</span>
                       <span className="text-xs font-mono text-gray-500">({athlete.email})</span>
                     </label>
                   ))}
                </div>
                <p className="text-xs text-gray-500 mt-2">{selectedAthletes.length} athlete(s) selected</p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">3. Schedule Start Date</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-3.5 h-5 w-5 text-gray-500" />
                  <input 
                    required
                    type="date" 
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full bg-surface border border-border rounded-lg pl-10 pr-4 py-3 text-white focus:outline-none focus:border-green-500 transition" 
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-border">
                <button 
                  type="submit"
                  disabled={submitting || !selectedPlan || selectedAthletes.length === 0 || !startDate}
                  className="w-full bg-green-500 hover:bg-green-400 text-bg font-bold py-3.5 px-4 rounded-lg flex justify-center items-center transition disabled:opacity-50 shadow-md hover:shadow-green-500/10 cursor-pointer"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="animate-spin h-5 w-5 mr-2" /> Assigning...
                    </>
                  ) : (
                    <>
                      <Send className="h-5 w-5 mr-2" /> Assign Template to Athletes
                    </>
                  )}
                </button>
              </div>
            </form>
          ) : (
            /* Tab 2: Create Custom Workout Form */
            <form onSubmit={handleCreateCustomWorkout} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">Target Athlete</label>
                  <select 
                    required
                    value={customAthleteId}
                    onChange={(e) => setCustomAthleteId(e.target.value)}
                    className="w-full bg-surface border border-border rounded-lg px-4 py-3 text-white focus:outline-none focus:border-green-500 transition"
                  >
                    <option value="" disabled>Choose an athlete...</option>
                    {athletes.map((athlete) => (
                      <option key={athlete.id} value={athlete.id}>
                        {athlete.full_name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">Schedule Date & Time</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-3.5 h-5 w-5 text-gray-500" />
                    <input 
                      required
                      type="datetime-local" 
                      value={customDate}
                      onChange={(e) => setCustomDate(e.target.value)}
                      className="w-full bg-surface border border-border rounded-lg pl-10 pr-4 py-3 text-white focus:outline-none focus:border-green-500 transition" 
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">Workout Title</label>
                <div className="relative">
                  <Dumbbell className="absolute left-3 top-3.5 h-5 w-5 text-gray-500" />
                  <input 
                    required
                    type="text" 
                    placeholder="e.g. Explosive Plyometrics, Heavy Powerlifting"
                    value={customTitle}
                    onChange={(e) => setCustomTitle(e.target.value)}
                    className="w-full bg-surface border border-border rounded-lg pl-10 pr-4 py-3 text-white focus:outline-none focus:border-green-500 transition" 
                  />
                </div>
              </div>

              {/* Custom Exercise Rows */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <label className="block text-sm font-semibold text-gray-300">Exercises Routine</label>
                  <button 
                    type="button"
                    onClick={addCustomExerciseRow}
                    className="text-xs bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 px-3 py-1.5 rounded-lg border border-blue-500/30 transition flex items-center font-medium cursor-pointer"
                  >
                    <Plus className="h-3.5 w-3.5 mr-1" /> Add Exercise
                  </button>
                </div>

                <div className="space-y-3">
                  {customExercises.map((exercise, idx) => (
                    <div key={idx} className="bg-surface border border-border rounded-xl p-4 space-y-4 relative group">
                      {customExercises.length > 1 && (
                        <button 
                          type="button"
                          onClick={() => removeCustomExerciseRow(idx)}
                          className="absolute top-4 right-4 text-gray-500 hover:text-danger p-1 rounded-md hover:bg-surface2 transition cursor-pointer"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      )}

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-gray-400 mb-1">Exercise Name</label>
                          <input 
                            required
                            type="text"
                            placeholder="e.g. Barbell Squat, Dumbbell Press"
                            value={exercise.name}
                            onChange={(e) => handleCustomExerciseChange(idx, 'name', e.target.value)}
                            className="w-full bg-surface2 border border-border rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-green-500 transition"
                          />
                        </div>

                        <div className="grid grid-cols-4 gap-2">
                          <div>
                            <label className="block text-xs font-semibold text-gray-400 mb-1">Sets</label>
                            <input 
                              required
                              type="number"
                              min="1"
                              value={exercise.sets}
                              onChange={(e) => handleCustomExerciseChange(idx, 'sets', parseInt(e.target.value) || 1)}
                              className="w-full bg-surface2 border border-border rounded-lg px-2 py-2 text-sm text-center text-white focus:outline-none focus:border-green-500 transition"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-semibold text-gray-400 mb-1">Reps</label>
                            <input 
                              required
                              type="number"
                              min="0"
                              value={exercise.reps}
                              onChange={(e) => handleCustomExerciseChange(idx, 'reps', parseInt(e.target.value) || 0)}
                              className="w-full bg-surface2 border border-border rounded-lg px-2 py-2 text-sm text-center text-white focus:outline-none focus:border-green-500 transition"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-semibold text-gray-400 mb-1">Weight (kg)</label>
                            <input 
                              type="number"
                              min="0"
                              step="0.5"
                              placeholder="Opt"
                              value={exercise.weight_kg}
                              onChange={(e) => handleCustomExerciseChange(idx, 'weight_kg', e.target.value)}
                              className="w-full bg-surface2 border border-border rounded-lg px-2 py-2 text-sm text-center text-white focus:outline-none focus:border-green-500 transition"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-semibold text-gray-400 mb-1">Secs</label>
                            <input 
                              type="number"
                              min="0"
                              placeholder="Opt"
                              value={exercise.duration_seconds}
                              onChange={(e) => handleCustomExerciseChange(idx, 'duration_seconds', e.target.value)}
                              className="w-full bg-surface2 border border-border rounded-lg px-2 py-2 text-sm text-center text-white focus:outline-none focus:border-green-500 transition"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-border">
                <button 
                  type="submit"
                  disabled={submitting || !customAthleteId || !customTitle || !customDate}
                  className="w-full bg-green-500 hover:bg-green-400 text-bg font-bold py-3.5 px-4 rounded-lg flex justify-center items-center transition disabled:opacity-50 shadow-md hover:shadow-green-500/10 cursor-pointer"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="animate-spin h-5 w-5 mr-2" /> Creating...
                    </>
                  ) : (
                    <>
                      <Send className="h-5 w-5 mr-2" /> Create & Assign Personal Workout
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      )}
    </div>
  );
}
