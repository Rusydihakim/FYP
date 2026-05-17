import { useState } from 'react';
import { AthleteRow } from '../../components/ui/AthleteRow';
import { Search, Filter } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Athletes() {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Mock data for now, ideally fetched from Supabase
  const athletes = [
    { id: '1', full_name: 'Sarah Connor', fitness_level: 'advanced', assigned_plan: 'Spartan Prep', last_active: '2 hours ago' },
    { id: '2', full_name: 'John Smith', fitness_level: 'beginner', assigned_plan: 'Couch to 5K', last_active: '1 day ago' },
    { id: '3', full_name: 'Emily Davis', fitness_level: 'intermediate', assigned_plan: 'Core Crusher', last_active: '5 hours ago' },
  ];

  const filteredAthletes = athletes.filter(a => 
    a.full_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 text-text">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-display font-bold">My Athletes</h1>
        <button className="bg-green-500 hover:bg-green-400 text-bg font-semibold px-4 py-2 rounded-lg transition">
          + Add Athlete
        </button>
      </div>

      <div className="bg-surface2 rounded-xl border border-border overflow-hidden">
        <div className="p-4 border-b border-border flex space-x-4">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-500" />
            </div>
            <input
              type="text"
              placeholder="Search athletes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-border rounded-lg bg-surface text-text placeholder-gray-500 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
            />
          </div>
          <button className="flex items-center px-4 py-2 bg-surface border border-border rounded-lg text-gray-300 hover:bg-surface2 transition">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-border">
            <thead className="bg-surface">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Name</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Fitness Level</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Assigned Plan</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Last Active</th>
                <th scope="col" className="relative px-6 py-3">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-surface2 divide-y divide-border">
              {filteredAthletes.map((athlete) => (
                <AthleteRow key={athlete.id} athlete={athlete} />
              ))}
            </tbody>
          </table>
          
          {filteredAthletes.length === 0 && (
            <div className="p-8 text-center text-gray-500">
              No athletes found matching your search.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
