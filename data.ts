import { Hospital, EmergencyAlert, RareRequest, BloodGroup, ComponentType, BloodStock } from './types';

export const INITIAL_HOSPITALS: Hospital[] = [
  {
    id: 'tuth',
    name: 'T.U. Teaching Hospital (TUTH)',
    address: 'Maharajgunj, Kathmandu',
    district: 'Kathmandu',
    distance: 2.4,
    phone: '+977 01-4412404',
    email: 'info@tuth.org.np',
    isEmergencyOpen24_7: true,
    hours: {
      emergency: '24 Hours',
      desk: '08:00 - 20:00',
      donation: '09:00 - 17:00'
    },
    updatedMinutesAgo: 5,
    overviewImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBn77NSNoJrdh2j2cmjUdlWFS4wIt5BYmdfuCh5hZVbu8JYB7NqeDE1QlzHr9vpyjLloiQyxG41nYZSXm6-wNre3h_CNAul5jLbOe-0ugj1TePD-arSAXExoPsfoBxV091ptYKEGgg36bq4150yT6sanSmuhv29h7t-DFKaE9UEe2JIF31ZG4Upxbt3K29NpZRNBOKEtdTEsKdfta4ShzTCo8nsqmaIklEMQpxkhBoIfzxWUAZxkSJADTyYml8OPgUsktns0dhr-Q',
    stocks: {
      'A+': [
        { component: 'Whole Blood', units: 12, status: 'Stable' },
        { component: 'Platelets', units: 4, status: 'Stable' },
        { component: 'Plasma', units: 8, status: 'Stable' }
      ],
      'O+': [
        { component: 'Whole Blood', units: 8, status: 'Stable' },
        { component: 'Platelets', units: 3, status: 'Stable' }
      ],
      'B-': [
        { component: 'Whole Blood', units: 4, status: 'Low' },
        { component: 'Platelets', units: 1, status: 'Low' }
      ],
      'O-': [
        { component: 'Whole Blood', units: 0, status: 'Critical' },
        { component: 'Platelets', units: 0, status: 'Critical' }
      ],
      'AB-': [
        { component: 'Whole Blood', units: 3, status: 'Stable' },
        { component: 'Plasma', units: 6, status: 'Stable' }
      ]
    }
  },
  {
    id: 'nrcs',
    name: 'Nepal Red Cross Society',
    address: 'Soalteemode, Kathmandu',
    district: 'Kathmandu',
    distance: 3.8,
    phone: '+977 01-4272761',
    email: 'blood@nrcs.org',
    isEmergencyOpen24_7: true,
    hours: {
      emergency: '24 Hours',
      desk: '07:00 - 22:00',
      donation: '08:00 - 18:00'
    },
    updatedMinutesAgo: 12,
    overviewImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCGHIK4d8mFg7kRez4EXhvE-x-iztGrGJ44_1aOXwpQRKImNQDhSNqT4rNk3iIza1Hu0zYlRXysjq7iDr0DBuRcm3F90LvS9b6XeWKYloGSqLgIiYyMutVqHsXrZPizh3js7KovaJciAyeygxv9ob_GeYV0CiagFNGBfHklQL7Hk7qSQlxHcnffjFPyZU3PwBCUV2yU9v8qex6jy4o1gbyNzxjgUxRjAQTxhjNPLV_sZtMN3YTqXVEe8WxxZo9YAcnA1j93Z4zegA',
    stocks: {
      'AB+': [
        { component: 'Whole Blood', units: 2, status: 'Low' },
        { component: 'Platelets', units: 5, status: 'Stable' }
      ],
      'O-': [
        { component: 'Whole Blood', units: 1, status: 'Critical' },
        { component: 'Platelets', units: 0, status: 'Critical' }
      ],
      'O+': [
        { component: 'Whole Blood', units: 24, status: 'Stable' },
        { component: 'Platelets', units: 15, status: 'Stable' },
        { component: 'Plasma', units: 20, status: 'Stable' }
      ],
      'A+': [
        { component: 'Whole Blood', units: 18, status: 'Stable' },
        { component: 'Platelets', units: 9, status: 'Stable' }
      ]
    }
  },
  {
    id: 'alka',
    name: 'Alka Hospital',
    address: 'Jawalakhel, Lalitpur',
    district: 'Lalitpur',
    distance: 5.1,
    phone: '+977 01-5551555',
    email: 'info@alkahospital.com',
    isEmergencyOpen24_7: true,
    hours: {
      emergency: '24 Hours',
      desk: '08:00 - 20:00',
      donation: '09:00 - 17:00'
    },
    updatedMinutesAgo: 45,
    overviewImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBkrPBHzyP8LwG9upXJHKml8NydoVu5OyfB5d41LVpiLWtQrzzJsBqrVRx6fMtVZKvseTz3tDLpcbEvuYvEVHlimecG0MznG22KKaHC1MkP7isZwWPd1gzjVd0ELxRNN__LUvxAkx4NVS7ZVoQXAeQe-_G6LqLhxJrHfzsUtrU6BF27ISWisJcNiGR5p0egJJRqDWUEUOWwLVoDYx__gMc9cj8CzhyeoS_xKKJZ5qoYEeUE3fRbzTgiGVUWguHSXlEhLDsmVyFg6g',
    stocks: {
      'A+': [],
      'O+': [],
      'B-': []
    }
  },
  {
    id: 'grande',
    name: 'Grande International Hospital',
    address: 'Dhapasi, Kathmandu',
    district: 'Kathmandu',
    distance: 7.2,
    phone: '+977 01-5151515',
    email: 'info@grandehospital.com',
    isEmergencyOpen24_7: true,
    hours: {
      emergency: '24 Hours',
      desk: '08:00 - 21:00',
      donation: '09:00 - 16:30'
    },
    updatedMinutesAgo: 2,
    overviewImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAgvMEPLQrJmr5PzL-4KRcDOyDDbC36rck3AOKc3NDGMKB-Q0VG3pWgOQge4yr6NaxiUirS4enczzTkf9qnvXfDKWWGLImBIf0T1TTQ3BmZ3dw9NSZgWwW2eCco2AchWn3MAL_vBiXQebdh4cWKhJ1aJw9_xEz6W4vS-W1Q_5cH7EQbZPjCy0aUrmoRGlo6aL_l1NFCg2qf9q6Lb3Jqyu0bklgOKRbRSepaR3QXpcq1d6Wq-4tJR-gXmQkIG0uFvY9K2Hb2oF282w',
    stocks: {
      'A-': [
        { component: 'Whole Blood', units: 9, status: 'Stable' },
        { component: 'Platelets', units: 2, status: 'Low' }
      ],
      'B+': [
        { component: 'Whole Blood', units: 15, status: 'Stable' },
        { component: 'Platelets', units: 8, status: 'Stable' }
      ],
      'O-': [
        { component: 'Whole Blood', units: 3, status: 'Stable' }
      ]
    }
  },
  {
    id: 'bir',
    name: 'Bir Hospital',
    address: 'Kanti Path, Kathmandu',
    district: 'Kathmandu',
    distance: 1.2,
    phone: '+977 01-4221119',
    email: 'info@birhospital.gov.np',
    isEmergencyOpen24_7: true,
    hours: {
      emergency: '24 Hours',
      desk: '24 Hours',
      donation: '08:00 - 17:00'
    },
    updatedMinutesAgo: 4,
    overviewImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBn77NSNoJrdh2j2cmjUdlWFS4wIt5BYmdfuCh5hZVbu8JYB7NqeDE1QlzHr9vpyjLloiQyxG41nYZSXm6-wNre3h_CNAul5jLbOe-0ugj1TePD-arSAXExoPsfoBxV091ptYKEGgg36bq4150yT6sanSmuhv29h7t-DFKaE9UEe2JIF31ZG4Upxbt3K29NpZRNBOKEtdTEsKdfta4ShzTCo8nsqmaIklEMQpxkhBoIfzxWUAZxkSJADTyYml8OPgUsktns0dhr-Q',
    stocks: {
      'O-': [
        { component: 'Whole Blood', units: 6, status: 'Stable' },
        { component: 'Platelets', units: 3, status: 'Stable' }
      ],
      'A+': [
        { component: 'Whole Blood', units: 14, status: 'Stable' }
      ],
      'AB-': [
        { component: 'Whole Blood', units: 2, status: 'Low' }
      ]
    }
  },
  {
    id: 'kanti',
    name: "Kanti Children's Hospital",
    address: 'Maharajgunj, Kathmandu',
    district: 'Kathmandu',
    distance: 2.6,
    phone: '+977 01-4411550',
    email: 'info@kantichildrenhospital.gov.np',
    isEmergencyOpen24_7: true,
    hours: {
      emergency: '24 Hours',
      desk: '08:00 - 18:00',
      donation: '09:00 - 15:00'
    },
    updatedMinutesAgo: 15,
    overviewImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCGHIK4d8mFg7kRez4EXhvE-x-iztGrGJ44_1aOXwpQRKImNQDhSNqT4rNk3iIza1Hu0zYlRXysjq7iDr0DBuRcm3F90LvS9b6XeWKYloGSqLgIiYyMutVqHsXrZPizh3js7KovaJciAyeygxv9ob_GeYV0CiagFNGBfHklQL7Hk7qSQlxHcnffjFPyZU3PwBCUV2yU9v8qex6jy4o1gbyNzxjgUxRjAQTxhjNPLV_sZtMN3YTqXVEe8WxxZo9YAcnA1j93Z4zegA',
    stocks: {
      'A+': [
        { component: 'Platelets', units: 12, status: 'Stable' }
      ]
    }
  },
  {
    id: 'om',
    name: 'Om Hospital & Research Centre',
    address: 'Chabahil, Kathmandu',
    district: 'Kathmandu',
    distance: 4.2,
    phone: '+977 01-4476260',
    email: 'info@omhospitalnepal.com',
    isEmergencyOpen24_7: true,
    hours: {
      emergency: '24 Hours',
      desk: '08:00 - 20:00',
      donation: '09:00 - 16:00'
    },
    updatedMinutesAgo: 28,
    overviewImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBkrPBHzyP8LwG9upXJHKml8NydoVu5OyfB5d41LVpiLWtQrzzJsBqrVRx6fMtVZKvseTz3tDLpcbEvuYvEVHlimecG0MznG22KKaHC1MkP7isZwWPd1gzjVd0ELxRNN__LUvxAkx4NVS7ZVoQXAeQe-_G6LqLhxJrHfzsUtrU6BF27ISWisJcNiGR5p0egJJRqDWUEUOWwLVoDYx__gMc9cj8CzhyeoS_xKKJZ5qoYEeUE3fRbzTgiGVUWguHSXlEhLDsmVyFg6g',
    stocks: {
      'O-': [
        { component: 'Plasma', units: 3, status: 'Low' }
      ]
    }
  },
  {
    id: 'mediciti',
    name: 'Nepal Mediciti Hospital',
    address: 'Bainsepati, Lalitpur',
    district: 'Lalitpur',
    distance: 8.5,
    phone: '+977 01-4217100',
    email: 'info@nepalmediciti.com',
    isEmergencyOpen24_7: true,
    hours: {
      emergency: '24 Hours',
      desk: '24 Hours',
      donation: '08:00 - 18:00'
    },
    updatedMinutesAgo: 42,
    overviewImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAgvMEPLQrJmr5PzL-4KRcDOyDDbC36rck3AOKc3NDGMKB-Q0VG3pWgOQge4yr6NaxiUirS4enczzTkf9qnvXfDKWWGLImBIf0T1TTQ3BmZ3dw9NSZgWwW2eCco2AchWn3MAL_vBiXQebdh4cWKhJ1aJw9_xEz6W4vS-W1Q_5cH7EQbZPjCy0aUrmoRGlo6aL_l1NFCg2qf9q6Lb3Jqyu0bklgOKRbRSepaR3QXpcq1d6Wq-4tJR-gXmQkIG0uFvY9K2Hb2oF282w',
    stocks: {
      'B+': [
        { component: 'Cryoprecipitate', units: 8, status: 'Stable' }
      ]
    }
  },
  {
    id: 'bhaktapur_cancer',
    name: 'Bhaktapur Cancer Hospital',
    address: 'Katunje, Bhaktapur',
    district: 'Bhaktapur',
    distance: 12.0,
    phone: '+977 01-6611555',
    email: 'info@bch.org.np',
    isEmergencyOpen24_7: true,
    hours: {
      emergency: '24 Hours',
      desk: '08:00 - 18:00',
      donation: '09:00 - 16:00'
    },
    updatedMinutesAgo: 55,
    overviewImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBn77NSNoJrdh2j2cmjUdlWFS4wIt5BYmdfuCh5hZVbu8JYB7NqeDE1QlzHr9vpyjLloiQyxG41nYZSXm6-wNre3h_CNAul5jLbOe-0ugj1TePD-arSAXExoPsfoBxV091ptYKEGgg36bq4150yT6sanSmuhv29h7t-DFKaE9UEe2JIF31ZG4Upxbt3K29NpZRNBOKEtdTEsKdfta4ShzTCo8nsqmaIklEMQpxkhBoIfzxWUAZxkSJADTyYml8OPgUsktns0dhr-Q',
    stocks: {
      'AB+': [] // Unknown
    }
  }
];

