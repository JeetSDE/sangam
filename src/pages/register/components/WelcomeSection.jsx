import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const WelcomeSection = () => {
  const benefits = [
    {
      icon: 'Users',
      title: 'Connect with Alumni',
      description: 'Build meaningful relationships with graduates from your institution'
    },
    {
      icon: 'BookOpen',
      title: 'Mentorship Opportunities',
      description: 'Find mentors or become one to guide the next generation'
    },
    {
      icon: 'Calendar',
      title: 'Exclusive Events',
      description: 'Access networking events, workshops, and alumni gatherings'
    },
    {
      icon: 'Briefcase',
      title: 'Career Growth',
      description: 'Discover job opportunities and advance your professional journey'
    }
  ];

  return (
    <div className="bg-gradient-to-br from-primary/5 to-secondary/5 p-8 rounded-2xl">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon name="GraduationCap" size={32} color="white" />
        </div>
        <h2 className="text-3xl font-bold text-text-primary mb-2">
          Join AlumniConnect
        </h2>
        <p className="text-lg text-text-secondary">
          Connect, grow, and thrive with your alumni community
        </p>
      </div>
      <div className="space-y-6 mb-8">
        {benefits?.map((benefit, index) => (
          <div key={index} className="flex items-start space-x-4">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
              <Icon name={benefit?.icon} size={20} className="text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-text-primary mb-1">
                {benefit?.title}
              </h3>
              <p className="text-sm text-text-secondary">
                {benefit?.description}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="bg-surface rounded-xl p-6 border border-border">
        <div className="flex items-center space-x-4 mb-4">
          <Image
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop&crop=face"
            alt="Alumni testimonial"
            className="w-12 h-12 rounded-full object-cover"
          />
          <div>
            <div className="font-medium text-text-primary">Michael Chen</div>
            <div className="text-sm text-text-secondary">Class of 2018, Software Engineer</div>
          </div>
        </div>
        <blockquote className="text-sm text-text-secondary italic">
          "AlumniConnect helped me find my first job through a mentor who graduated 5 years before me. The platform made networking natural and meaningful."
        </blockquote>
      </div>
      <div className="text-center mt-8">
        <p className="text-sm text-text-secondary mb-4">
          Already have an account?
        </p>
        <Link
          to="/login"
          className="inline-flex items-center space-x-2 text-primary hover:text-primary/80 font-medium transition-colors duration-200"
        >
          <Icon name="LogIn" size={16} />
          <span>Sign in to your account</span>
        </Link>
      </div>
    </div>
  );
};

export default WelcomeSection;