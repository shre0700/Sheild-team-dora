import React, { useState } from 'react';
import { Certification, CertificationStatus, trainingLocations } from '@/data/mockUsers';
import { Button } from '@/components/ui/button';
import { MapPin, Calendar, Upload, CheckCircle2, Clock, Award, ChevronRight } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';

interface CertificationCardProps {
  certification: Certification;
  description: string;
  onUpdate: (updates: Partial<Certification>) => void;
}

const CertificationCard: React.FC<CertificationCardProps> = ({
  certification,
  description,
  onUpdate,
}) => {
  const [showMap, setShowMap] = useState(false);
  const [showBooking, setShowBooking] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [selectedLocation, setSelectedLocation] = useState<typeof trainingLocations[0] | null>(null);

  const timeSlots = ['9:00 AM', '10:00 AM', '11:00 AM', '2:00 PM', '3:00 PM', '4:00 PM'];

  const getStatusConfig = (status: CertificationStatus) => {
    switch (status) {
      case 'verified':
        return { color: 'bg-success', text: 'Certified ✓', progress: 100 };
      case 'certificate_uploaded':
        return { color: 'bg-primary', text: 'Certificate Under Review', progress: 80 };
      case 'training_completed':
        return { color: 'bg-primary', text: 'Training Completed', progress: 60 };
      case 'slot_booked':
        return { color: 'bg-warning', text: 'Slot Booked', progress: 40 };
      case 'applied':
        return { color: 'bg-warning', text: 'Applied', progress: 20 };
      default:
        return { color: 'bg-muted', text: 'Not Started', progress: 0 };
    }
  };

  const statusConfig = getStatusConfig(certification.status);

  const handleSelectLocation = (location: typeof trainingLocations[0]) => {
    setSelectedLocation(location);
    setShowMap(false);
    setShowBooking(true);
  };

  const handleBookSlot = () => {
    if (selectedDate && selectedTime && selectedLocation) {
      onUpdate({
        status: 'slot_booked',
        bookedDate: selectedDate.toISOString().split('T')[0],
        bookedTime: selectedTime,
        trainingLocation: selectedLocation.name,
      });
      setShowBooking(false);
      setSelectedDate(undefined);
      setSelectedTime('');
    }
  };

  const handleUploadCertificate = () => {
    onUpdate({
      status: 'certificate_uploaded',
      certificateUploaded: true,
    });
  };

  return (
    <div className="bg-card rounded-2xl shadow-card overflow-hidden">
      {/* Header */}
      <div className="gradient-primary p-5">
        <div className="flex items-center gap-4">
          <span className="text-4xl">{certification.icon}</span>
          <div className="flex-1">
            <h3 className="text-lg font-bold text-primary-foreground">{certification.name}</h3>
            <p className="text-sm text-primary-foreground/80">{description}</p>
          </div>
          {certification.status === 'verified' && (
            <div className="bg-success/20 p-2 rounded-full">
              <Award className="h-6 w-6 text-success-foreground" />
            </div>
          )}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="px-5 pt-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-card-foreground">{statusConfig.text}</span>
          <span className="text-xs text-muted-foreground">{statusConfig.progress}%</span>
        </div>
        <div className="h-2 bg-muted rounded-full overflow-hidden">
          <div
            className={`h-full ${statusConfig.color} transition-all duration-500`}
            style={{ width: `${statusConfig.progress}%` }}
          />
        </div>
      </div>

      {/* Booking Info */}
      {certification.bookedDate && (
        <div className="px-5 pt-4">
          <div className="p-3 bg-muted/50 rounded-xl">
            <div className="flex items-center gap-2 text-sm text-card-foreground">
              <Calendar className="h-4 w-4 text-primary" />
              <span>{certification.bookedDate} at {certification.bookedTime}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
              <MapPin className="h-4 w-4" />
              <span>{certification.trainingLocation}</span>
            </div>
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="p-5 space-y-3">
        {certification.status === 'not_started' && (
          <Button
            variant="action"
            size="lg"
            className="w-full"
            onClick={() => setShowMap(true)}
          >
            <MapPin className="h-5 w-5" />
            Find a Training Cohort
            <ChevronRight className="h-5 w-5 ml-auto" />
          </Button>
        )}

        {certification.status === 'applied' && (
          <Button
            variant="action"
            size="lg"
            className="w-full"
            onClick={() => setShowMap(true)}
          >
            <Calendar className="h-5 w-5" />
            Book a Slot
            <ChevronRight className="h-5 w-5 ml-auto" />
          </Button>
        )}

        {certification.status === 'training_completed' && !certification.certificateUploaded && (
          <Button
            variant="action"
            size="lg"
            className="w-full"
            onClick={handleUploadCertificate}
          >
            <Upload className="h-5 w-5" />
            Upload Certificate
            <ChevronRight className="h-5 w-5 ml-auto" />
          </Button>
        )}

        {certification.status === 'certificate_uploaded' && !certification.certificateVerified && (
          <div className="flex items-center gap-3 p-4 bg-primary/10 rounded-xl">
            <Clock className="h-6 w-6 text-primary animate-pulse" />
            <div>
              <p className="font-medium text-card-foreground">Certificate Under Review</p>
              <p className="text-sm text-muted-foreground">Usually takes 2-3 working days</p>
            </div>
          </div>
        )}

        {certification.status === 'verified' && (
          <div className="flex items-center gap-3 p-4 bg-success/10 rounded-xl">
            <CheckCircle2 className="h-6 w-6 text-success" />
            <div>
              <p className="font-medium text-success">Certification Complete!</p>
              <p className="text-sm text-muted-foreground">You are now certified</p>
            </div>
          </div>
        )}
      </div>

      {/* Map Dialog */}
      <Dialog open={showMap} onOpenChange={setShowMap}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Find Training Centers</DialogTitle>
            <DialogDescription>
              Select a nearby training location for {certification.name}
            </DialogDescription>
          </DialogHeader>
          
          {/* Placeholder Map */}
          <div className="relative h-64 bg-muted rounded-xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="h-12 w-12 text-primary mx-auto mb-2 animate-bounce" />
                <p className="text-sm text-muted-foreground">Interactive Map View</p>
              </div>
            </div>
          </div>

          <div className="space-y-3 max-h-48 overflow-y-auto">
            {trainingLocations.map((location) => (
              <button
                key={location.id}
                onClick={() => handleSelectLocation(location)}
                className="w-full p-4 bg-muted/50 hover:bg-muted rounded-xl text-left transition-colors flex items-center gap-4"
              >
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                  <MapPin className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-card-foreground">{location.name}</p>
                  <p className="text-sm text-muted-foreground">{location.address}</p>
                </div>
                <ChevronRight className="h-5 w-5 text-muted-foreground" />
              </button>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      {/* Booking Dialog */}
      <Dialog open={showBooking} onOpenChange={setShowBooking}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Book Your Slot</DialogTitle>
            <DialogDescription>
              {selectedLocation?.name} - {selectedLocation?.address}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6">
            <div>
              <label className="text-sm font-medium text-card-foreground mb-3 block">
                Select Date
              </label>
              <CalendarComponent
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                disabled={(date) => date < new Date()}
                className="rounded-xl border pointer-events-auto"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-card-foreground mb-3 block">
                Select Time
              </label>
              <div className="grid grid-cols-3 gap-2">
                {timeSlots.map((time) => (
                  <button
                    key={time}
                    onClick={() => setSelectedTime(time)}
                    className={`p-3 rounded-lg text-sm font-medium transition-all ${
                      selectedTime === time
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted hover:bg-muted/80 text-card-foreground'
                    }`}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>

            <Button
              variant="action"
              size="lg"
              className="w-full"
              disabled={!selectedDate || !selectedTime}
              onClick={handleBookSlot}
            >
              <CheckCircle2 className="h-5 w-5" />
              Confirm Booking
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CertificationCard;
