import React from 'react';
import Icon from '../../../components/AppIcon';

const ProgressIndicator = ({ currentStep, totalSteps = 3 }) => {
  const steps = [
    {
      number: 1,
      title: 'Account',
      description: 'Basic credentials'
    },
    {
      number: 2,
      title: 'Profile',
      description: 'Personal information'
    },
    {
      number: 3,
      title: 'Professional',
      description: 'Skills & experience'
    }
  ];

  const getStepStatus = (stepNumber) => {
    if (stepNumber < currentStep) return 'completed';
    if (stepNumber === currentStep) return 'current';
    return 'upcoming';
  };

  const getStepIcon = (stepNumber, status) => {
    if (status === 'completed') return 'Check';
    return stepNumber?.toString();
  };

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between">
        {steps?.map((step, index) => {
          const status = getStepStatus(step?.number);
          const isLast = index === steps?.length - 1;

          return (
            <div key={step?.number} className="flex items-center flex-1">
              <div className="flex flex-col items-center">
                {/* Step Circle */}
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-200 ${
                    status === 'completed'
                      ? 'bg-success text-success-foreground'
                      : status === 'current' ?'bg-primary text-primary-foreground' :'bg-muted text-text-secondary'
                  }`}
                >
                  {status === 'completed' ? (
                    <Icon name="Check" size={16} />
                  ) : (
                    <span>{step?.number}</span>
                  )}
                </div>

                {/* Step Info */}
                <div className="mt-2 text-center">
                  <div
                    className={`text-sm font-medium ${
                      status === 'current' ?'text-primary'
                        : status === 'completed' ?'text-success' :'text-text-secondary'
                    }`}
                  >
                    {step?.title}
                  </div>
                  <div className="text-xs text-text-secondary mt-1 hidden sm:block">
                    {step?.description}
                  </div>
                </div>
              </div>
              {/* Connector Line */}
              {!isLast && (
                <div className="flex-1 mx-4">
                  <div
                    className={`h-0.5 transition-all duration-200 ${
                      status === 'completed'
                        ? 'bg-success' :'bg-border'
                    }`}
                  ></div>
                </div>
              )}
            </div>
          );
        })}
      </div>
      {/* Mobile Progress Bar */}
      <div className="mt-6 sm:hidden">
        <div className="flex justify-between text-xs text-text-secondary mb-2">
          <span>Step {currentStep} of {totalSteps}</span>
          <span>{Math.round((currentStep / totalSteps) * 100)}% Complete</span>
        </div>
        <div className="w-full bg-muted rounded-full h-2">
          <div
            className="bg-primary h-2 rounded-full transition-all duration-300"
            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default ProgressIndicator;