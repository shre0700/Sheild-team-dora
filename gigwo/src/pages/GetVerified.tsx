import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import Header from '@/components/Header';
import CategorySelector from '@/components/CategorySelector';
import DocumentUpload from '@/components/DocumentUpload';
import VerificationTimeline from '@/components/VerificationTimeline';
import { useUser } from '@/context/UserContext';
import { toast } from 'sonner';

const GetVerified: React.FC = () => {
  const { currentUser, updateUser } = useUser();
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    currentUser.selectedCategories
  );

  const handleCategoryChange = (categories: string[]) => {
    setSelectedCategories(categories);
    updateUser(currentUser.id, { selectedCategories: categories });
  };

  const handleDocumentUpload = (docId: string) => {
    const updatedDocuments = currentUser.documents.map((doc) =>
      doc.id === docId
        ? { ...doc, uploaded: true, rejected: false, rejectionReason: undefined, previewUrl: '/placeholder.svg' }
        : doc
    );

    const docExists = currentUser.documents.some((doc) => doc.id === docId);
    if (!docExists) {
      const docName = docId.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase());
      updatedDocuments.push({
        id: docId,
        name: docName,
        uploaded: true,
        verified: false,
        rejected: false,
        previewUrl: '/placeholder.svg',
      });
    }

    updateUser(currentUser.id, { documents: updatedDocuments });
    toast.success('Document uploaded successfully!', {
      description: 'Your document is now pending verification.',
    });
  };

  return (
    <>
      <Helmet>
        <title>Get Verified | Gig Worker Portal</title>
        <meta name="description" content="Upload your documents and get verified as a gig worker through the Government of India portal." />
      </Helmet>

      <div className="min-h-screen gradient-hero">

        <main className="container mx-auto px-4 py-6">
          <div className="space-y-6">
            <div className="text-center animate-fade-in">
              <h1 className="text-2xl font-bold text-foreground mb-2">
                Verification Process
              </h1>
              <p className="text-muted-foreground">
                Upload your documents to get officially verified
              </p>
            </div>

            {/* Verification Timeline */}
            <div className="animate-slide-up">
              <VerificationTimeline
                status={currentUser.verificationStatus}
                rejectionReason={currentUser.rejectionReason}
              />
            </div>

            {/* Category Selector */}
            <div className="animate-slide-up" style={{ animationDelay: '0.1s' }}>
              <CategorySelector
                selectedCategories={selectedCategories}
                onSelectionChange={handleCategoryChange}
              />
            </div>

            {/* Document Upload */}
            <div className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <DocumentUpload
                selectedCategories={selectedCategories}
                documents={currentUser.documents}
                onDocumentUpload={handleDocumentUpload}
              />
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default GetVerified;
