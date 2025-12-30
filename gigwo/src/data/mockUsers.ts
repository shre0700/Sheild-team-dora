import bauna from './bauna.jpeg';
import zimmedar from './zimmedar.jpeg';
import grrav from './grrav.jpeg';


export type VerificationStatus =
  | 'applied'
  | 'documents_verified'
  | 'police_verification'
  | 'completed'
  | 'rejected';

export type CertificationStatus =
  | 'not_started'
  | 'applied'
  | 'slot_booked'
  | 'training_completed'
  | 'certificate_uploaded'
  | 'verified';

export interface Document {
  id: string;
  name: string;
  uploaded: boolean;
  verified: boolean;
  rejected: boolean;
  rejectionReason?: string;
  previewUrl?: string;
}

export interface GigCategory {
  id: string;
  name: string;
  icon: string;
  requiredDocuments: string[];
}

export interface Certification {
  id: string;
  name: string;
  icon: string;
  status: CertificationStatus;
  bookedDate?: string;
  bookedTime?: string;
  trainingLocation?: string;
  certificateUploaded?: boolean;
  certificateVerified?: boolean;
}

export interface User {
  id: string;
  name: string;
  phone: string; 
  gid: string;   
  photo: string;
  selectedCategories: string[];
  verificationStatus: VerificationStatus;
  rejectionReason?: string;
  documents: Document[];
  certifications: Certification[];
}


export const gigCategories: GigCategory[] = [
  {
    id: 'ride_hailing',
    name: 'Ride-Hailing Drivers',
    icon: '🚗',
    requiredDocuments: ['driving_license', 'vehicle_rc', 'aadhar', 'pan'],
  },
  {
    id: 'delivery',
    name: 'Delivery Partners',
    icon: '📦',
    requiredDocuments: [
      'driving_license',
      'vehicle_rc',
      'aadhar',
      'pan',
      'education_certificate',
    ],
  },
  {
    id: 'home_service',
    name: 'Home Service Professionals',
    icon: '🔧',
    requiredDocuments: ['aadhar', 'pan', 'skill_certificate', 'address_proof'],
  },
  {
    id: 'banking_agent',
    name: 'Banking / AePS Field Agents',
    icon: '🏦',
    requiredDocuments: ['aadhar', 'pan', 'skill_certificate'],
  },
  {
    id: 'healthcare',
    name: 'Healthcare Home-Visit Staff',
    icon: '🏥',
    requiredDocuments: ['aadhar', 'pan', 'medical_certificate'],
  },
  {
    id: 'utility',
    name: 'Utility & Field Staff',
    icon: '⚡',
    requiredDocuments: ['aadhar', 'pan', 'address_proof'],
  },
  {
    id: 'ecommerce',
    name: 'E-commerce Delivery',
    icon: '🛒',
    requiredDocuments: [
      'driving_license',
      'aadhar',
      'pan',
      'vehicle_rc',
      'education_certificate',
    ],
  },
  {
    id: 'security',
    name: 'Security / Verification Personnel',
    icon: '🛡️',
    requiredDocuments: ['aadhar', 'pan'],
  },
];


export const allDocuments = [
  { id: 'driving_license', name: 'Driving License' },
  { id: 'vehicle_rc', name: 'Vehicle RC' },
  { id: 'aadhar', name: 'Aadhaar Card' },
  { id: 'pan', name: 'PAN Card' },
  { id: 'address_proof', name: 'Address Proof' },
  { id: 'skill_certificate', name: 'Agent Authorization' },
  { id: 'education_certificate', name: 'Bank Account Proof' },
  { id: 'medical_certificate', name: 'Medical Qualification' },
];


export const certificationTypes = [
  {
    id: 'women_safety',
    name: 'Women Safety',
    icon: '👩‍🦰',
    description: 'Learn essential safety protocols for women passengers',
  },
  {
    id: 'medical_emergency',
    name: 'Medical Emergency Responder',
    icon: '🚑',
    description: 'First aid and emergency response training',
  },
  {
    id: 'fire_safety',
    name: 'Fire & Utility Safety Responder',
    icon: '🔥',
    description: 'Fire safety and utility emergency handling',
  },
];


