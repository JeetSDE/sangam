import React from 'react';
import Icon from '../../../components/AppIcon';

const SecurityBadges = () => {
  const securityFeatures = [
    {
      icon: 'Shield',
      title: 'SSL Encrypted',
      description: 'Your data is protected with 256-bit encryption'
    },
    {
      icon: 'CheckCircle',
      title: 'Institutional Verified',
      description: 'Official university authentication system'
    },
    {
      icon: 'Lock',
      title: 'GDPR Compliant',
      description: 'Privacy-first data handling practices'
    }
  ];

  return (
    <div className="mt-8 pt-6 border-t border-border">
      <div className="text-center mb-4">
        <h3 className="text-sm font-medium text-text-primary mb-2">Secure Authentication</h3>
        <p className="text-xs text-text-secondary">
          Your privacy and security are our top priorities
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {securityFeatures?.map((feature, index) => (
          <div
            key={index}
            className="flex flex-col items-center text-center p-3 bg-muted/50 rounded-lg"
          >
            <div className="w-8 h-8 bg-success/10 rounded-full flex items-center justify-center mb-2">
              <Icon name={feature?.icon} size={16} className="text-success" />
            </div>
            <h4 className="text-xs font-medium text-text-primary mb-1">
              {feature?.title}
            </h4>
            <p className="text-xs text-text-secondary leading-relaxed">
              {feature?.description}
            </p>
          </div>
        ))}
      </div>
      {/* Trust Indicators */}
      <div className="flex items-center justify-center space-x-4 mt-4 pt-4 border-t border-border/50">
        <div className="flex items-center space-x-1">
          <Icon name="Shield" size={14} className="text-success" />
          <span className="text-xs text-text-secondary">Secure Login</span>
        </div>
        <div className="flex items-center space-x-1">
          <Icon name="Eye" size={14} className="text-primary" />
          <span className="text-xs text-text-secondary">Privacy Protected</span>
        </div>
        <div className="flex items-center space-x-1">
          <Icon name="Clock" size={14} className="text-warning" />
          <span className="text-xs text-text-secondary">24/7 Support</span>
        </div>
      </div>
    </div>
  );
};

export default SecurityBadges;