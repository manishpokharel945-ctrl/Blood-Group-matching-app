export type BloodGroup = 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';

export type ComponentType = 'Whole Blood' | 'Platelets' | 'Plasma' | 'Packed Red Cells' | 'Cryoprecipitate';

export interface BusinessHours {
  emergency: string;
  desk: string;
  donation: string;
}

export interface BloodStock {
  component: ComponentType;
  units: number;
  status: 'Stable' | 'Low' | 'Critical' | 'Unknown';
}

export interface Hospital {
  id: string;
  name: string;
  address: string;
  district: string;
  distance: number;
  phone: string;
  email: string;
  isEmergencyOpen24_7: boolean;
  hours: BusinessHours;
  updatedMinutesAgo: number;
  stocks: Partial<Record<BloodGroup, BloodStock[]>>;
  overviewImage: string;
}

export interface EmergencyAlert {
  id: string;
  hospitalName: string;
  hospitalId: string;
  bloodGroup: BloodGroup;
  unitsNeeded: number;
  level: 'CRITICAL' | 'LOW STOCK' | 'SECURED' | 'PENDING';
  distance: number;
  location: string;
}

export interface RareRequest {
  id: string;
  bloodGroup: BloodGroup;
  hospitalName: string;
  hospitalId: string;
  unitsNeeded: number;
  timeAgoText: string;
  status: 'URGENT' | 'SECURED' | 'PENDING';
}

export interface DonorBooking {
  id: string;
  hospitalId: string;
  hospitalName: string;
  donorName: string;
  donorPhone: string;
  bloodGroup: BloodGroup;
  date: string;
  timeSlot: string;
}

export interface UrgentRequestSubmission {
  id: string;
  patientName: string;
  bloodGroup: BloodGroup;
  componentType: ComponentType;
  unitsNeeded: number;
  hospitalName: string;
  contactPerson: string;
  contactPhone: string;
  reason: string;
  status: 'PENDING' | 'VERIFIED' | 'COMPLETED';
  dateCreated: string;
}
