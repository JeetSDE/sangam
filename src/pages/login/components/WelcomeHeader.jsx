import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';

const WelcomeHeader = () => {
  return (
    <div className="text-center mb-8">
      {/* Logo */}
      <Link to="/" className="inline-flex items-center space-x-3 mb-6">
        <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center elevation-2">
          <Icon name="GraduationCap" size={28} color="white" />
        </div>
        <div className="text-left">
          <h1 className="text-2xl font-bold text-text-primary">AlumniConnect</h1>
          <p className="text-sm text-text-secondary">Management Platform</p>
        </div>
      </Link>

      {/* Welcome Message */}
      <div className="space-y-2">
        <h2 className="text-3xl font-bold text-text-primary">Welcome Back</h2>
        <p className="text-text-secondary text-lg">
          Sign in to access your alumni network and continue your journey
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-4 mt-6 p-4 bg-muted/30 rounded-lg">
        <div className="text-center">
          <div className="text-2xl font-bold text-primary">15K+</div>
          <div className="text-xs text-text-secondary">Alumni</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-secondary">500+</div>
          <div className="text-xs text-text-secondary">Events</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-accent">2.5M+</div>
          <div className="text-xs text-text-secondary">Connections</div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeHeader;