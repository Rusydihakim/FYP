import { useState } from 'react';
import { Search, MoreVertical, Edit2, Trash2 } from 'lucide-react';
import '../../styles/AdminUsers.css';

export default function Users() {
  const [searchTerm, setSearchTerm] = useState('');
  
  const users = [
    { id: '1', name: 'Sarah Connor', email: 'sarah@example.com', role: 'athlete', status: 'Active' },
    { id: '2', name: 'Coach Mike', email: 'mike@example.com', role: 'coach', status: 'Active' },
    { id: '3', name: 'Admin Jane', email: 'jane@example.com', role: 'admin', status: 'Active' },
    { id: '4', name: 'John Smith', email: 'john@example.com', role: 'athlete', status: 'Inactive' },
  ];

  return (
    <div className="admin-users-page">
      <div className="admin-users-header">
        <h1 className="admin-users-title">Manage Users</h1>
        <button className="admin-users-invite-btn">
          Invite User
        </button>
      </div>

      <div className="admin-users-card">
        <div className="admin-users-search-row">
          <div className="admin-users-search-wrap">
            <Search className="admin-users-search-icon" />
            <input
              type="text"
              placeholder="Search by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="admin-users-search-input"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="admin-users-table">
            <thead className="bg-surface">
              <tr>
                <th className="admin-users-th">User</th>
                <th className="admin-users-th">Role</th>
                <th className="admin-users-th">Status</th>
                <th className="admin-users-th-right">Actions</th>
              </tr>
            </thead>
            <tbody className="admin-users-tbody">
              {users.map((user) => (
                <tr key={user.id} className="admin-users-tr">
                  <td className="admin-users-td">
                    <div className="flex items-center">
                      <div className="admin-users-avatar">
                        {user.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-medium text-white">{user.name}</div>
                        <div className="text-xs text-gray-500">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="admin-users-td">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-bold rounded-full uppercase
                      ${user.role === 'admin' ? 'bg-purple-900/30 text-purple-400' : 
                        user.role === 'coach' ? 'bg-green-900/30 text-green-400' : 
                        'bg-blue-900/30 text-blue-400'}`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="admin-users-td">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-bold rounded-full 
                      ${user.status === 'Active' ? 'bg-green-100/10 text-green-400' : 'bg-gray-100/10 text-gray-400'}`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="admin-users-td-right">
                    <div className="admin-users-actions">
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
