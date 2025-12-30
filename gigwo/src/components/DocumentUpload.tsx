import React, { useState } from 'react';
import { Document, gigCategories, allDocuments } from '@/data/mockUsers';
import { Button } from '@/components/ui/button';
import { Upload, Eye, CheckCircle2, XCircle, Clock, FileText, X } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface DocumentUploadProps {
  selectedCategories: string[];
  documents: Document[];
  onDocumentUpload: (docId: string) => void;
}

const DocumentUpload: React.FC<DocumentUploadProps> = ({
  selectedCategories,
  documents,
  onDocumentUpload,
}) => {
  const [previewDoc, setPreviewDoc] = useState<Document | null>(null);

  // Get required documents based on selected categories
  const getRequiredDocumentIds = () => {
    if (selectedCategories.length === 0) {
      return allDocuments.map((d) => d.id);
    }

    const requiredDocs = new Set<string>();
    selectedCategories.forEach((catId) => {
      const category = gigCategories.find((c) => c.id === catId);
      category?.requiredDocuments.forEach((docId) => requiredDocs.add(docId));
    });
    return Array.from(requiredDocs);
  };

  const requiredDocIds = getRequiredDocumentIds();

  const getDocumentStatus = (docId: string) => {
    const doc = documents.find((d) => d.id === docId);
    if (!doc) return { status: 'not_uploaded', doc: null };
    if (doc.rejected) return { status: 'rejected', doc };
    if (doc.verified) return { status: 'verified', doc };
    if (doc.uploaded) return { status: 'pending', doc };
    return { status: 'not_uploaded', doc };
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'verified':
        return <CheckCircle2 className="h-6 w-6 text-success" />;
      case 'rejected':
        return <XCircle className="h-6 w-6 text-destructive" />;
      case 'pending':
        return <Clock className="h-6 w-6 text-warning" />;
      default:
        return <FileText className="h-6 w-6 text-muted-foreground" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'verified':
        return (
          <span className="px-3 py-1 text-xs font-medium bg-success/10 text-success rounded-full">
            ✓ Verified
          </span>
        );
      case 'rejected':
        return (
          <span className="px-3 py-1 text-xs font-medium bg-destructive/10 text-destructive rounded-full">
            ✗ Rejected
          </span>
        );
      case 'pending':
        return (
          <span className="px-3 py-1 text-xs font-medium bg-warning/10 text-warning rounded-full">
            ⏳ Pending
          </span>
        );
      default:
        return (
          <span className="px-3 py-1 text-xs font-medium bg-muted text-muted-foreground rounded-full">
            Upload Required
          </span>
        );
    }
  };

  return (
    <div className="bg-card rounded-2xl shadow-card p-6">
      <h3 className="text-lg font-bold text-card-foreground mb-2">
        Upload Documents
      </h3>
      <p className="text-sm text-muted-foreground mb-6">
        {selectedCategories.length > 0
          ? 'Showing documents required for your selected gig categories'
          : 'Select gig categories above to see specific requirements'}
      </p>

      <div className="space-y-4">
        {allDocuments
          .filter((doc) => requiredDocIds.includes(doc.id))
          .map((docType) => {
            const { status, doc } = getDocumentStatus(docType.id);

            return (
              <div
                key={docType.id}
                className={`p-4 rounded-xl border-2 transition-all ${
                  status === 'verified'
                    ? 'border-success/30 bg-success/5'
                    : status === 'rejected'
                    ? 'border-destructive/30 bg-destructive/5'
                    : status === 'pending'
                    ? 'border-warning/30 bg-warning/5'
                    : 'border-border bg-muted/30'
                }`}
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    {getStatusIcon(status)}
                    <div>
                      <h4 className="font-semibold text-card-foreground">
                        {docType.name}
                      </h4>
                      {doc?.rejected && doc.rejectionReason && (
                        <p className="text-xs text-destructive mt-1">
                          {doc.rejectionReason}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {getStatusBadge(status)}
                    
                    {doc?.uploaded && (
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setPreviewDoc(doc)}
                        className="h-10 w-10"
                      >
                        <Eye className="h-5 w-5" />
                      </Button>
                    )}

                    {(status === 'not_uploaded' || status === 'rejected') && (
                      <Button
                        variant={status === 'rejected' ? 'destructive' : 'default'}
                        size="sm"
                        onClick={() => onDocumentUpload(docType.id)}
                        className="gap-2"
                      >
                        <Upload className="h-4 w-4" />
                        {status === 'rejected' ? 'Re-upload' : 'Upload'}
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
      </div>

      {/* Preview Dialog */}
      <Dialog open={!!previewDoc} onOpenChange={() => setPreviewDoc(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{previewDoc?.name}</DialogTitle>
          </DialogHeader>
          <div className="flex items-center justify-center p-8 bg-muted rounded-lg">
            <div className="text-center">
              <FileText className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <p className="text-sm text-muted-foreground">
                Document Preview
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                (Demo - actual preview would show here)
              </p>
            </div>
          </div>
          <Button onClick={() => setPreviewDoc(null)} className="w-full">
            Close Preview
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DocumentUpload;
