import React, { useState } from 'react';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';

const RegistrationForm = ({ onSubmit, loading = false }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    role: '',
    graduationYear: '',
    department: '',
    linkedinUrl: '',
    skills: [],
    bio: '',
    resume: null,
    agreeToTerms: false,
    emailNotifications: true
  });

  const [errors, setErrors] = useState({});
  const [currentStep, setCurrentStep] = useState(1);
  const [passwordStrength, setPasswordStrength] = useState(0);

  const roleOptions = [
    { value: 'student', label: 'Current Student' },
    { value: 'alumni', label: 'Alumni' },
    { value: 'faculty', label: 'Faculty Member' },
    { value: 'recruiter', label: 'Recruiter' }
  ];

  const departmentOptions = [
    { value: 'computer-science', label: 'Computer Science' },
    { value: 'engineering', label: 'Engineering' },
    { value: 'business', label: 'Business Administration' },
    { value: 'medicine', label: 'Medicine' },
    { value: 'law', label: 'Law' },
    { value: 'arts', label: 'Arts & Humanities' },
    { value: 'sciences', label: 'Natural Sciences' },
    { value: 'education', label: 'Education' }
  ];

  const skillOptions = [
    { value: 'javascript', label: 'JavaScript' },
    { value: 'python', label: 'Python' },
    { value: 'react', label: 'React' },
    { value: 'nodejs', label: 'Node.js' },
    { value: 'java', label: 'Java' },
    { value: 'project-management', label: 'Project Management' },
    { value: 'data-analysis', label: 'Data Analysis' },
    { value: 'marketing', label: 'Digital Marketing' },
    { value: 'design', label: 'UI/UX Design' },
    { value: 'finance', label: 'Financial Analysis' }
  ];

  const graduationYearOptions = Array.from({ length: 50 }, (_, i) => {
    const year = new Date()?.getFullYear() - i + 4;
    return { value: year?.toString(), label: year?.toString() };
  });

  const calculatePasswordStrength = (password) => {
    let strength = 0;
    if (password?.length >= 8) strength += 25;
    if (/[A-Z]/?.test(password)) strength += 25;
    if (/[0-9]/?.test(password)) strength += 25;
    if (/[^A-Za-z0-9]/?.test(password)) strength += 25;
    return strength;
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    if (field === 'password') {
      setPasswordStrength(calculatePasswordStrength(value));
    }
    
    // Clear error when user starts typing
    if (errors?.[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleFileUpload = (event) => {
    const file = event?.target?.files?.[0];
    if (file) {
      if (file?.size > 5 * 1024 * 1024) { // 5MB limit
        setErrors(prev => ({ ...prev, resume: 'File size must be less than 5MB' }));
        return;
      }
      if (!['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']?.includes(file?.type)) {
        setErrors(prev => ({ ...prev, resume: 'Only PDF and Word documents are allowed' }));
        return;
      }
      setFormData(prev => ({ ...prev, resume: file }));
      setErrors(prev => ({ ...prev, resume: '' }));
    }
  };

  const validateStep = (step) => {
    const newErrors = {};
    
    if (step === 1) {
      if (!formData?.email) newErrors.email = 'Email is required';
      else if (!/\S+@\S+\.\S+/?.test(formData?.email)) newErrors.email = 'Invalid email format';
      
      if (!formData?.password) newErrors.password = 'Password is required';
      else if (formData?.password?.length < 8) newErrors.password = 'Password must be at least 8 characters';
      
      if (!formData?.confirmPassword) newErrors.confirmPassword = 'Please confirm your password';
      else if (formData?.password !== formData?.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
      
      if (!formData?.agreeToTerms) newErrors.agreeToTerms = 'You must agree to the terms and conditions';
    }
    
    if (step === 2) {
      if (!formData?.firstName) newErrors.firstName = 'First name is required';
      if (!formData?.lastName) newErrors.lastName = 'Last name is required';
      if (!formData?.role) newErrors.role = 'Please select your role';
      if (!formData?.department) newErrors.department = 'Please select your department';
      
      if (formData?.role === 'alumni' && !formData?.graduationYear) {
        newErrors.graduationYear = 'Graduation year is required for alumni';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleNextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePrevStep = () => {
    setCurrentStep(prev => prev - 1);
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (validateStep(currentStep)) {
      onSubmit(formData);
    }
  };

  const getPasswordStrengthColor = () => {
    if (passwordStrength < 25) return 'bg-red-500';
    if (passwordStrength < 50) return 'bg-orange-500';
    if (passwordStrength < 75) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const getPasswordStrengthText = () => {
    if (passwordStrength < 25) return 'Weak';
    if (passwordStrength < 50) return 'Fair';
    if (passwordStrength < 75) return 'Good';
    return 'Strong';
  };

  const renderStep1 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-semibold text-text-primary mb-2">Account Information</h2>
        <p className="text-text-secondary">Create your secure account credentials</p>
      </div>

      <Input
        label="Email Address"
        type="email"
        placeholder="Enter your email address"
        value={formData?.email}
        onChange={(e) => handleInputChange('email', e?.target?.value)}
        error={errors?.email}
        required
      />

      <div>
        <Input
          label="Password"
          type="password"
          placeholder="Create a strong password"
          value={formData?.password}
          onChange={(e) => handleInputChange('password', e?.target?.value)}
          error={errors?.password}
          required
        />
        {formData?.password && (
          <div className="mt-2">
            <div className="flex items-center justify-between text-sm mb-1">
              <span className="text-text-secondary">Password Strength:</span>
              <span className={`font-medium ${passwordStrength >= 75 ? 'text-green-600' : passwordStrength >= 50 ? 'text-yellow-600' : 'text-red-600'}`}>
                {getPasswordStrengthText()}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className={`h-2 rounded-full transition-all duration-300 ${getPasswordStrengthColor()}`}
                style={{ width: `${passwordStrength}%` }}
              ></div>
            </div>
          </div>
        )}
      </div>

      <Input
        label="Confirm Password"
        type="password"
        placeholder="Confirm your password"
        value={formData?.confirmPassword}
        onChange={(e) => handleInputChange('confirmPassword', e?.target?.value)}
        error={errors?.confirmPassword}
        required
      />

      <div className="space-y-4">
        <Checkbox
          label="I agree to the Terms of Service and Privacy Policy"
          checked={formData?.agreeToTerms}
          onChange={(e) => handleInputChange('agreeToTerms', e?.target?.checked)}
          error={errors?.agreeToTerms}
          required
        />

        <Checkbox
          label="I would like to receive email notifications about platform updates"
          checked={formData?.emailNotifications}
          onChange={(e) => handleInputChange('emailNotifications', e?.target?.checked)}
        />
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-semibold text-text-primary mb-2">Personal Information</h2>
        <p className="text-text-secondary">Tell us about yourself and your role</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="First Name"
          type="text"
          placeholder="Enter your first name"
          value={formData?.firstName}
          onChange={(e) => handleInputChange('firstName', e?.target?.value)}
          error={errors?.firstName}
          required
        />

        <Input
          label="Last Name"
          type="text"
          placeholder="Enter your last name"
          value={formData?.lastName}
          onChange={(e) => handleInputChange('lastName', e?.target?.value)}
          error={errors?.lastName}
          required
        />
      </div>

      <Select
        label="Role"
        placeholder="Select your role"
        options={roleOptions}
        value={formData?.role}
        onChange={(value) => handleInputChange('role', value)}
        error={errors?.role}
        required
      />

      <Select
        label="Department"
        placeholder="Select your department"
        options={departmentOptions}
        value={formData?.department}
        onChange={(value) => handleInputChange('department', value)}
        error={errors?.department}
        required
      />

      {(formData?.role === 'alumni' || formData?.role === 'student') && (
        <Select
          label="Graduation Year"
          placeholder="Select graduation year"
          options={graduationYearOptions}
          value={formData?.graduationYear}
          onChange={(value) => handleInputChange('graduationYear', value)}
          error={errors?.graduationYear}
          required={formData?.role === 'alumni'}
        />
      )}
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-semibold text-text-primary mb-2">Professional Profile</h2>
        <p className="text-text-secondary">Enhance your profile with additional information</p>
      </div>

      <Input
        label="LinkedIn Profile URL"
        type="url"
        placeholder="https://linkedin.com/in/yourprofile"
        value={formData?.linkedinUrl}
        onChange={(e) => handleInputChange('linkedinUrl', e?.target?.value)}
        description="Optional: Link your LinkedIn profile for better networking"
      />

      <Select
        label="Skills"
        placeholder="Select your skills"
        options={skillOptions}
        value={formData?.skills}
        onChange={(value) => handleInputChange('skills', value)}
        multiple
        searchable
        description="Select skills relevant to your field"
      />

      <div>
        <label className="block text-sm font-medium text-text-primary mb-2">
          Bio
        </label>
        <textarea
          className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
          rows={4}
          placeholder="Tell us about yourself, your interests, and professional background..."
          value={formData?.bio}
          onChange={(e) => handleInputChange('bio', e?.target?.value)}
          maxLength={500}
        />
        <p className="text-xs text-text-secondary mt-1">
          {formData?.bio?.length}/500 characters
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-text-primary mb-2">
          Resume Upload
        </label>
        <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
          <input
            type="file"
            id="resume-upload"
            className="hidden"
            accept=".pdf,.doc,.docx"
            onChange={handleFileUpload}
          />
          <label
            htmlFor="resume-upload"
            className="cursor-pointer flex flex-col items-center space-y-2"
          >
            <Icon name="Upload" size={32} className="text-text-secondary" />
            <div>
              <p className="text-sm font-medium text-text-primary">
                Click to upload your resume
              </p>
              <p className="text-xs text-text-secondary">
                PDF, DOC, or DOCX (max 5MB)
              </p>
            </div>
          </label>
          {formData?.resume && (
            <div className="mt-4 p-3 bg-muted rounded-md flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Icon name="FileText" size={16} className="text-primary" />
                <span className="text-sm text-text-primary">{formData?.resume?.name}</span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleInputChange('resume', null)}
              >
                <Icon name="X" size={16} />
              </Button>
            </div>
          )}
          {errors?.resume && (
            <p className="text-sm text-destructive mt-2">{errors?.resume}</p>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {currentStep === 1 && renderStep1()}
      {currentStep === 2 && renderStep2()}
      {currentStep === 3 && renderStep3()}

      <div className="flex justify-between pt-6 border-t border-border">
        {currentStep > 1 ? (
          <Button
            type="button"
            variant="outline"
            onClick={handlePrevStep}
            iconName="ArrowLeft"
            iconPosition="left"
          >
            Previous
          </Button>
        ) : (
          <div></div>
        )}

        {currentStep < 3 ? (
          <Button
            type="button"
            onClick={handleNextStep}
            iconName="ArrowRight"
            iconPosition="right"
          >
            Next Step
          </Button>
        ) : (
          <Button
            type="submit"
            loading={loading}
            iconName="UserPlus"
            iconPosition="left"
          >
            Create Account
          </Button>
        )}
      </div>
    </form>
  );
};

export default RegistrationForm;