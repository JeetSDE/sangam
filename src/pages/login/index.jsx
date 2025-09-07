import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import WelcomeHeader from './components/WelcomeHeader';
import LoginForm from './components/LoginForm';
import SecurityBadges from './components/SecurityBadges';

const LoginPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (user, rememberMe) => {
    setIsLoading(true);
    setError('');

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Mock JWT token generation
      const mockToken = `jwt_token_${user?.role}_${Date.now()}`;
      
      // Store authentication data
      const authData = {
        user: {
          id: Math.floor(Math.random() * 1000),
          name: user?.email?.split('@')?.[0]?.replace('.', ' ')?.replace(/\b\w/g, l => l?.toUpperCase()),
          email: user?.email,
          role: user?.role,
          avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.email}`,
          lastLogin: new Date()?.toISOString(),
          isVerified: true
        },
        token: mockToken,
        expiresAt: new Date(Date.now() + (rememberMe ? 30 * 24 * 60 * 60 * 1000 : 24 * 60 * 60 * 1000))?.toISOString()
      };

      // Store in localStorage
      localStorage.setItem('auth', JSON.stringify(authData));
      
      // Navigate to appropriate dashboard based on role
      const dashboardRoutes = {
        admin: '/admin-dashboard',
        alumni: '/alumni-dashboard',
        student: '/student-dashboard',
        recruiter: '/alumni-directory',
        faculty: '/alumni-directory'
      };

      navigate(dashboardRoutes?.[user?.role] || '/alumni-directory');
      
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Sign In - AlumniConnect Management Platform</title>
        <meta name="description" content="Sign in to AlumniConnect to access your alumni network, mentorship opportunities, and institutional events." />
        <meta name="keywords" content="alumni login, university login, student portal, alumni network" />
      </Helmet>
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {/* Main Login Card */}
          <div className="bg-card rounded-2xl elevation-3 p-8 border border-border">
            <WelcomeHeader />
            <LoginForm 
              onLogin={handleLogin}
              isLoading={isLoading}
              error={error}
            />
            <SecurityBadges />
          </div>

          {/* Footer */}
          <div className="text-center mt-6 text-xs text-text-secondary">
            <p>
              © {new Date()?.getFullYear()} AlumniConnect Management Platform. All rights reserved.
            </p>
            <div className="flex items-center justify-center space-x-4 mt-2">
              <a href="#" className="hover:text-primary transition-colors duration-200">
                Privacy Policy
              </a>
              <span>•</span>
              <a href="#" className="hover:text-primary transition-colors duration-200">
                Terms of Service
              </a>
              <span>•</span>
              <a href="#" className="hover:text-primary transition-colors duration-200">
                Support
              </a>
            </div>
          </div>
        </div>

        {/* Background Pattern */}
        <div className="fixed inset-0 -z-10 overflow-hidden">
          <div className="absolute -top-40 -right-32 w-80 h-80 bg-primary/5 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-32 w-80 h-80 bg-secondary/5 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-accent/3 rounded-full blur-3xl"></div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;