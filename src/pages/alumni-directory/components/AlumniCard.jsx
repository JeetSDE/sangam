import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const AlumniCard = ({ alumni, onConnect, onMessage, viewMode = 'grid' }) => {
  const {
    id,
    name,
    profileImage,
    graduationYear,
    currentPosition,
    company,
    department,
    skills,
    location,
    availableForMentorship,
    availableForSpeaking,
    availableForRecruiting,
    isConnected
  } = alumni;

  if (viewMode === 'list') {
    return (
      <div className="bg-card border border-border rounded-lg p-6 hover:elevation-2 transition-all duration-200">
        <div className="flex items-center space-x-6">
          {/* Profile Image */}
          <div className="flex-shrink-0">
            <div className="w-16 h-16 rounded-full overflow-hidden bg-muted">
              <Image
                src={profileImage}
                alt={`${name}'s profile`}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Main Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-text-primary mb-1">
                  {name}
                </h3>
                <p className="text-sm text-text-secondary mb-2">
                  {currentPosition} at {company}
                </p>
                <div className="flex items-center space-x-4 text-sm text-text-secondary mb-3">
                  <span className="flex items-center">
                    <Icon name="GraduationCap" size={14} className="mr-1" />
                    Class of {graduationYear}
                  </span>
                  <span className="flex items-center">
                    <Icon name="Building" size={14} className="mr-1" />
                    {department}
                  </span>
                  <span className="flex items-center">
                    <Icon name="MapPin" size={14} className="mr-1" />
                    {location}
                  </span>
                </div>

                {/* Skills */}
                <div className="flex flex-wrap gap-2 mb-3">
                  {skills?.slice(0, 3)?.map((skill, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                  {skills?.length > 3 && (
                    <span className="px-2 py-1 bg-muted text-text-secondary text-xs rounded-full">
                      +{skills?.length - 3} more
                    </span>
                  )}
                </div>

                {/* Availability Badges */}
                <div className="flex flex-wrap gap-2">
                  {availableForMentorship && (
                    <span className="flex items-center px-2 py-1 bg-success/10 text-success text-xs rounded-full">
                      <Icon name="Users" size={12} className="mr-1" />
                      Mentorship
                    </span>
                  )}
                  {availableForSpeaking && (
                    <span className="flex items-center px-2 py-1 bg-accent/10 text-accent text-xs rounded-full">
                      <Icon name="Mic" size={12} className="mr-1" />
                      Speaking
                    </span>
                  )}
                  {availableForRecruiting && (
                    <span className="flex items-center px-2 py-1 bg-secondary/10 text-secondary text-xs rounded-full">
                      <Icon name="Briefcase" size={12} className="mr-1" />
                      Recruiting
                    </span>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center space-x-2 ml-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onMessage(alumni)}
                  iconName="MessageCircle"
                  iconPosition="left"
                >
                  Message
                </Button>
                <Button
                  variant={isConnected ? "secondary" : "default"}
                  size="sm"
                  onClick={() => onConnect(alumni)}
                  iconName={isConnected ? "UserCheck" : "UserPlus"}
                  iconPosition="left"
                >
                  {isConnected ? 'Connected' : 'Connect'}
                </Button>
                <Link to={`/alumni-directory/${id}`}>
                  <Button
                    variant="ghost"
                    size="sm"
                    iconName="ExternalLink"
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-lg p-6 hover:elevation-2 transition-all duration-200 group">
      {/* Profile Image */}
      <div className="flex justify-center mb-4">
        <div className="w-20 h-20 rounded-full overflow-hidden bg-muted">
          <Image
            src={profileImage}
            alt={`${name}'s profile`}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      {/* Name and Position */}
      <div className="text-center mb-4">
        <h3 className="text-lg font-semibold text-text-primary mb-1">
          {name}
        </h3>
        <p className="text-sm text-text-secondary mb-2">
          {currentPosition}
        </p>
        <p className="text-sm text-text-secondary">
          {company}
        </p>
      </div>
      {/* Details */}
      <div className="space-y-2 mb-4">
        <div className="flex items-center justify-center text-sm text-text-secondary">
          <Icon name="GraduationCap" size={14} className="mr-2" />
          Class of {graduationYear}
        </div>
        <div className="flex items-center justify-center text-sm text-text-secondary">
          <Icon name="Building" size={14} className="mr-2" />
          {department}
        </div>
        <div className="flex items-center justify-center text-sm text-text-secondary">
          <Icon name="MapPin" size={14} className="mr-2" />
          {location}
        </div>
      </div>
      {/* Skills */}
      <div className="mb-4">
        <div className="flex flex-wrap gap-1 justify-center">
          {skills?.slice(0, 3)?.map((skill, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full"
            >
              {skill}
            </span>
          ))}
          {skills?.length > 3 && (
            <span className="px-2 py-1 bg-muted text-text-secondary text-xs rounded-full">
              +{skills?.length - 3}
            </span>
          )}
        </div>
      </div>
      {/* Availability Badges */}
      <div className="flex flex-wrap gap-1 justify-center mb-4">
        {availableForMentorship && (
          <span className="flex items-center px-2 py-1 bg-success/10 text-success text-xs rounded-full">
            <Icon name="Users" size={10} className="mr-1" />
            Mentorship
          </span>
        )}
        {availableForSpeaking && (
          <span className="flex items-center px-2 py-1 bg-accent/10 text-accent text-xs rounded-full">
            <Icon name="Mic" size={10} className="mr-1" />
            Speaking
          </span>
        )}
        {availableForRecruiting && (
          <span className="flex items-center px-2 py-1 bg-secondary/10 text-secondary text-xs rounded-full">
            <Icon name="Briefcase" size={10} className="mr-1" />
            Recruiting
          </span>
        )}
      </div>
      {/* Actions */}
      <div className="flex space-x-2">
        <Button
          variant="outline"
          size="sm"
          fullWidth
          onClick={() => onMessage(alumni)}
          iconName="MessageCircle"
          iconPosition="left"
        >
          Message
        </Button>
        <Button
          variant={isConnected ? "secondary" : "default"}
          size="sm"
          fullWidth
          onClick={() => onConnect(alumni)}
          iconName={isConnected ? "UserCheck" : "UserPlus"}
          iconPosition="left"
        >
          {isConnected ? 'Connected' : 'Connect'}
        </Button>
      </div>
      {/* View Profile Link */}
      <div className="mt-3">
        <Link to={`/alumni-directory/${id}`}>
          <Button
            variant="ghost"
            size="sm"
            fullWidth
            iconName="ExternalLink"
            iconPosition="left"
          >
            View Profile
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default AlumniCard;