export const mockUsers: User[] = [
  {
    id: 'user1',
    name: 'Zimmedar Singh',
    phone: '+91 98765 43210',
    gid: 'GID-A9F3-KQ7M-2X8B',
    photo: zimmedar,
    selectedCategories: ['ride_hailing', 'delivery'],
    verificationStatus: 'completed',
    documents: [
      { id: 'driving_license', name: 'Driving License', uploaded: true, verified: true, rejected: false, previewUrl: '/placeholder.svg' },
      { id: 'vehicle_rc', name: 'Vehicle RC', uploaded: true, verified: true, rejected: false, previewUrl: '/placeholder.svg' },
      { id: 'aadhar', name: 'Aadhaar Card', uploaded: true, verified: true, rejected: false, previewUrl: '/placeholder.svg' },
      { id: 'pan', name: 'PAN Card', uploaded: true, verified: true, rejected: false, previewUrl: '/placeholder.svg' },
      { id: 'police_clearance', name: 'Police Clearance Certificate', uploaded: true, verified: true, rejected: false, previewUrl: '/placeholder.svg' },
      { id: 'address_proof', name: 'Address Proof', uploaded: true, verified: true, rejected: false, previewUrl: '/placeholder.svg' },
    ],
    certifications: [
      { id: 'women_safety', name: 'Women Safety', icon: '👩‍🦰', status: 'verified', bookedDate: '2024-01-15', bookedTime: '10:00 AM', trainingLocation: 'Skill India Center, Connaught Place', certificateUploaded: true, certificateVerified: true },
      { id: 'medical_emergency', name: 'Medical Emergency Responder', icon: '🚑', status: 'training_completed', bookedDate: '2024-02-01', bookedTime: '2:00 PM', trainingLocation: 'Red Cross Delhi' },
      { id: 'fire_safety', name: 'Fire & Utility Safety Responder', icon: '🔥', status: 'not_started' },
    ],
  },

  {
    id: 'user2',
    name: 'Bauna Jangid',
    phone: '+91 91234 56789',
    gid: 'GID-Z4P2-8NMW-LC7A',
    photo: bauna,
    selectedCategories: ['healthcare', 'home_service'],
    verificationStatus: 'rejected',
    rejectionReason: 'Address proof document is unclear.',
    documents: [
      { id: 'aadhar', name: 'Aadhaar Card', uploaded: true, verified: true, rejected: false, previewUrl: '/placeholder.svg' },
      { id: 'pan', name: 'PAN Card', uploaded: true, verified: true, rejected: false, previewUrl: '/placeholder.svg' },
      { id: 'medical_certificate', name: 'Medical Certificate', uploaded: true, verified: true, rejected: false, previewUrl: '/placeholder.svg' },
      { id: 'skill_certificate', name: 'Skill Certificate', uploaded: true, verified: false, rejected: false, previewUrl: '/placeholder.svg' },
      { id: 'police_clearance', name: 'Police Clearance Certificate', uploaded: true, verified: false, rejected: false, previewUrl: '/placeholder.svg' },
      { id: 'address_proof', name: 'Address Proof', uploaded: true, verified: false, rejected: true, rejectionReason: 'Image is blurry', previewUrl: '/placeholder.svg' },
    ],
    certifications: [
      { id: 'women_safety', name: 'Women Safety', icon: '👩‍🦰', status: 'not_started' },
      { id: 'medical_emergency', name: 'Medical Emergency Responder', icon: '🚑', status: 'slot_booked', bookedDate: '2024-03-01', bookedTime: '11:00 AM', trainingLocation: 'Apollo Hospital Training Center' },
      { id: 'fire_safety', name: 'Fire & Utility Safety Responder', icon: '🔥', status: 'not_started' },
    ],
  },

  {
    id: 'user3',
    name: 'Amit Singh',
    phone: '+91 99887 66554',
    gid: 'GID-M6R9-TA3X-Q2F8',
    photo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9LYGuvXKx36XSqprGLRoZV-crFkIaI9iFfw&s',
    selectedCategories: ['delivery'],
    verificationStatus: 'applied',
    documents: [
      { id: 'driving_license', name: 'Driving License', uploaded: true, verified: false, rejected: false, previewUrl: '/placeholder.svg' },
      { id: 'aadhar', name: 'Aadhaar Card', uploaded: true, verified: false, rejected: false, previewUrl: '/placeholder.svg' },
      { id: 'pan', name: 'PAN Card', uploaded: false, verified: false, rejected: false },
      { id: 'address_proof', name: 'Address Proof', uploaded: false, verified: false, rejected: false },
    ],
    certifications: [
      { id: 'women_safety', name: 'Women Safety', icon: '👩‍🦰', status: 'applied' },
      { id: 'medical_emergency', name: 'Medical Emergency Responder', icon: '🚑', status: 'not_started' },
      { id: 'fire_safety', name: 'Fire & Utility Safety Responder', icon: '🔥', status: 'not_started' },
    ],
  },

  {
    id: 'user4',
    name: 'Grrav',
    phone: '+91 90909 80808',
    gid: 'GID-7BKP-X4N2-9MAD',
    photo: grrav,
    selectedCategories: ['banking_agent', 'ecommerce'],
    verificationStatus: 'documents_verified',
    documents: [
      { id: 'aadhar', name: 'Aadhaar Card', uploaded: true, verified: true, rejected: false, previewUrl: '/placeholder.svg' },
      { id: 'pan', name: 'PAN Card', uploaded: true, verified: true, rejected: false, previewUrl: '/placeholder.svg' },
      { id: 'education_certificate', name: 'Education Certificate', uploaded: true, verified: true, rejected: false, previewUrl: '/placeholder.svg' },
      { id: 'police_clearance', name: 'Police Clearance Certificate', uploaded: true, verified: true, rejected: false, previewUrl: '/placeholder.svg' },
      { id: 'driving_license', name: 'Driving License', uploaded: true, verified: true, rejected: false, previewUrl: '/placeholder.svg' },
    ],
    certifications: [
      { id: 'women_safety', name: 'Women Safety', icon: '👩‍🦰', status: 'certificate_uploaded', bookedDate: '2024-01-20', bookedTime: '3:00 PM', trainingLocation: 'NSDC Center, Noida', certificateUploaded: true, certificateVerified: false },
      { id: 'medical_emergency', name: 'Medical Emergency Responder', icon: '🚑', status: 'not_started' },
      { id: 'fire_safety', name: 'Fire & Utility Safety Responder', icon: '🔥', status: 'not_started' },
    ],
  },

  {
    id: 'user5',
    name: 'Katiya',
    phone: '+91 95555 44433',
    gid: 'GID-C8XQ-5A2R-N7FM',
    photo: 'https://media.licdn.com/dms/image/v2/D5603AQF01dbOjOwMmQ/profile-displayphoto-shrink_800_800/B56ZeTfgHWHQAo-/0/1750526199592',
    selectedCategories: ['security', 'utility'],
    verificationStatus: 'police_verification',
    documents: [
      { id: 'aadhar', name: 'Aadhaar Card', uploaded: true, verified: true, rejected: false, previewUrl: '/placeholder.svg' },
      { id: 'pan', name: 'PAN Card', uploaded: true, verified: true, rejected: false, previewUrl: '/placeholder.svg' },
      { id: 'police_clearance', name: 'Police Clearance Certificate', uploaded: true, verified: true, rejected: false, previewUrl: '/placeholder.svg' },
      { id: 'education_certificate', name: 'Education Certificate', uploaded: true, verified: true, rejected: false, previewUrl: '/placeholder.svg' },
      { id: 'address_proof', name: 'Address Proof', uploaded: true, verified: true, rejected: false, previewUrl: '/placeholder.svg' },
      { id: 'skill_certificate', name: 'Skill Certificate', uploaded: true, verified: true, rejected: false, previewUrl: '/placeholder.svg' },
    ],
    certifications: [
      { id: 'women_safety', name: 'Women Safety', icon: '👩‍🦰', status: 'verified', bookedDate: '2024-01-10', bookedTime: '9:00 AM', trainingLocation: 'Police Training Academy', certificateUploaded: true, certificateVerified: true },
      { id: 'medical_emergency', name: 'Medical Emergency Responder', icon: '🚑', status: 'verified', bookedDate: '2024-01-25', bookedTime: '10:00 AM', trainingLocation: 'AIIMS Training Wing', certificateUploaded: true, certificateVerified: true },
      { id: 'fire_safety', name: 'Fire & Utility Safety Responder', icon: '🔥', status: 'training_completed', bookedDate: '2024-02-05', bookedTime: '2:00 PM', trainingLocation: 'Fire Station HQ' },
    ],
  },
];

export const trainingLocations = [
  { id: 1, name: 'Skill India Center', address: 'Connaught Place, New Delhi', lat: 28.6315, lng: 77.2167 },
  { id: 2, name: 'NSDC Training Hub', address: 'Sector 44, Noida', lat: 28.5355, lng: 77.391 },
  { id: 3, name: 'Red Cross Delhi', address: 'Red Cross Road, New Delhi', lat: 28.6139, lng: 77.209 },
  { id: 4, name: 'Apollo Training Center', address: 'Sarita Vihar, Delhi', lat: 28.5278, lng: 77.2927 },
  { id: 5, name: 'Police Training Academy', address: 'Rohini, Delhi', lat: 28.7041, lng: 77.1025 },
];

