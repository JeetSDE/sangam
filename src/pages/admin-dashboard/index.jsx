import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import BreadcrumbTrail from '../../components/ui/BreadcrumbTrail';
import MetricsCard from './components/MetricsCard';
import ActivityFeed from './components/ActivityFeed';
import QuickActions from './components/QuickActions';
import PendingApprovals from './components/PendingApprovals';
import AnalyticsChart from './components/AnalyticsChart';
import UserManagementTable from './components/UserManagementTable';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [user, setUser] = useState(null);

  // Mock admin user data
  useEffect(() => {
    const mockUser = {
      id: 1,
      name: "Dr. Sarah Johnson",
      email: "admin@university.edu",
      role: "admin",
      avatar: "https://randomuser.me/api/portraits/women/45.jpg"
    };
    setUser(mockUser);
  }, []);

  // Mock metrics data
  const metricsData = [
    {
      title: "Total Alumni",
      value: "2,847",
      change: "+12.5%",
      changeType: "positive",
      icon: "Users",
      color: "primary"
    },
    {
      title: "Active Users",
      value: "1,234",
      change: "+8.2%",
      changeType: "positive",
      icon: "UserCheck",
      color: "success"
    },
    {
      title: "Total Donations",
      value: "$485,920",
      change: "+23.1%",
      changeType: "positive",
      icon: "DollarSign",
      color: "accent"
    },
    {
      title: "Events This Month",
      value: "18",
      change: "+5",
      changeType: "positive",
      icon: "Calendar",
      color: "warning"
    }
  ];

  // Mock activity data
  const activityData = [
    {
      id: 1,
      user: "Michael Rodriguez",
      action: "registered as an alumni member",
      type: "user_registration",
      timestamp: new Date(Date.now() - 300000)
    },
    {
      id: 2,
      user: "Emily Chen",
      action: "made a donation of $500",
      type: "donation",
      timestamp: new Date(Date.now() - 600000)
    },
    {
      id: 3,
      user: "David Thompson",
      action: "created a new networking event",
      type: "event_creation",
      timestamp: new Date(Date.now() - 900000)
    },
    {
      id: 4,
      user: "Lisa Park",
      action: "updated their profile information",
      type: "profile_update",
      timestamp: new Date(Date.now() - 1200000)
    },
    {
      id: 5,
      user: "James Wilson",
      action: "requested mentorship from Sarah Davis",
      type: "mentorship_request",
      timestamp: new Date(Date.now() - 1500000)
    }
  ];

  // Mock pending approvals data
  const pendingApprovalsData = [
    {
      id: 1,
      type: "user_verification",
      title: "Alumni Verification Request",
      description: "John Smith - Class of 2018, Computer Science",
      submittedBy: "John Smith",
      timeAgo: "2 hours ago"
    },
    {
      id: 2,
      type: "event_approval",
      title: "Tech Meetup Event",
      description: "Monthly networking event for tech alumni",
      submittedBy: "Tech Alumni Group",
      timeAgo: "4 hours ago"
    },
    {
      id: 3,
      type: "donation_verification",
      title: "Large Donation Verification",
      description: "$10,000 donation from anonymous donor",
      submittedBy: "Finance Team",
      timeAgo: "1 day ago"
    }
  ];

  // Mock chart data
  const donationTrendsData = [
    { name: 'Jan', value: 45000 },
    { name: 'Feb', value: 52000 },
    { name: 'Mar', value: 48000 },
    { name: 'Apr', value: 61000 },
    { name: 'May', value: 55000 },
    { name: 'Jun', value: 67000 },
    { name: 'Jul', value: 72000 }
  ];

  const userEngagementData = [
    { name: 'Alumni', value: 1234 },
    { name: 'Students', value: 856 },
    { name: 'Faculty', value: 234 },
    { name: 'Recruiters', value: 123 }
  ];

  const departmentParticipationData = [
    { name: 'Computer Science', value: 450 },
    { name: 'Business', value: 380 },
    { name: 'Engineering', value: 320 },
    { name: 'Medicine', value: 280 },
    { name: 'Arts', value: 220 },
    { name: 'Law', value: 180 }
  ];

  // Mock users data for management table
  const usersData = [
    {
      id: 1,
      name: "Michael Rodriguez",
      email: "michael.r@email.com",
      role: "alumni",
      status: "verified",
      joinedDate: "Jan 15, 2024"
    },
    {
      id: 2,
      name: "Emily Chen",
      email: "emily.chen@email.com",
      role: "student",
      status: "active",
      joinedDate: "Feb 20, 2024"
    },
    {
      id: 3,
      name: "David Thompson",
      email: "david.t@email.com",
      role: "faculty",
      status: "verified",
      joinedDate: "Mar 10, 2024"
    },
    {
      id: 4,
      name: "Lisa Park",
      email: "lisa.park@email.com",
      role: "alumni",
      status: "pending",
      joinedDate: "Mar 25, 2024"
    },
    {
      id: 5,
      name: "James Wilson",
      email: "james.w@email.com",
      role: "student",
      status: "suspended",
      joinedDate: "Apr 5, 2024"
    }
  ];

  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'LayoutDashboard' },
    { id: 'users', label: 'User Management', icon: 'Users' },
    { id: 'analytics', label: 'Analytics', icon: 'BarChart3' },
    { id: 'approvals', label: 'Approvals', icon: 'CheckCircle' }
  ];

  // Event handlers
  const handleCreateEvent = () => {
    console.log('Create event clicked');
  };

  const handleManageUsers = () => {
    setActiveTab('users');
  };

  const handleCreateCampaign = () => {
    console.log('Create campaign clicked');
  };

  const handleExportData = () => {
    console.log('Export data clicked');
  };

  const handleApprove = (approvalId) => {
    console.log('Approve:', approvalId);
  };

  const handleReject = (approvalId) => {
    console.log('Reject:', approvalId);
  };

  const handleVerifyUser = (userId) => {
    console.log('Verify user:', userId);
  };

  const handleSuspendUser = (userId) => {
    console.log('Suspend user:', userId);
  };

  const handleViewProfile = (userId) => {
    console.log('View profile:', userId);
  };

  const handleLogout = () => {
    navigate('/login');
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'users':
        return (
          <div className="space-y-6">
            <UserManagementTable
              users={usersData}
              onVerifyUser={handleVerifyUser}
              onSuspendUser={handleSuspendUser}
              onViewProfile={handleViewProfile}
            />
          </div>
        );
      
      case 'analytics':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <AnalyticsChart
                data={donationTrendsData}
                type="line"
                title="Donation Trends"
                height={300}
              />
              <AnalyticsChart
                data={userEngagementData}
                type="pie"
                title="User Engagement"
                height={300}
              />
            </div>
            <AnalyticsChart
              data={departmentParticipationData}
              type="bar"
              title="Department Participation"
              height={400}
            />
          </div>
        );
      
      case 'approvals':
        return (
          <div className="space-y-6">
            <PendingApprovals
              approvals={pendingApprovalsData}
              onApprove={handleApprove}
              onReject={handleReject}
            />
          </div>
        );
      
      default:
        return (
          <div className="space-y-6">
            {/* Metrics Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {metricsData?.map((metric, index) => (
                <MetricsCard key={index} {...metric} />
              ))}
            </div>
            {/* Quick Actions */}
            <QuickActions
              onCreateEvent={handleCreateEvent}
              onManageUsers={handleManageUsers}
              onCreateCampaign={handleCreateCampaign}
              onExportData={handleExportData}
            />
            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column - Charts */}
              <div className="lg:col-span-2 space-y-6">
                <AnalyticsChart
                  data={donationTrendsData}
                  type="bar"
                  title="Monthly Donation Trends"
                  height={300}
                />
                <AnalyticsChart
                  data={departmentParticipationData}
                  type="line"
                  title="Department Participation"
                  height={300}
                />
              </div>

              {/* Right Column - Activity & Approvals */}
              <div className="space-y-6">
                <ActivityFeed activities={activityData} />
                <PendingApprovals
                  approvals={pendingApprovalsData?.slice(0, 3)}
                  onApprove={handleApprove}
                  onReject={handleReject}
                />
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header user={user} onLogout={handleLogout} />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <BreadcrumbTrail user={user} />
        
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-text-primary">Admin Dashboard</h1>
              <p className="mt-2 text-text-secondary">
                Comprehensive oversight and management tools for the alumni platform
              </p>
            </div>
            <div className="mt-4 sm:mt-0 flex space-x-3">
              <Button variant="outline" iconName="Download">
                Export Report
              </Button>
              <Button variant="default" iconName="Plus">
                Quick Action
              </Button>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="mb-8">
          <div className="border-b border-border">
            <nav className="-mb-px flex space-x-8 overflow-x-auto">
              {tabs?.map((tab) => (
                <button
                  key={tab?.id}
                  onClick={() => setActiveTab(tab?.id)}
                  className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition-colors duration-200 ${
                    activeTab === tab?.id
                      ? 'border-primary text-primary' :'border-transparent text-text-secondary hover:text-text-primary hover:border-border'
                  }`}
                >
                  <Icon name={tab?.icon} size={18} />
                  <span>{tab?.label}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        {renderTabContent()}
      </main>
    </div>
  );
};

export default AdminDashboard;