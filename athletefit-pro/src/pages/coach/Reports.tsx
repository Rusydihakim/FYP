import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

export default function Reports() {
  const complianceData = [
    { name: 'Week 1', compliance: 92 },
    { name: 'Week 2', compliance: 88 },
    { name: 'Week 3', compliance: 95 },
    { name: 'Week 4', compliance: 80 },
    { name: 'Week 5', compliance: 85 },
  ];

  const activityData = [
    { name: 'Mon', sessions: 8 },
    { name: 'Tue', sessions: 12 },
    { name: 'Wed', sessions: 10 },
    { name: 'Thu', sessions: 7 },
    { name: 'Fri', sessions: 14 },
    { name: 'Sat', sessions: 18 },
    { name: 'Sun', sessions: 5 },
  ];

  return (
    <div className="space-y-6 text-text">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-display font-bold">Reports & Analytics</h1>
        <button className="bg-surface2 border border-border text-gray-300 px-4 py-2 rounded-lg hover:bg-surface transition">
          Export Report
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-surface2 rounded-xl p-6 border border-border">
          <h3 className="text-gray-400 text-sm">Overall Compliance</h3>
          <p className="text-4xl font-mono font-bold text-white mt-2">88%</p>
          <p className="text-green-400 text-sm mt-1">↑ 2% from last month</p>
        </div>
        <div className="bg-surface2 rounded-xl p-6 border border-border">
          <h3 className="text-gray-400 text-sm">Active Plans</h3>
          <p className="text-4xl font-mono font-bold text-white mt-2">12</p>
          <p className="text-gray-500 text-sm mt-1">Across 45 athletes</p>
        </div>
        <div className="bg-surface2 rounded-xl p-6 border border-border">
          <h3 className="text-gray-400 text-sm">Avg Sessions / Wk</h3>
          <p className="text-4xl font-mono font-bold text-white mt-2">3.4</p>
          <p className="text-blue-400 text-sm mt-1">Per athlete average</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-surface2 rounded-xl p-6 border border-border">
          <h2 className="text-lg font-bold mb-6 font-display">Plan Compliance Over Time</h2>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={complianceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1E2D47" />
                <XAxis dataKey="name" stroke="#8DA4C0" tick={{fill: '#8DA4C0'}} />
                <YAxis stroke="#8DA4C0" tick={{fill: '#8DA4C0'}} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0F1729', borderColor: '#1E2D47', color: '#fff' }}
                />
                <Line type="monotone" dataKey="compliance" stroke="#8FDB42" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-surface2 rounded-xl p-6 border border-border">
          <h2 className="text-lg font-bold mb-6 font-display">Activity Heatmap (Sessions)</h2>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={activityData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1E2D47" />
                <XAxis dataKey="name" stroke="#8DA4C0" tick={{fill: '#8DA4C0'}} />
                <YAxis stroke="#8DA4C0" tick={{fill: '#8DA4C0'}} />
                <Tooltip 
                  cursor={{fill: '#162035'}}
                  contentStyle={{ backgroundColor: '#0F1729', borderColor: '#1E2D47', color: '#fff' }}
                />
                <Bar dataKey="sessions" fill="#3A91E0" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
