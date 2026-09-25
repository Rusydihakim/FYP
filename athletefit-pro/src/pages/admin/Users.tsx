import { useState } from 'react';
import { Search, MoreVertical, Edit2, Trash2 } from 'lucide-react';

export default function Users() {
  const [searchTerm, setSearchTerm] = useState('');
  
  const users = [
    { id: '1', name: 'Sarah Connor', email: 'sarah@example.com', role: 'athlete', status: 'Active' },
    { id: '2', name: 'Coach Mike', email: 'mike@example.com', role: 'coach', status: 'Active' },
    { id: '3', name: 'Admin Jane', email: 'jane@example.com', role: 'admin', status: 'Active' },
    { id: '4', name: 'John Smith', email: 'john@example.com', role: 'athlete', status: 'Inactive' },
  ];

  return (
    <div className="space-y-6 text-text">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-display font-bold">Manage Users</h1>
        <button className="bg-blue-600 hover:bg-blue-500 text-white font-semibold px-4 py-2 rounded-lg transition">
          Invite User
        </button>
      </div>

      <div className="bg-surface2 rounded-xl border border-border overflow-hidden">
        <div className="p-4 border-b border-border">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-500" />
            <input
              type="text"
              placeholder="Search by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-surface border border-border rounded-lg pl-10 pr-4 py-2 text-white focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-border">
            <thead className="bg-surface">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">User</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Role</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-surface2 divide-y divide-border">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-surface transition">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-8 w-8 rounded-full bg-gray-700 flex items-center justify-center font-bold text-sm mr-3">
                        {user.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-medium text-white">{user.name}</div>
                        <div className="text-xs text-gray-500">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-bold rounded-full uppercase
                      ${user.role === 'admin' ? 'bg-purple-900/30 text-purple-400' : 
                        user.role === 'coach' ? 'bg-green-900/30 text-green-400' : 
                        'bg-blue-900/30 text-blue-400'}`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-bold rounded-full 
                      ${user.status === 'Active' ? 'bg-green-100/10 text-green-400' : 'bg-gray-100/10 text-gray-400'}`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end space-x-3">
                       <button className="text-blue-400 hover:text-blue-300"><Edit2 className="h-4 w-4" /></button>
                       <button className="text-danger hover:text-red-400"><Trash2 className="h-4 w-4" /></button>
                       <button className="text-gray-400 hover:text-white"><MoreVertical className="h-4 w-4" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
