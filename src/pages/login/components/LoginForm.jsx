import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';

const LoginForm = ({ onLogin, isLoading, error }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [formErrors, setFormErrors] = useState({});
  const navigate = useNavigate();

  const mockCredentials = [
    { email: "admin@university.edu", password: "admin123", role: "admin" },
    { email: "john.alumni@gmail.com", password: "alumni123", role: "alumni" },
    { email: "sarah.student@university.edu", password: "student123", role: "student" },
    { email: "recruiter@company.com", password: "recruiter123", role: "recruiter" },
    { email: "prof.faculty@university.edu", password: "faculty123", role: "faculty" }
  ];

  const validateForm = () => {
    const errors = {};
    
    if (!formData?.email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/?.test(formData?.email)) {
      errors.email = 'Please enter a valid email address';
    }
    
    if (!formData?.password) {
      errors.password = 'Password is required';
    } else if (formData?.password?.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }
    
    setFormErrors(errors);
    return Object.keys(errors)?.length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e?.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing
    if (formErrors?.[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    // Check against mock credentials
    const user = mockCredentials?.find(
      cred => cred?.email === formData?.email && cred?.password === formData?.password
    );

    if (user) {
      onLogin(user, formData?.rememberMe);
    } else {
      setFormErrors({
        general: 'Invalid email or password. Please check your credentials and try again.'
      });
    }
  };

  const handleForgotPassword = () => {
    // Mock forgot password functionality
    alert('Password reset link would be sent to your email address.');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* General Error Message */}
      {(error || formErrors?.general) && (
        <div className="bg-error/10 border border-error/20 rounded-lg p-4 flex items-start space-x-3">
          <Icon name="AlertCircle" size={20} className="text-error mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-error text-sm font-medium">Authentication Failed</p>
            <p className="text-error text-sm mt-1">{error || formErrors?.general}</p>
          </div>
        </div>
      )}
      {/* Email Field */}
      <Input
        label="Email Address"
        type="email"
        name="email"
        placeholder="Enter your institutional email"
        value={formData?.email}
        onChange={handleInputChange}
        error={formErrors?.email}
        required
        disabled={isLoading}
        className="w-full"
      />
      {/* Password Field */}
      <Input
        label="Password"
        type="password"
        name="password"
        placeholder="Enter your password"
        value={formData?.password}
        onChange={handleInputChange}
        error={formErrors?.password}
        required
        disabled={isLoading}
        className="w-full"
      />
      {/* Remember Me Checkbox */}
      <div className="flex items-center justify-between">
        <Checkbox
          label="Remember me for 30 days"
          name="rememberMe"
          checked={formData?.rememberMe}
          onChange={handleInputChange}
          disabled={isLoading}
        />
        
        <button
          type="button"
          onClick={handleForgotPassword}
          className="text-sm text-primary hover:text-primary/80 transition-colors duration-200 font-medium"
          disabled={isLoading}
        >
          Forgot password?
        </button>
      </div>
      {/* Sign In Button */}
      <Button
        type="submit"
        variant="default"
        size="lg"
        fullWidth
        loading={isLoading}
        disabled={isLoading}
        iconName="LogIn"
        iconPosition="right"
        className="mt-8"
      >
        {isLoading ? 'Signing In...' : 'Sign In'}
      </Button>
      {/* Create Account Link */}
      <div className="text-center pt-4 border-t border-border">
        <p className="text-text-secondary text-sm">
          Don't have an account?{' '}
          <button
            type="button"
            onClick={() => navigate('/register')}
            className="text-primary hover:text-primary/80 transition-colors duration-200 font-medium"
            disabled={isLoading}
          >
            Create Account
          </button>
        </p>
      </div>
    </form>
  );
};

export default LoginForm;