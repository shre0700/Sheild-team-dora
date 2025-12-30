import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import CertificationCard from '@/components/CertificationCard';
import CertificationTimeline from '@/components/CertificationTimeline';
import { useUser } from '@/context/UserContext';
import { certificationTypes, Certification } from '@/data/mockUsers';
import { toast } from 'sonner';

const GetCertified: React.FC = () => {
  const { currentUser, updateUser } = useUser();
  const [activeCertId, setActiveCertId] = useState<string | null>(null);

  const handleCertificationUpdate = (
    certId: string,
    updates: Partial<Certification>
  ) => {
    const updatedCertifications = currentUser.certifications.map((cert) =>
      cert.id === certId ? { ...cert, ...updates } : cert
    );

    updateUser(currentUser.id, { certifications: updatedCertifications });

    if (updates.status === 'slot_booked') {
      toast.success('Slot booked successfully!', {
        description: `Scheduled for ${updates.bookedDate} at ${updates.bookedTime}`,
      });
    } else if (updates.certificateUploaded) {
      toast.success('Certificate uploaded!', {
        description: 'Your certificate is under review.',
      });
    }
  };

  return (
    <>
      <Helmet>
        <title>Get Certified | Gig Worker Portal</title>
      </Helmet>

      <div className="min-h-screen bg-background">
        <main className="container mx-auto max-w-4xl px-4 py-10">
          <div className="space-y-10">
            {/* Header */}
            <div className="text-center space-y-2">
              <h1 className="text-3xl font-semibold text-foreground">
                Skill Certifications
              </h1>
              <p className="text-sm text-muted-foreground max-w-xl mx-auto">
                Click a certification to view details and complete the process
              </p>
            </div>

            {/* Certification Accordion Cards */}
            <div className="space-y-4">
              {certificationTypes.map((certType) => {
                const userCert =
                  currentUser.certifications.find(
                    (c) => c.id === certType.id
                  ) || {
                    id: certType.id,
                    name: certType.name,
                    icon: certType.icon,
                    status: 'not_started' as const,
                  };

                const isOpen = activeCertId === certType.id;

                return (
                  <div
                    key={certType.id}
                    className="bg-card rounded-2xl shadow-card overflow-hidden"
                  >
                    {/* Clickable Header */}
                    <button
                      onClick={() =>
                        setActiveCertId(isOpen ? null : certType.id)
                      }
                      className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-muted/40 transition"
                    >
                      <div className="flex items-center gap-4">
                        <span className="text-2xl">{certType.icon}</span>
                        <div>
                          <h3 className="font-medium text-foreground">
                            {certType.name}
                          </h3>
                          <p className="text-xs text-muted-foreground">
                            Status: {userCert.status.replace('_', ' ')}
                          </p>
                        </div>
                      </div>

                      <span className="text-muted-foreground text-sm">
                        {isOpen ? '▲' : '▼'}
                      </span>
                    </button>

                    {/* Expandable Content */}
                    {isOpen && (
                      <div className="border-t border-border">
                        <div className="px-6 pt-6 pb-2">
                          <CertificationTimeline
                            status={userCert.status}
                          />
                        </div>

                        <div className="px-6 pb-6">
                          <CertificationCard
                            certification={userCert}
                            description={certType.description}
                            onUpdate={(updates) =>
                              handleCertificationUpdate(
                                certType.id,
                                updates
                              )
                            }
                          />
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Benefits */}
            <div className="bg-card rounded-2xl shadow-card p-8">
              <h3 className="text-lg font-semibold mb-6">
                Why get certified?
              </h3>

              <ul className="grid sm:grid-cols-2 gap-4">
                {[
                  'Higher priority in job matching',
                  'More trust from customers',
                  'Access to premium gigs',
                  'Government recognized certification',
                ].map((benefit, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 text-sm text-muted-foreground"
                  >
                    <span className="w-5 h-5 rounded-full bg-success/10 text-success flex items-center justify-center text-xs">
                      ✓
                    </span>
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default GetCertified;
