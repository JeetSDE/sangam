import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import BreadcrumbTrail from '../../components/ui/BreadcrumbTrail';
import RegistrationForm from './components/RegistrationForm';
import ProgressIndicator from './components/ProgressIndicator';
import WelcomeSection from './components/WelcomeSection';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  // Mock registration handler
  const handleRegistration = async (formData) => {
    setLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log('Registration data:', formData);
      
      // Mock successful registration
      setRegistrationSuccess(true);
      
      // Redirect to appropriate dashboard after 3 seconds
      setTimeout(() => {
        const dashboardRoutes = {
          admin: '/admin-dashboard',
          alumni: '/alumni-dashboard',
          student: '/student-dashboard',
          faculty: '/alumni-dashboard', // Faculty uses alumni dashboard
          recruiter: '/alumni-directory' // Recruiters start with directory
        };
        
        navigate(dashboardRoutes?.[formData?.role] || '/student-dashboard');
      }, 3000);
      
    } catch (error) {
      console.error('Registration failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const customBreadcrumbs = [
    { label: 'Home', path: '/' },
    { label: 'Register', path: '/register', isLast: true }
  ];

  if (registrationSuccess) {
    return (
      <>
        <Helmet>
          <title>Registration Successful - AlumniConnect</title>
          <meta name="description" content="Your account has been created successfully. Welcome to AlumniConnect!" />
        </Helmet>
        
        <div className="min-h-screen bg-background">
          <Header />
          
          <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="text-center py-16">
              <div className="w-20 h-20 bg-success rounded-full flex items-center justify-center mx-auto mb-6">
                <Icon name="CheckCircle" size={40} color="white" />
              </div>
              
              <h1 className="text-3xl font-bold text-text-primary mb-4">
                Welcome to AlumniConnect!
              </h1>
              
              <p className="text-lg text-text-secondary mb-8 max-w-2xl mx-auto">
                Your account has been created successfully. We've sent a verification email to your inbox. 
                Please verify your email address to complete the registration process.
              </p>
              
              <div className="bg-surface border border-border rounded-xl p-6 max-w-md mx-auto mb-8">
                <div className="flex items-center space-x-3 mb-4">
                  <Icon name="Mail" size={20} className="text-primary" />
                  <span className="font-medium text-text-primary">Check Your Email</span>
                </div>
                <p className="text-sm text-text-secondary">
                  We've sent a verification link to your email address. Click the link to activate your account.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/login">
                  <Button variant="outline" iconName="LogIn" iconPosition="left">
                    Sign In Now
                  </Button>
                </Link>
                <Link to="/">
                  <Button variant="default" iconName="Home" iconPosition="left">
                    Back to Home
                  </Button>
                </Link>
              </div>
            </div>
          </main>
        </div>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>Register - AlumniConnect Management Platform</title>
        <meta name="description" content="Join AlumniConnect to connect with alumni, find mentors, and grow your professional network. Create your account today." />
        <meta name="keywords" content="alumni registration, student signup, university network, mentorship platform" />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <BreadcrumbTrail customBreadcrumbs={customBreadcrumbs} />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Registration Form Section */}
            <div className="order-2 lg:order-1">
              <div className="bg-surface border border-border rounded-2xl p-8 elevation-2">
                <div className="text-center mb-8">
                  <h1 className="text-3xl font-bold text-text-primary mb-2">
                    Create Your Account
                  </h1>
                  <p className="text-text-secondary">
                    Join thousands of alumni, students, and professionals
                  </p>
                </div>
                
                <ProgressIndicator currentStep={currentStep} />
                
                <RegistrationForm 
                  onSubmit={handleRegistration}
                  loading={loading}
                />
                
                <div className="mt-8 pt-6 border-t border-border text-center">
                  <p className="text-sm text-text-secondary">
                    By creating an account, you agree to our{' '}
                    <a href="#" className="text-primary hover:text-primary/80 font-medium">
                      Terms of Service
                    </a>{' '}
                    and{' '}
                    <a href="#" className="text-primary hover:text-primary/80 font-medium">
                      Privacy Policy
                    </a>
                  </p>
                </div>
              </div>
              
              {/* Help Section */}
              <div className="mt-8 bg-muted rounded-xl p-6">
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon name="HelpCircle" size={20} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-text-primary mb-2">
                      Need Help?
                    </h3>
                    <p className="text-sm text-text-secondary mb-4">
                      If you're having trouble with registration or have questions about the platform, we're here to help.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-2">
                      <Button variant="outline" size="sm" iconName="Mail">
                        Contact Support
                      </Button>
                      <Button variant="ghost" size="sm" iconName="FileText">
                        View FAQ
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Welcome Section */}
            <div className="order-1 lg:order-2 lg:sticky lg:top-8">
              <WelcomeSection />
            </div>
          </div>
          
          {/* Features Section */}
          <div className="mt-16 py-16 border-t border-border">
            <div className="text-center mb-12">
              <h2 className="text-2xl font-bold text-text-primary mb-4">
                Why Join AlumniConnect?
              </h2>
              <p className="text-text-secondary max-w-2xl mx-auto">
                Our platform is designed to foster meaningful connections and professional growth within your alumni community.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  icon: 'Network',
                  title: 'Global Network',
                  description: 'Connect with alumni worldwide across all industries and career stages'
                },
                {
                  icon: 'Target',
                  title: 'Smart Matching',
                  description: 'AI-powered mentor matching based on skills, interests, and career goals'
                },
                {
                  icon: 'TrendingUp',
                  title: 'Career Growth',
                  description: 'Access exclusive job opportunities and professional development resources'
                },
                {
                  icon: 'Shield',
                  title: 'Secure Platform',
                  description: 'Your data is protected with enterprise-grade security and privacy controls'
                }
              ]?.map((feature, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Icon name={feature?.icon} size={28} className="text-primary" />
                  </div>
                  <h3 className="font-semibold text-text-primary mb-2">
                    {feature?.title}
                  </h3>
                  <p className="text-sm text-text-secondary">
                    {feature?.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </main>
        
        {/* Footer */}
        <footer className="bg-surface border-t border-border py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="flex items-center space-x-3 mb-4 md:mb-0">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <Icon name="GraduationCap" size={20} color="white" />
                </div>
                <span className="font-semibold text-text-primary">AlumniConnect</span>
              </div>
              
              <div className="text-sm text-text-secondary">
                © {new Date()?.getFullYear()} AlumniConnect. All rights reserved.
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Register;