export const INITIAL_EMERGENCY_ALERTS: EmergencyAlert[] = [
  {
    id: 'alert-1',
    hospitalName: 'Kathmandu Medical College',
    hospitalId: 'kmc',
    bloodGroup: 'AB-',
    unitsNeeded: 2,
    level: 'CRITICAL',
    distance: 0.8,
    location: 'Sinamangal'
  },
  {
    id: 'alert-2',
    hospitalName: 'Nepal Red Cross Society',
    hospitalId: 'nrcs',
    bloodGroup: 'O+',
    unitsNeeded: 15, // Multiple units
    level: 'LOW STOCK',
    distance: 2.4,
    location: 'Soalteemode'
  }
];

export const INITIAL_RARE_REQUESTS: RareRequest[] = [
  {
    id: 'rare-1',
    hospitalName: 'Tribhuvan University Teaching Hospital',
    hospitalId: 'tuth',
    bloodGroup: 'AB-',
    unitsNeeded: 2,
    timeAgoText: '22 mins ago',
    status: 'URGENT'
  },
  {
    id: 'rare-2',
    hospitalName: 'Patan Hospital',
    hospitalId: 'patan',
    bloodGroup: 'B-',
    unitsNeeded: 1,
    timeAgoText: 'In transit',
    status: 'SECURED'
  },
  {
    id: 'rare-3',
    hospitalName: 'Norvic International Hospital',
    hospitalId: 'norvic',
    bloodGroup: 'O-',
    unitsNeeded: 4,
    timeAgoText: '1 hr ago',
    status: 'PENDING'
  }
];
