import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import BreadcrumbTrail from '../../components/ui/BreadcrumbTrail';


import ProfileHeader from './components/ProfileHeader';
import AboutSection from './components/AboutSection';
import ExperienceSection from './components/ExperienceSection';
import SkillsSection from './components/SkillsSection';
import EducationSection from './components/EducationSection';
import AchievementsSection from './components/AchievementsSection';
import PrivacyControls from './components/PrivacyControls';

const ProfilePage = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  
  const [user] = useState({
    id: 1,
    name: "Sarah Johnson",
    email: "sarah.johnson@university.edu",
    role: "student",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit=crop&crop=face",
    department: "Computer Science",
    graduationYear: 2025,
    academicYear: "Senior",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    linkedin: "https://linkedin.com/in/sarahjohnson",
    website: "https://sarahjohnson.dev",
    joinedDate: "2021-08-15T00:00:00Z"
  });

  const [notifications] = useState([
    { id: 1, message: "Profile updated successfully", read: false },
    { id: 2, message: "New connection request", read: false },
    { id: 3, message: "Event reminder: Tech Career Fair", read: true }
  ]);

  const [activeTab, setActiveTab] = useState('about');
  const [isEditing, setIsEditing] = useState(false);
  const [isOwner] = useState(true); // Profile owner can edit

  const [profileData, setProfileData] = useState({
    bio: "Passionate computer science student with a focus on software engineering and machine learning. Currently working on innovative projects that combine AI with sustainable technology solutions.",
    currentPosition: "Software Engineering Intern",
    company: "TechCorp",
    skills: [
      { name: "Python", level: "Advanced", endorsements: 12 },
      { name: "React", level: "Intermediate", endorsements: 8 },
      { name: "Machine Learning", level: "Intermediate", endorsements: 15 },
      { name: "JavaScript", level: "Advanced", endorsements: 10 },
      { name: "Node.js", level: "Intermediate", endorsements: 6 },
      { name: "AWS", level: "Beginner", endorsements: 3 }
    ],
    experiences: [
      {
        id: 1,
        title: "Software Engineering Intern",
        company: "TechCorp",
        location: "San Francisco, CA",
        type: "Internship",
        startDate: "2024-06-01",
        endDate: null,
        current: true,
        description: "Developing full-stack web applications using React and Node.js. Contributing to microservices architecture and implementing CI/CD pipelines.",
        achievements: [
          "Improved application performance by 30%",
          "Led code reviews for junior developers",
          "Implemented automated testing suite"
        ]
      },
      {
        id: 2,
        title: "Teaching Assistant",
        company: "University Computer Science Dept",
        location: "University Campus",
        type: "Part-time",
        startDate: "2023-09-01",
        endDate: "2024-05-31",
        current: false,
        description: "Assisted in teaching Data Structures and Algorithms course. Mentored over 50 students in programming fundamentals.",
        achievements: [
          "Maintained 95% student satisfaction rating",
          "Developed supplementary learning materials",
          "Conducted weekly lab sessions"
        ]
      }
    ],
    education: [
      {
        id: 1,
        institution: "Stanford University",
        degree: "Bachelor of Science",
        field: "Computer Science",
        startDate: "2021-09-01",
        endDate: "2025-06-01",
        gpa: "3.8",
        honors: ["Dean\'s List", "Presidential Scholarship"],
        relevantCoursework: [
          "Data Structures & Algorithms",
          "Machine Learning",
          "Software Engineering",
          "Database Systems",
          "Computer Networks"
        ]
      }
    ],
    achievements: [
      {
        id: 1,
        title: "First Place - University Hackathon 2024",
        date: "2024-03-15",
        description: "Led team of 4 to develop AI-powered sustainability app that won first place among 150 teams.",
        category: "Competition"
      },
      {
        id: 2,
        title: "Google Summer of Code Participant",
        date: "2023-08-31",
        description: "Selected as one of 1,200 students worldwide to contribute to open-source projects.",
        category: "Program"
      },
      {
        id: 3,
        title: "Outstanding Student Leadership Award",
        date: "2023-12-10",
        description: "Recognized for leadership in organizing technical workshops and mentoring programs.",
        category: "Award"
      }
    ],
    mentorshipPreferences: {
      available: true,
      topics: ["Software Engineering", "Career Development", "Machine Learning"],
      meetingFrequency: "Bi-weekly",
      preferredFormat: "Virtual"
    },
    privacySettings: {
      profileVisibility: "public",
      contactInfoVisible: true,
      experienceVisible: true,
      educationVisible: true,
      skillsVisible: true,
      achievementsVisible: true
    }
  });

  const tabs = [
    { id: 'about', label: 'About', icon: 'User' },
    { id: 'experience', label: 'Experience', icon: 'Briefcase' },
    { id: 'skills', label: 'Skills', icon: 'Award' },
    { id: 'education', label: 'Education', icon: 'GraduationCap' },
    { id: 'achievements', label: 'Achievements', icon: 'Trophy' },
    { id: 'privacy', label: 'Privacy', icon: 'Shield' }
  ];

  const handlePhotoUpload = () => {
    if (!isOwner) return;
    fileInputRef?.current?.click();
  };

  const handleFileChange = (event) => {
    const file = event?.target?.files?.[0];
    if (file) {
      // Handle file upload logic here
      console.log('File selected:', file);
      // In a real app, you would upload to your backend/storage service
    }
  };

  const handleEditToggle = () => {
    if (!isOwner) return;
    setIsEditing(!isEditing);
  };

  const handleSaveProfile = () => {
    console.log('Saving profile data:', profileData);
    setIsEditing(false);
    // Implementation for saving profile data
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    // Reset any unsaved changes
  };

  const handleUpdateProfileData = (section, data) => {
    setProfileData(prev => ({
      ...prev,
      [section]: data
    }));
  };

  const handleConnectionRequest = () => {
    console.log('Sending connection request to:', user?.name);
    // Implementation for connection request
  };

  const handleMessage = () => {
    console.log('Opening message dialog for:', user?.name);
    // Implementation for messaging
  };

  const handleMentorshipRequest = () => {
    console.log('Requesting mentorship from:', user?.name);
    // Implementation for mentorship request
  };

  const handleEndorseSkill = (skillName) => {
    console.log('Endorsing skill:', skillName);
    // Implementation for skill endorsement
  };

  const handleLogout = () => {
    navigate('/login');
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'about':
        return (
          <AboutSection
            data={profileData}
            isEditing={isEditing}
            isOwner={isOwner}
            onUpdate={(data) => handleUpdateProfileData('bio', data?.bio)}
            onUpdatePosition={(data) => {
              handleUpdateProfileData('currentPosition', data?.currentPosition);
              handleUpdateProfileData('company', data?.company);
            }}
          />
        );
      case 'experience':
        return (
          <ExperienceSection
            experiences={profileData?.experiences}
            isEditing={isEditing}
            isOwner={isOwner}
            onUpdate={(experiences) => handleUpdateProfileData('experiences', experiences)}
          />
        );
      case 'skills':
        return (
          <SkillsSection
            skills={profileData?.skills}
            isEditing={isEditing}
            isOwner={isOwner}
            onUpdate={(skills) => handleUpdateProfileData('skills', skills)}
            onEndorse={handleEndorseSkill}
          />
        );
      case 'education':
        return (
          <EducationSection
            education={profileData?.education}
            isEditing={isEditing}
            isOwner={isOwner}
            onUpdate={(education) => handleUpdateProfileData('education', education)}
          />
        );
      case 'achievements':
        return (
          <AchievementsSection
            achievements={profileData?.achievements}
            isEditing={isEditing}
            isOwner={isOwner}
            onUpdate={(achievements) => handleUpdateProfileData('achievements', achievements)}
          />
        );
      case 'privacy':
        return (
          <PrivacyControls
            settings={profileData?.privacySettings}
            mentorshipPreferences={profileData?.mentorshipPreferences}
            isOwner={isOwner}
            onUpdatePrivacy={(settings) => handleUpdateProfileData('privacySettings', settings)}
            onUpdateMentorship={(preferences) => handleUpdateProfileData('mentorshipPreferences', preferences)}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header 
        user={user} 
        notifications={notifications} 
        onLogout={handleLogout} 
      />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <BreadcrumbTrail user={user} />
        
        {/* Profile Header */}
        <ProfileHeader
          user={user}
          profileData={profileData}
          isOwner={isOwner}
          isEditing={isEditing}
          onPhotoUpload={handlePhotoUpload}
          onEditToggle={handleEditToggle}
          onSave={handleSaveProfile}
          onCancel={handleCancelEdit}
          onConnectionRequest={handleConnectionRequest}
          onMessage={handleMessage}
          onMentorshipRequest={handleMentorshipRequest}
        />

        {/* Hidden file input for photo upload */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />

        {/* Tab Navigation */}
        <div className="mt-8">
          <div className="border-b border-border">
            <nav className="-mb-px flex space-x-8">
              {tabs?.map((tab) => (
                <button
                  key={tab?.id}
                  onClick={() => setActiveTab(tab?.id)}
                  className={`
                    flex items-center py-2 px-1 border-b-2 font-medium text-sm transition-colors
                    ${activeTab === tab?.id
                      ? 'border-primary text-primary' :'border-transparent text-text-secondary hover:text-text-primary hover:border-border'
                    }
                  `}
                >
                  <span className="mr-2">
                    {/* Icon placeholder - using text for now */}
                    {tab?.icon === 'User' && '👤'}
                    {tab?.icon === 'Briefcase' && '💼'}
                    {tab?.icon === 'Award' && '🏆'}
                    {tab?.icon === 'GraduationCap' && '🎓'}
                    {tab?.icon === 'Trophy' && '🏅'}
                    {tab?.icon === 'Shield' && '🛡️'}
                  </span>
                  {tab?.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="mt-8">
            {renderTabContent()}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProfilePage;