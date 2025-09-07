import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const UserManagementTable = ({ users = [], onVerifyUser, onSuspendUser, onViewProfile }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  const filteredUsers = users?.filter(user => {
    const matchesSearch = user?.name?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
                         user?.email?.toLowerCase()?.includes(searchTerm?.toLowerCase());
    const matchesRole = filterRole === 'all' || user?.role === filterRole;
    const matchesStatus = filterStatus === 'all' || user?.status === filterStatus;
    
    return matchesSearch && matchesRole && matchesStatus;
  });

  const getStatusBadge = (status) => {
    const badges = {
      verified: { label: 'Verified', color: 'bg-success/10 text-success' },
      pending: { label: 'Pending', color: 'bg-warning/10 text-warning' },
      suspended: { label: 'Suspended', color: 'bg-error/10 text-error' },
      active: { label: 'Active', color: 'bg-primary/10 text-primary' }
    };
    return badges?.[status] || { label: status, color: 'bg-muted text-text-secondary' };
  };

  const getRoleBadge = (role) => {
    const badges = {
      admin: { label: 'Admin', color: 'bg-accent/10 text-accent' },
      alumni: { label: 'Alumni', color: 'bg-primary/10 text-primary' },
      student: { label: 'Student', color: 'bg-secondary/10 text-secondary' },
      faculty: { label: 'Faculty', color: 'bg-success/10 text-success' }
    };
    return badges?.[role] || { label: role, color: 'bg-muted text-text-secondary' };
  };

  return (
    <div className="bg-card rounded-lg border border-border elevation-1">
      <div className="p-6 border-b border-border">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          <h3 className="text-lg font-semibold text-text-primary">User Management</h3>
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
            <Input
              type="search"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e?.target?.value)}
              className="w-full sm:w-64"
            />
            <div className="flex space-x-2">
              <select
                value={filterRole}
                onChange={(e) => setFilterRole(e?.target?.value)}
                className="px-3 py-2 border border-border rounded-md text-sm bg-input"
              >
                <option value="all">All Roles</option>
                <option value="admin">Admin</option>
                <option value="alumni">Alumni</option>
                <option value="student">Student</option>
                <option value="faculty">Faculty</option>
              </select>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e?.target?.value)}
                className="px-3 py-2 border border-border rounded-md text-sm bg-input"
              >
                <option value="all">All Status</option>
                <option value="verified">Verified</option>
                <option value="pending">Pending</option>
                <option value="suspended">Suspended</option>
                <option value="active">Active</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                User
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                Role
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                Joined
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {filteredUsers?.length === 0 ? (
              <tr>
                <td colSpan="5" className="px-6 py-8 text-center">
                  <Icon name="Users" size={48} className="text-text-secondary mx-auto mb-3" />
                  <p className="text-text-secondary">No users found</p>
                </td>
              </tr>
            ) : (
              filteredUsers?.map((user) => {
                const statusBadge = getStatusBadge(user?.status);
                const roleBadge = getRoleBadge(user?.role);
                
                return (
                  <tr key={user?.id} className="hover:bg-muted/50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-medium">
                          {user?.name?.charAt(0)?.toUpperCase()}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-text-primary">{user?.name}</div>
                          <div className="text-sm text-text-secondary">{user?.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${roleBadge?.color}`}>
                        {roleBadge?.label}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${statusBadge?.color}`}>
                        {statusBadge?.label}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-text-secondary">
                      {user?.joinedDate}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        iconName="Eye"
                        onClick={() => onViewProfile(user?.id)}
                      >
                        View
                      </Button>
                      {user?.status === 'pending' && (
                        <Button
                          variant="default"
                          size="sm"
                          iconName="Check"
                          onClick={() => onVerifyUser(user?.id)}
                        >
                          Verify
                        </Button>
                      )}
                      {user?.status !== 'suspended' && (
                        <Button
                          variant="destructive"
                          size="sm"
                          iconName="Ban"
                          onClick={() => onSuspendUser(user?.id)}
                        >
                          Suspend
                        </Button>
                      )}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
      {filteredUsers?.length > 0 && (
        <div className="px-6 py-4 border-t border-border">
          <div className="flex items-center justify-between">
            <p className="text-sm text-text-secondary">
              Showing {filteredUsers?.length} of {users?.length} users
            </p>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" iconName="ChevronLeft">
                Previous
              </Button>
              <Button variant="outline" size="sm" iconName="ChevronRight">
                Next
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagementTable;