import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Header = ({ user = null, notifications = [], onLogout = () => {} }) => {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const userMenuRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  const navigationItems = [
    {
      label: 'Dashboard',
      path: user?.role === 'admin' ? '/admin-dashboard' : 
            user?.role === 'alumni'? '/alumni-dashboard' : '/student-dashboard',
      roles: ['admin', 'alumni', 'student'],
      icon: 'LayoutDashboard'
    },
    {
      label: 'Directory',
      path: '/alumni-directory',
      roles: ['admin', 'alumni', 'student'],
      icon: 'Users'
    },
    {
      label: 'Donations',
      path: '/donation-center',
      roles: ['admin', 'alumni', 'student'],
      icon: 'Heart'
    },
    {
      label: 'Profile',
      path: '/profile',
      roles: ['admin', 'alumni', 'student'],
      icon: 'User'
    }
  ];

  const visibleNavItems = navigationItems?.filter(item => 
    !user || item?.roles?.includes(user?.role)
  );

  const unreadNotifications = notifications?.filter(n => !n?.read)?.length;

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef?.current && !userMenuRef?.current?.contains(event?.target)) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    onLogout();
    navigate('/login');
    setIsUserMenuOpen(false);
  };

  const isActivePath = (path) => {
    return location?.pathname === path;
  };

  const Logo = () => (
    <Link to="/" className="flex items-center space-x-3">
      <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
        <Icon name="GraduationCap" size={24} color="white" />
      </div>
      <div className="flex flex-col">
        <span className="text-xl font-semibold text-text-primary">AlumniConnect</span>
        <span className="text-xs text-text-secondary">Management Platform</span>
      </div>
    </Link>
  );

  return (
    <header className="bg-surface border-b border-border sticky top-0 z-50 elevation-1">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Logo />
          </div>

          {/* Desktop Navigation */}
          {user && (
            <nav className="hidden md:flex items-center space-x-8">
              {visibleNavItems?.map((item) => (
                <Link
                  key={item?.path}
                  to={item?.path}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                    isActivePath(item?.path)
                      ? 'text-primary bg-primary/10' :'text-text-secondary hover:text-text-primary hover:bg-muted'
                  }`}
                >
                  <Icon name={item?.icon} size={18} />
                  <span>{item?.label}</span>
                </Link>
              ))}
            </nav>
          )}

          {/* Right Side */}
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                {/* Notifications */}
                <div className="relative">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="relative"
                    onClick={() => {/* Handle notifications */}}
                  >
                    <Icon name="Bell" size={20} />
                    {unreadNotifications > 0 && (
                      <span className="absolute -top-1 -right-1 bg-accent text-accent-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                        {unreadNotifications > 9 ? '9+' : unreadNotifications}
                      </span>
                    )}
                  </Button>
                </div>

                {/* User Menu */}
                <div className="relative" ref={userMenuRef}>
                  <Button
                    variant="ghost"
                    className="flex items-center space-x-2 px-3 py-2"
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  >
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                      <Icon name="User" size={16} color="white" />
                    </div>
                    <div className="hidden sm:block text-left">
                      <div className="text-sm font-medium text-text-primary">
                        {user?.name || 'User'}
                      </div>
                      <div className="text-xs text-text-secondary capitalize">
                        {user?.role || 'Member'}
                      </div>
                    </div>
                    <Icon 
                      name="ChevronDown" 
                      size={16} 
                      className={`transition-transform duration-200 ${
                        isUserMenuOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </Button>

                  {/* User Dropdown */}
                  {isUserMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-popover border border-border rounded-md shadow-elevation-3 py-1 animate-slide-down">
                      <Link
                        to="/profile"
                        className="flex items-center px-4 py-2 text-sm text-popover-foreground hover:bg-muted transition-colors duration-200"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <Icon name="User" size={16} className="mr-3" />
                        Profile
                      </Link>
                      <Link
                        to="/settings"
                        className="flex items-center px-4 py-2 text-sm text-popover-foreground hover:bg-muted transition-colors duration-200"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <Icon name="Settings" size={16} className="mr-3" />
                        Settings
                      </Link>
                      <div className="border-t border-border my-1"></div>
                      <button
                        onClick={handleLogout}
                        className="flex items-center w-full px-4 py-2 text-sm text-destructive hover:bg-muted transition-colors duration-200"
                      >
                        <Icon name="LogOut" size={16} className="mr-3" />
                        Sign Out
                      </button>
                    </div>
                  )}
                </div>

                {/* Mobile Menu Button */}
                <Button
                  variant="ghost"
                  size="icon"
                  className="md:hidden"
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                  <Icon name={isMobileMenuOpen ? "X" : "Menu"} size={20} />
                </Button>
              </>
            ) : (
              <div className="flex items-center space-x-3">
                <Link to="/login">
                  <Button variant="ghost">Sign In</Button>
                </Link>
                <Link to="/register">
                  <Button variant="default">Get Started</Button>
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Navigation */}
        {user && isMobileMenuOpen && (
          <div className="md:hidden border-t border-border py-4 animate-slide-down">
            <nav className="flex flex-col space-y-2">
              {visibleNavItems?.map((item) => (
                <Link
                  key={item?.path}
                  to={item?.path}
                  className={`flex items-center space-x-3 px-3 py-3 rounded-md text-base font-medium transition-colors duration-200 ${
                    isActivePath(item?.path)
                      ? 'text-primary bg-primary/10' :'text-text-secondary hover:text-text-primary hover:bg-muted'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Icon name={item?.icon} size={20} />
                  <span>{item?.label}</span>
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;