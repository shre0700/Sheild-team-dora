import React from 'react';
import { VerificationStatus } from '@/data/mockUsers';
import { CheckCircle2, Circle, XCircle, Clock, FileText, Shield, BadgeCheck } from 'lucide-react';

interface VerificationTimelineProps {
  status: VerificationStatus;
  rejectionReason?: string;
}

const VerificationTimeline: React.FC<VerificationTimelineProps> = ({ status, rejectionReason }) => {
  const steps = [
    { id: 'applied', label: 'Applied', icon: FileText, description: 'Application submitted' },
    { id: 'documents_verified', label: 'Documents Verified', icon: CheckCircle2, description: 'All documents checked' },
    { id: 'police_verification', label: 'Police Verification', icon: Shield, description: 'Background check' },
    { id: 'completed', label: 'All Done', icon: BadgeCheck, description: 'Verification complete!' },
  ];

  const statusOrder: Record<VerificationStatus, number> = {
    applied: 0,
    documents_verified: 1,
    police_verification: 2,
    completed: 3,
    rejected: -1,
  };

  const currentStepIndex = statusOrder[status];
  const isRejected = status === 'rejected';

  const getStepStatus = (stepIndex: number) => {
    if (isRejected && stepIndex === 1) return 'rejected';
    if (stepIndex < currentStepIndex) return 'completed';
    if (stepIndex === currentStepIndex) return 'current';
    return 'pending';
  };

  return (
    <div className="bg-card rounded-2xl shadow-card p-6">
      <h3 className="text-lg font-bold text-card-foreground mb-6 flex items-center gap-2">
        <Clock className="h-5 w-5 text-primary" />
        Verification Progress
      </h3>

      <div className="relative">
        {steps.map((step, index) => {
          const stepStatus = getStepStatus(index);
          const StepIcon = step.icon;

          return (
            <div key={step.id} className="relative flex gap-4 pb-8 last:pb-0">
              {/* Connecting Line */}
              {index < steps.length - 1 && (
                <div
                  className={`absolute left-6 top-12 w-0.5 h-full -ml-px ${
                    stepStatus === 'completed' ? 'bg-success' : 
                    stepStatus === 'rejected' ? 'bg-destructive' : 
                    'bg-border'
                  }`}
                />
              )}

              {/* Step Icon */}
              <div
                className={`relative z-10 w-12 h-12 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${
                  stepStatus === 'completed'
                    ? 'bg-success text-success-foreground'
                    : stepStatus === 'current'
                    ? 'bg-warning text-warning-foreground animate-pulse'
                    : stepStatus === 'rejected'
                    ? 'bg-destructive text-destructive-foreground'
                    : 'bg-muted text-muted-foreground'
                }`}
              >
                {stepStatus === 'completed' ? (
                  <CheckCircle2 className="h-6 w-6" />
                ) : stepStatus === 'rejected' ? (
                  <XCircle className="h-6 w-6" />
                ) : stepStatus === 'current' ? (
                  <Clock className="h-6 w-6" />
                ) : (
                  <Circle className="h-6 w-6" />
                )}
              </div>

              {/* Step Content */}
              <div className="flex-1 pt-1">
                <h4
                  className={`font-semibold ${
                    stepStatus === 'completed'
                      ? 'text-success'
                      : stepStatus === 'current'
                      ? 'text-warning'
                      : stepStatus === 'rejected'
                      ? 'text-destructive'
                      : 'text-muted-foreground'
                  }`}
                >
                  {step.label}
                </h4>
                <p className="text-sm text-muted-foreground mt-0.5">{step.description}</p>
                
                {stepStatus === 'rejected' && rejectionReason && (
                  <div className="mt-3 p-3 bg-destructive/10 rounded-lg border border-destructive/20">
                    <p className="text-sm text-destructive font-medium">❌ Reason for Rejection:</p>
                    <p className="text-sm text-destructive/80 mt-1">{rejectionReason}</p>
                  </div>
                )}
                
                {stepStatus === 'completed' && (
                  <p className="text-xs text-success mt-1">✓ Completed</p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default VerificationTimeline;
