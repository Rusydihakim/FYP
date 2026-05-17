import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Sparkles } from 'lucide-react';

export default function Analytics() {
  const strengthData = [
    { week: 'W1', squat: 185, bench: 135 },
    { week: 'W2', squat: 195, bench: 140 },
    { week: 'W3', squat: 205, bench: 145 },
    { week: 'W4', squat: 215, bench: 155 },
  ];

  const cardioData = [
    { week: 'W1', pace: 9.5 },
    { week: 'W2', pace: 9.2 },
    { week: 'W3', pace: 8.9 },
    { week: 'W4', pace: 8.5 },
  ];

  return (
    <div className="space-y-6 text-text">
      <h1 className="text-3xl font-display font-bold">Progress & Analytics</h1>

      <div className="bg-blue-900/20 border border-blue-500/30 p-6 rounded-xl flex gap-4 items-start">
        <div className="p-3 bg-blue-500/20 text-blue-400 rounded-lg">
          <Sparkles className="h-6 w-6" />
        </div>
        <div>
           <h3 className="text-lg font-bold text-white mb-1">AI Performance Insight</h3>
           <p className="text-blue-100/80 leading-relaxed">
             Great job this month! Your estimated 1RM for the Barbell Squat has increased by <span className="font-bold text-green-400">16%</span>. 
             Additionally, your average mile pace dropped to 8.5 min/mi, showing a <span className="font-bold text-green-400">10%</span> improvement in cardiovascular endurance.
           </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-surface2 p-6 rounded-xl border border-border">
          <h2 className="text-xl font-bold font-display mb-6">Strength Progression (lbs)</h2>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={strengthData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1E2D47" />
                <XAxis dataKey="week" stroke="#8DA4C0" />
                <YAxis stroke="#8DA4C0" />
                <Tooltip cursor={{fill: '#162035'}} contentStyle={{ backgroundColor: '#0F1729', borderColor: '#1E2D47', color: '#fff' }} />
                <Bar dataKey="squat" fill="#1E78D4" name="Squat" radius={[4,4,0,0]} />
                <Bar dataKey="bench" fill="#6FC424" name="Bench Press" radius={[4,4,0,0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-surface2 p-6 rounded-xl border border-border">
          <h2 className="text-xl font-bold font-display mb-6">Cardio Pace (min/mi)</h2>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={cardioData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1E2D47" />
                <XAxis dataKey="week" stroke="#8DA4C0" />
                <YAxis stroke="#8DA4C0" domain={['auto', 'auto']} reversed={true} />
                <Tooltip contentStyle={{ backgroundColor: '#0F1729', borderColor: '#1E2D47', color: '#fff' }} />
                <Line type="monotone" dataKey="pace" stroke="#8FDB42" strokeWidth={3} name="Avg Pace" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
