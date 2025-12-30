import React from 'react';
import { CertificationStatus } from '@/data/mockUsers';
import { CheckCircle2, Circle, Clock, FileText, Calendar, GraduationCap, Upload, BadgeCheck } from 'lucide-react';

interface CertificationTimelineProps {
  status: CertificationStatus;
}

const CertificationTimeline: React.FC<CertificationTimelineProps> = ({ status }) => {
  const steps = [
    { id: 'applied', label: 'Applied', icon: FileText },
    { id: 'slot_booked', label: 'Slot Booked', icon: Calendar },
    { id: 'training_completed', label: 'Training Completed', icon: GraduationCap },
    { id: 'certificate_uploaded', label: 'Certificate Uploaded', icon: Upload },
    { id: 'verified', label: 'Verified', icon: BadgeCheck },
  ];

  const statusOrder: Record<CertificationStatus, number> = {
    not_started: -1,
    applied: 0,
    slot_booked: 1,
    training_completed: 2,
    certificate_uploaded: 3,
    verified: 4,
  };

  const currentStepIndex = statusOrder[status];

  const getStepStatus = (stepIndex: number) => {
    if (stepIndex < currentStepIndex) return 'completed';
    if (stepIndex === currentStepIndex) return 'current';
    return 'pending';
  };

  return (
    <div className="flex items-center justify-between relative py-4">
      {/* Background Line */}
      <div className="absolute top-1/2 left-0 right-0 h-1 bg-muted -translate-y-1/2 mx-8" />
      
      {/* Progress Line */}
      <div
        className="absolute top-1/2 left-0 h-1 bg-success -translate-y-1/2 mx-8 transition-all duration-500"
        style={{ width: `calc(${Math.max(0, currentStepIndex) * 25}% - 2rem)` }}
      />

      {steps.map((step, index) => {
        const stepStatus = getStepStatus(index);
        const StepIcon = step.icon;

        return (
          <div key={step.id} className="relative z-10 flex flex-col items-center">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                stepStatus === 'completed'
                  ? 'bg-success text-success-foreground'
                  : stepStatus === 'current'
                  ? 'bg-warning text-warning-foreground animate-pulse'
                  : 'bg-muted text-muted-foreground'
              }`}
            >
              {stepStatus === 'completed' ? (
                <CheckCircle2 className="h-5 w-5" />
              ) : stepStatus === 'current' ? (
                <Clock className="h-5 w-5" />
              ) : (
                <Circle className="h-5 w-5" />
              )}
            </div>
            <span
              className={`text-xs mt-2 text-center max-w-16 leading-tight ${
                stepStatus === 'completed'
                  ? 'text-success font-medium'
                  : stepStatus === 'current'
                  ? 'text-warning font-medium'
                  : 'text-muted-foreground'
              }`}
            >
              {step.label}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default CertificationTimeline;
