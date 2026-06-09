/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { 
  Search, ShieldAlert, Bookmark, User, Plus, 
  HelpCircle, CheckCircle, Bell, X, Info,
  Smartphone, Cpu, Compass, HardDrive, Terminal,
  Sliders, Volume2, VolumeX, ShieldCheck, RefreshCw, Key,
  Lock, Unlock, Zap, Bluetooth, Wifi, Activity, PhoneCall
} from 'lucide-react';
import { Header } from './components/Header';
import { WelcomeScreen } from './components/WelcomeScreen';
import { SearchScreen } from './components/SearchScreen';
import { HospitalDetailScreen } from './components/HospitalDetailScreen';
import { EmergencyScreen } from './components/EmergencyScreen';
import { SavedScreen } from './components/SavedScreen';
import { ProfileScreen } from './components/ProfileScreen';
import { UpdateStockModal } from './components/UpdateStockModal';
import { UrgentRequestModal } from './components/UrgentRequestModal';
import { 
  INITIAL_HOSPITALS, 
  INITIAL_EMERGENCY_ALERTS, 
  INITIAL_RARE_REQUESTS 
} from './data';
import { 
  Hospital, BloodGroup, ComponentType, 
  DonorBooking, RareRequest, EmergencyAlert 
} from './types';

export default function App() {
  // Master states
  const [hospitals, setHospitals] = useState<Hospital[]>(INITIAL_HOSPITALS);
  const [emergencyAlerts, setEmergencyAlerts] = useState<EmergencyAlert[]>(INITIAL_EMERGENCY_ALERTS);
  const [rareRequests, setRareRequests] = useState<RareRequest[]>(INITIAL_RARE_REQUESTS);
  const [donorBookings, setDonorBookings] = useState<DonorBooking[]>([]);
  const [savedHospitalIds, setSavedHospitalIds] = useState<string[]>(['tuth', 'nrcs']);

  // Tabs & Drill downs
  const [activeTab, setActiveTab] = useState<'search' | 'emergency' | 'saved' | 'profile'>('search');
  const [selectedHospitalId, setSelectedHospitalId] = useState<string | null>(null);

  // Search parameters pre-setting
  const [searchFilters, setSearchFilters] = useState<{
    group: BloodGroup | '';
    component: ComponentType | '';
    city: string;
  }>({
    group: '',
    component: '',
    city: ''
  });

  // Action Modals State
  const [isUpdateStockOpen, setIsUpdateStockOpen] = useState(false);
  const [isUrgentRequestOpen, setIsUrgentRequestOpen] = useState(false);

  // SIMULATOR CUSTOMIZATION STATES
  const [deviceColor, setDeviceColor] = useState<'plum' | 'silver' | 'onyx' | 'gold'>('plum');
  const [isLocked, setIsLocked] = useState<boolean>(false);
  const [bioScanning, setBioScanning] = useState<boolean>(false);
  const [faceIdVerified, setFaceIdVerified] = useState<boolean>(true);
  const [soundVolume, setSoundVolume] = useState<number>(4); // 0 to 5
  const [soundMuted, setSoundMuted] = useState<boolean>(false);
  const [showVolumeBadge, setShowVolumeBadge] = useState<boolean>(false);
  const [nepalTimeText, setNepalTimeText] = useState<string>('04:15 PM');
  const [hapticTriggered, setHapticTriggered] = useState<boolean>(false);
  const [batteryLevel, setBatteryLevel] = useState<number>(98);
  const [isCharging, setIsCharging] = useState<boolean>(true);
  const [systemLogs, setSystemLogs] = useState<string[]>([
    'VITALTRACK-CORE: Initialized simulator client...',
    'NETWORKING: Connected to Kathmandu Central Health Grid API.',
    'SECURITY: Biometrics (Face ID / Pin) status ACTIVE.',
    'GEOLOCATION: GPS lock assigned at Kathmandu Tribhuvan Area [27.70° N, 85.30° E].'
  ]);

  // Notifications or top alert feeds references
  const [notificationsCount, setNotificationsCount] = useState(2);
  const [topNotification, setTopNotification] = useState<string | null>(
    'NEPAL GRID BROADCAST: Lalitpur logistics terminal linked successfully.'
  );

  // Refs
  const logsEndRef = useRef<HTMLDivElement>(null);
  const volumeTimerRef = useRef<NodeJS.Timeout | null>(null);

  const userEmail = 'manishpokharel945@gmail.com';

  // Tick the Nepal Time (Nepal has UTC+5:45)
  useEffect(() => {
    const updateTime = () => {
      const d = new Date();
      // Calculate Nepal time: convert local to UTC, add 5H 45M
      const utc = d.getTime() + d.getTimezoneOffset() * 60000;
      const nepalDate = new Date(utc + 3600000 * 5.75);
      
      let hh = nepalDate.getHours();
      const mm = textDigit(nepalDate.getMinutes());
      const ampm = hh >= 12 ? 'PM' : 'AM';
      hh = hh % 12;
      hh = hh ? hh : 12; // hour '0' should be '12'
      setNepalTimeText(`${textDigit(hh)}:${mm} ${ampm}`);
    };
    
    updateTime();
    const timer = setInterval(updateTime, 10000);
    return () => clearInterval(timer);
  }, []);

  // Battery simulation fluctuation
  useEffect(() => {
    const interval = setInterval(() => {
      setBatteryLevel(prev => {
        if (prev >= 100) return 97;
        return prev + 1;
      });
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  const textDigit = (val: number) => {
    return val < 10 ? '0' + val : val;
  };

  // Helper to add logs
  const logEvent = (message: string) => {
    const d = new Date();
    const ts = `[${textDigit(d.getHours())}:${textDigit(d.getMinutes())}:${textDigit(d.getSeconds())}]`;
    setSystemLogs(prev => [...prev, `${ts} ${message}`].slice(-40)); // Keep last 40 logs
  };

  // Auto-scroll logs
  useEffect(() => {
    logsEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [systemLogs]);

  // Handle hardware side volume triggers
  const adjustVolume = (direction: 'up' | 'down') => {
    triggerHaptic();
    setSoundVolume(prev => {
      const next = direction === 'up' ? Math.min(prev + 1, 5) : Math.max(prev - 1, 0);
      logEvent(`HARDWARE: Volume controller updated to level ${next}/5`);
      return next;
    });
    setSoundMuted(false);
    setShowVolumeBadge(true);
    
    if (volumeTimerRef.current) clearTimeout(volumeTimerRef.current);
    volumeTimerRef.current = setTimeout(() => {
      setShowVolumeBadge(false);
    }, 1500);
  };

  // Trigger brief bezel glow to simulate haptic vibration feedback
  const triggerHaptic = () => {
    setHapticTriggered(true);
    setTimeout(() => setHapticTriggered(false), 240);
  };

  // Custom Simulator Controls: Push Event Alert Test
  const triggerMockEmergencyPush = () => {
    triggerHaptic();
    const eventText = `GRID CRITICAL: Lalitpur NRCS reports sudden O- Whole Blood depletion.`;
    setTopNotification(eventText);
    setNotificationsCount(n => n + 1);
    logEvent('SIMULATOR: Injected external Live Emergency Signal (O- negative depletion request).');
  };

  // Trigger biometric check inside the phone screen
  const triggerBiometricLockScan = () => {
    triggerHaptic();
    setIsLocked(true);
    setFaceIdVerified(false);
    setBioScanning(false);
    logEvent('SIMULATOR: Requested biometric terminal verification lock.');
  };

  const handleSimulateFaceID = () => {
    setBioScanning(true);
    logEvent('BIOMETRICS: Launching virtual Face ID hardware camera raycast...');
    setTimeout(() => {
      setBioScanning(false);
      setFaceIdVerified(true);
      setIsLocked(false);
      triggerHaptic();
      logEvent('BIOMETRICS: Verification matched [manishpokharel945@gmail.com]. Phone unlocked.');
    }, 1800);
  };

  // Toggle bookmark function
  const handleToggleSaveHospital = (hospitalId: string) => {
    triggerHaptic();
    const target = hospitals.find(h => h.id === hospitalId);
    setSavedHospitalIds(prev => {
      const exists = prev.includes(hospitalId);
      logEvent(`DATABASE: ${exists ? 'Removed' : 'Added'} facility saved bookmark: ${target?.name || hospitalId}`);
      return exists
        ? prev.filter(id => id !== hospitalId)
        : [...prev, hospitalId];
    });
  };

  // Quick route to detail page
  const handleSelectHospital = (id: string) => {
    triggerHaptic();
    const target = hospitals.find(h => h.id === id);
    setSelectedHospitalId(id);
    logEvent(`NAVIGATION: Drilled down into clinical profile of: ${target?.name || id}`);
  };

  // Quick preset shortcuts action
  const handleQuickSearchAction = (
    group: BloodGroup | '', 
    component: ComponentType | '', 
    city: string
  ) => {
    triggerHaptic();
    setSearchFilters({ group, component, city });
    setActiveTab('search');
    setSelectedHospitalId(null); // Clear selected hospital details if any
    logEvent(`QUERY: Executed homepage preset quick-filter [${group || 'Any Group'} • ${component || 'Any'} in ${city || 'Kathmandu'}]`);
  };

  // Save urgent request simulations
  const handleUrgentRequestSubmit = (request: {
    patientName: string;
    bloodGroup: BloodGroup;
    componentType: ComponentType;
    unitsNeeded: number;
    hospitalName: string;
    contactPerson: string;
    contactPhone: string;
    reason: string;
  }) => {
    triggerHaptic();
    const newRequest: RareRequest = {
      id: `rare-${Date.now()}`,
      bloodGroup: request.bloodGroup,
      hospitalName: request.hospitalName,
      hospitalId: 'custom',
      unitsNeeded: request.unitsNeeded,
      timeAgoText: 'Just now',
      status: 'URGENT'
    };

    setRareRequests(prev => [newRequest, ...prev]);
    setNotificationsCount(n => n + 1);
    setTopNotification(`Lodge Request SUCCESS: Verified need of ${request.unitsNeeded} units ${request.bloodGroup} at ${request.hospitalName}.`);
    logEvent(`BROADCAST: Submitted priority clinical request for ${request.unitsNeeded} units of ${request.bloodGroup} ${request.componentType} at ${request.hospitalName}.`);
  };

  // Interactive booking slots
  const handleBookSlotAction = (booking: Omit<DonorBooking, 'id' | 'hospitalName'>) => {
    triggerHaptic();
    const targetHosp = hospitals.find(h => h.id === booking.hospitalId);
    
    const newBooking: DonorBooking = {
      id: `booking-${Date.now()}`,
      hospitalId: booking.hospitalId,
      hospitalName: targetHosp ? targetHosp.name : 'Kathmandu General Lab',
      donorName: booking.donorName,
      donorPhone: booking.donorPhone,
      bloodGroup: booking.bloodGroup,
      date: booking.date,
      timeSlot: booking.timeSlot
    };

    setDonorBookings(prev => [newBooking, ...prev]);
    logEvent(`SCHEDULER: Successfully booked ${booking.bloodGroup} donation appointment for ${booking.donorName} at ${targetHosp?.name || 'Kathmandu Center'}.`);
  };

  // Cancel booking
  const handleCancelBookingAction = (bookingId: string) => {
    triggerHaptic();
    setDonorBookings(prev => {
      const target = prev.find(b => b.id === bookingId);
      logEvent(`SCHEDULER: Canceled donor reservation slot at ${target?.hospitalName || 'Clinic'}`);
      return prev.filter(b => b.id !== bookingId);
    });
  };

  // Simulated laboratory terminal inventory updates function
  const handleUpdateStockAction = (
    hospitalId: string, 
    bloodGroup: BloodGroup, 
    componentType: ComponentType, 
    newUnits: number
  ) => {
    triggerHaptic();
    setHospitals(prevHospitals => {
      return prevHospitals.map(hospital => {
        if (hospital.id !== hospitalId) return hospital;

        const currentStocks = hospital.stocks[bloodGroup] || [];
        const stockExists = currentStocks.some(item => item.component === componentType);

        let updatedGroupStocksObj;
        if (stockExists) {
          updatedGroupStocksObj = currentStocks.map(item => {
            if (item.component !== componentType) return item;
            let status: 'Stable' | 'Low' | 'Critical' | 'Unknown' = 'Stable';
            if (newUnits === 0) status = 'Critical';
            else if (newUnits < 5) status = 'Low';
            return { ...item, units: newUnits, status };
          });
        } else {
          let status: 'Stable' | 'Low' | 'Critical' | 'Unknown' = 'Stable';
          if (newUnits === 0) status = 'Critical';
          else if (newUnits < 5) status = 'Low';

          updatedGroupStocksObj = [
            ...currentStocks,
            { component: componentType, units: newUnits, status }
          ];
        }

        logEvent(`INVENTORY: Committed local stock level override at ${hospital.name}: ${bloodGroup} ${componentType} -> ${newUnits} Units.`);
        return {
          ...hospital,
          updatedMinutesAgo: 1,
          stocks: {
            ...hospital.stocks,
            [bloodGroup]: updatedGroupStocksObj
          }
        };
      });
    });

    setNotificationsCount(n => n + 1);
    const hostName = hospitals.find(h => h.id === hospitalId)?.name || 'Local Lab';
    setTopNotification(`STOCK RE-ALIGNED: ${hostName} inventory synchronized.`);
  };

  // Detail item reference for drills
  const currentHospital = hospitals.find(h => h.id === selectedHospitalId);

  // Active Device Casing Ring Colors Definitions
  const colorBorders = {
    plum: 'border-rose-950 ring-[#8B1E3F] bg-[#1F070E]',
    silver: 'border-slate-400 ring-slate-100 bg-slate-900',
    onyx: 'border-gray-950 ring-stone-900 bg-[#0E0F12]',
    gold: 'border-amber-900 ring-amber-200 bg-[#1A120B]'
  };

  // Simulated click sound wave rendering
  const clickFeedback = () => {
    triggerHaptic();
  };

  // Main smartphone view rendering (extracted for reuse across simulator container layout)
  const renderPhoneInnerView = () => (
    <div className="w-full h-full flex flex-col bg-slate-50 text-[#191c1d] font-sans overflow-hidden relative">
      
      {/* 1. STATUS BAR WITH CHANNELS */}
      <div className="w-full h-11 bg-white text-slate-900 px-6 pt-5 flex justify-between items-center text-xs font-bold font-sans shrink-0 border-b border-gray-100 relative z-40 select-none">
        <div>{nepalTimeText.split(' ')[0]}</div>
        
        {/* Dynamic Notch / Island Pill */}
        <div 
          onClick={clickFeedback}
          className={`absolute left-1/2 -translate-x-1/2 top-1.5 h-6 rounded-full bg-black text-white flex items-center justify-center transition-all duration-300 shadow-sm cursor-pointer hover:bg-zinc-900 ${
            topNotification ? 'w-[84%] px-3 text-[9px] font-medium' : 'w-24 px-1 text-[10px]'
          }`}
        >
          {topNotification ? (
            <div className="flex items-center justify-between w-full truncate animate-pulse gap-2">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-ping shrink-0" />
              <span className="truncate text-red-300 font-extrabold max-w-[210px]">{topNotification}</span>
              <button 
                onClick={(e) => { e.stopPropagation(); setTopNotification(null); }} 
                className="text-white hover:text-red-400 p-0.5"
                title="Dismiss notch notification"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[9px] uppercase tracking-wider text-slate-300">VITAL LABS</span>
            </div>
          )}
        </div>

        {/* Status icons right */}
        <div className="flex items-center gap-1.5 text-[10px]">
          <span className="text-red-600 mr-0.5 font-sans font-extrabold text-[8px] bg-red-50 px-1 py-0.2 rounded border border-red-100 flex items-center">NP 🇳🇵</span>
          <Wifi className="w-3.5 h-3.5 text-slate-700" />
          <span className="text-[9px] font-mono">5G</span>
          <div className="flex items-center gap-0.5 ml-0.5">
            <span className="text-[9px] font-mono">{batteryLevel}%</span>
            <div className="w-5 h-2.5 rounded-sm border border-slate-700 p-0.5 flex items-center justify-start relative">
              <div className="bg-slate-800 h-full rounded-2xs" style={{ width: `${batteryLevel}%` }} />
              <Zap className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-2 h-2 text-yellow-500" />
            </div>
          </div>
        </div>
      </div>

      {/* 2. LIVE LOCK SCREEN STANDBY LAYER */}
      {isLocked && (
        <div className="absolute inset-0 z-50 bg-black text-slate-100 flex flex-col justify-between p-6 animate-fade-in font-sans">
          <div className="space-y-1 text-center pt-10">
            <div className="flex items-center justify-center gap-1.5 text-xs text-red-500 font-extrabold tracking-widest uppercase">
              <ShieldAlert className="w-4 h-4" />
              केन्द्रीय रसद ग्रिड
            </div>
            <h1 className="text-5xl font-black font-sans text-white tracking-tighter pt-2">
              {nepalTimeText.split(' ')[0]}
            </h1>
            <p className="text-sm font-semibold text-slate-400">
              {nepalTimeText.split(' ')[1]} • Kathmandu Valley
            </p>
          </div>

          {/* Locked status banner */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4 space-y-3 shadow-inner text-center">
            <div className="text-xs text-slate-400 font-semibold leading-relaxed">
              BIOMETRIC LOCKED DETECTED
            </div>
            <p className="text-[11px] text-slate-500 leading-normal max-w-xs mx-auto">
              Identify liaison security token to access medical clinic coordinates and whole blood stock registries database indices.
            </p>
            
            {bioScanning ? (
              <div className="py-2 flex flex-col items-center justify-center gap-2">
                <div className="w-12 h-12 rounded-full border-4 border-t-red-650 border-[#D32F2F]/20 animate-spin flex items-center justify-center">
                  <Activity className="w-5 h-5 text-red-500" />
                </div>
                <span className="text-xs font-bold text-red-500 animate-pulse font-mono">SCANNING FACE...</span>
              </div>
            ) : (
              <button 
                onClick={handleSimulateFaceID}
                className="w-full py-2.5 bg-[#D32F2F] hover:bg-red-750 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition active:scale-95 cursor-pointer"
              >
                <Key className="w-4 h-4" />
                Unlock with Face ID
              </button>
            )}
          </div>

          <div className="text-center pb-6 text-[10px] text-zinc-650 font-bold tracking-wider">
            VITALTRACK SYSTEM LITE v2.80
          </div>
        </div>
      )}

      {/* 3. SIMULATOR VOLUME OVERLAY */}
      {showVolumeBadge && (
        <div className="absolute left-3 top-16 z-45 bg-black/85 text-white py-2 px-3 rounded-xl flex items-center gap-2 text-xs font-bold animate-slide-up border border-white/10 shadow-lg">
          {soundVolume === 0 ? <VolumeX className="w-4 h-4 text-gray-400" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
          <div className="flex gap-0.5">
            {[1, 2, 3, 4, 5].map(v => (
              <span 
                key={v} 
                className={`w-1.5 h-3 rounded-full transition ${
                  v <= soundVolume ? 'bg-[#D32F2F]' : 'bg-zinc-700'
                }`} 
              />
            ))}
          </div>
          <span className="text-[10px] text-slate-350">{soundVolume === 0 ? 'Muted' : `${soundVolume * 20}%`}</span>
        </div>
      )}

      {/* 4. MAIN NATIVE APP VIEWPORTS RENDER */}
      <div className="flex-1 flex flex-col overflow-y-auto overflow-x-hidden relative">
        
        {/* Integrated Lite Header inside of the phone */}
        <Header 
          notificationsCount={notificationsCount} 
          onNotificationsClick={() => {
            triggerHaptic();
            setNotificationsCount(0);
            setTopNotification('Central system signals cleared. Network healthy.');
            logEvent('NOTIFICATION: Read alerts inbox.');
          }} 
        />

        {/* Live system dynamic alert ribbon */}
        {topNotification && (
          <div className="bg-red-50 border-b border-red-100 p-2.5 flex items-start justify-between text-[11px] text-[#D32F2F] font-bold shadow-xs select-none">
            <div className="flex items-start gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D32F2F] animate-ping shrink-0 mt-1.5" />
              <p className="max-w-[280px] leading-tight font-medium">{topNotification}</p>
            </div>
            <button 
              onClick={() => { triggerHaptic(); setTopNotification(null); }}
              className="p-0.5 hover:bg-red-100 rounded text-[#D32F2F] cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        <main className="flex-1 p-4 overflow-y-auto">
          {selectedHospitalId && currentHospital ? (
            <HospitalDetailScreen 
              hospital={currentHospital} 
              onBack={() => {
                triggerHaptic();
                setSelectedHospitalId(null);
                logEvent('NAVIGATION: Returned to clinic directories.');
              }}
              onBookSlot={(booking) => {
                handleBookSlotAction(booking);
              }}
            />
          ) : (
            <div className="h-full">
              {/* If active tab is welcome / dashboard or similar */}
              {activeTab === 'search' && (
                <div className="h-full">
                  {!searchFilters.group && !searchFilters.component && !searchFilters.city && !selectedHospitalId ? (
                    <WelcomeScreen 
                      emergencyAlerts={emergencyAlerts}
                      hospitals={hospitals}
                      onQuickSearch={handleQuickSearchAction}
                      onSelectHospital={handleSelectHospital}
                      onContactHospital={(hosp) => {
                        triggerHaptic();
                        logEvent(`COMMUNICATION: Contacting hospital: ${hosp.name} coordination desk at ${hosp.phone}`);
                        alert(`Direct Hospital Coordination Desk: ${hosp.phone}. Please state reference identifier to Central Logistics.`);
                      }}
                      onNavigateToEmergency={() => {
                        triggerHaptic();
                        setActiveTab('emergency');
                        logEvent('NAVIGATION: Navigated to Emergency Registry.');
                      }}
                    />
                  ) : (
                    <SearchScreen 
                      hospitals={hospitals}
                      onSelectHospital={handleSelectHospital}
                      onRequestNewLocation={() => {
                        triggerHaptic();
                        setTopNotification('Request submitted. Verification team inspecting coordinates.');
                        logEvent('DATABASE: Submitted new region coordinate indexing proposal.');
                      }}
                      initialBloodGroup={searchFilters.group}
                      initialComponent={searchFilters.component}
                      initialLocationCity={searchFilters.city}
                    />
                  )}
                </div>
              )}

              {activeTab === 'emergency' && (
                <EmergencyScreen 
                  rareRequests={rareRequests}
                  hospitals={hospitals}
                  onTriggerUpdateStock={() => {
                    triggerHaptic();
                    setIsUpdateStockOpen(true);
                    logEvent('DATABASE: Initiated stock adjustment terminal modal.');
                  }}
                  onSelectHospital={handleSelectHospital}
                />
              )}

              {activeTab === 'saved' && (
                <SavedScreen 
                  savedHospitalIds={savedHospitalIds}
                  hospitals={hospitals}
                  onToggleSave={handleToggleSaveHospital}
                  onSelectHospital={handleSelectHospital}
                />
              )}

              {activeTab === 'profile' && (
                <ProfileScreen 
                  userEmail={userEmail}
                  donorBookings={donorBookings}
                  onCancelBooking={handleCancelBookingAction}
                />
              )}
            </div>
          )}
        </main>
      </div>

      {/* 5. FLOATING COMPLIANT FAB FOR ACTION */}
      {!selectedHospitalId && (
        <button 
          onClick={() => {
            triggerHaptic();
            setIsUrgentRequestOpen(true);
            logEvent('BROADCAST: Opened new urgent requisition lodgement interface.');
          }}
          className="absolute bottom-18 right-4 w-12 h-12 bg-[#D32F2F] hover:bg-[#b71c1c] text-white rounded-full shadow-lg flex items-center justify-center hover:scale-105 active:scale-95 transition duration-150 z-40 cursor-pointer"
          title="File New Urgent Request"
        >
          <Plus className="w-5 h-5 stroke-[3]" />
        </button>
      )}

      {/* 6. BOTTOM NATIVE TAB NAV BAR */}
      <nav className="h-14 bg-white border-t border-gray-250 flex justify-around items-center px-2 py-1 shadow-lg shrink-0 select-none z-40">
        <button 
          onClick={() => {
            triggerHaptic();
            setActiveTab('search');
            setSelectedHospitalId(null);
            setSearchFilters({ group: '', component: '', city: '' });
            logEvent('NAVIGATION: Route changed to Tab [Search Home]');
          }}
          className={`flex flex-col items-center justify-center px-3 py-1 rounded-lg transition duration-150 cursor-pointer ${
            activeTab === 'search' 
              ? 'text-[#D32F2F] font-bold scale-102' 
              : 'text-gray-400 font-medium hover:text-gray-600'
          }`}
        >
          <Search className="w-4.5 h-4.5 stroke-[2]" />
          <span className="text-[9px] uppercase tracking-wider font-semibold mt-0.5">Search</span>
        </button>

        <button 
          onClick={() => {
            triggerHaptic();
            setActiveTab('emergency');
            setSelectedHospitalId(null);
            logEvent('NAVIGATION: Route changed to Tab [Emergency Grid]');
          }}
          className={`flex flex-col items-center justify-center px-3 py-1 rounded-lg transition duration-150 cursor-pointer ${
            activeTab === 'emergency' 
              ? 'text-[#D32F2F] font-bold scale-102' 
              : 'text-gray-400 font-medium hover:text-gray-600'
          }`}
        >
          <ShieldAlert className="w-4.5 h-4.5 stroke-[2]" />
          <span className="text-[9px] uppercase tracking-wider font-semibold mt-0.5">Emergency</span>
        </button>

        <button 
          onClick={() => {
            triggerHaptic();
            setActiveTab('saved');
            setSelectedHospitalId(null);
            logEvent('NAVIGATION: Route changed to Tab [Saved Facilities]');
          }}
          className={`flex flex-col items-center justify-center px-3 py-1 rounded-lg transition duration-150 cursor-pointer ${
            activeTab === 'saved' 
              ? 'text-[#D32F2F] font-bold scale-102' 
              : 'text-gray-400 font-medium hover:text-gray-600'
          }`}
        >
          <Bookmark className="w-4.5 h-4.5 stroke-[2]" />
          <span className="text-[9px] uppercase tracking-wider font-semibold mt-0.5">Saved</span>
        </button>

        <button 
          onClick={() => {
            triggerHaptic();
            setActiveTab('profile');
            setSelectedHospitalId(null);
            logEvent('NAVIGATION: Route changed to Tab [User Profile]');
          }}
          className={`flex flex-col items-center justify-center px-3 py-1 rounded-lg transition duration-150 cursor-pointer ${
            activeTab === 'profile' 
              ? 'text-[#D32F2F] font-bold scale-102' 
              : 'text-gray-400 font-medium hover:text-gray-600'
          }`}
        >
          <User className="w-4.5 h-4.5 stroke-[2]" />
          <span className="text-[9px] uppercase tracking-wider font-semibold mt-0.5">Profile</span>
        </button>
      </nav>

      {/* 7. ANDROID/iOS SWIPE SYSTEM pill HOME INDICATOR */}
      <div className="w-full h-5 bg-white flex justify-center items-center shrink-0 select-none z-40 border-t border-gray-100">
        <div 
          onClick={() => {
            triggerHaptic();
            setActiveTab('search');
            setSelectedHospitalId(null);
            setSearchFilters({ group: '', component: '', city: '' });
          }}
          className="w-28 h-1 bg-slate-350 rounded-full hover:bg-slate-450 transition cursor-pointer"
          title="Swipe Home Indicator"
        />
      </div>

      {/* EMBEDDED MODALS - CONTAINED PERFECTLY INSIDE THE PHONE VIEWPORT CO ORDINATOR STATE */}
      {isUrgentRequestOpen && (
        <UrgentRequestModal 
          onClose={() => setIsUrgentRequestOpen(false)}
          onSubmitUrgentRequest={handleUrgentRequestSubmit}
        />
      )}

      {isUpdateStockOpen && (
        <UpdateStockModal 
          hospitals={hospitals}
          onClose={() => setIsUpdateStockOpen(false)}
          onUpdateStock={handleUpdateStockAction}
        />
      )}

    </div>
  );

  return (
    <div className="min-h-screen bg-[#0E1321] text-slate-100 font-sans flex flex-col antialiased">
      
      {/* 🚀 RESPONSIVE SWITCH: ON LARGE LAYOUT (lg:flex), RENDER HIGH FIDELITY SIMULATOR COCKPIT DESK */}
      {/* ON SMALL SCREENS (under lg), COLLAPSE AND RENDER THE OPTIMIZED EDGE-TO-EDGE PHONE APP DIRECTLY */}
      
      {/* DESIGNER WORKBENCH DESK (Visible only on desktop md/lg+) */}
      <div className="hidden lg:flex flex-1 w-full max-w-[1440px] mx-auto px-6 py-6 gap-8 items-center justify-center">
        
        {/* LEFT COMPANION: STUDIO HOST CONTROL DASHBOARD DESK */}
        <div className="w-[450px] space-y-5 flex flex-col shrink-0">
          
          <div className="space-y-1.5 bg-slate-900/60 border border-slate-800 p-5 rounded-2xl">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#D32F2F]/10 border border-[#D32F2F]/20 rounded-full text-xs font-semibold text-[#D32F2F]">
              <Smartphone className="w-3.5 h-3.5" />
              Nepal mobile application simulator
            </span>
            <h2 className="text-2xl font-black tracking-tight leading-none text-white">
              VITALTRACK STUDIO
            </h2>
            <p className="text-xs text-slate-400 font-medium">
              A high-fidelity mobile workspace coordinating certified blood-component inventory across Lalitpur and the Kathmandu Valley.
            </p>
          </div>

          {/* SIMULATOR PHYSICAL KNOB ADJUSTORS */}
          <div className="bg-slate-900/60 border border-slate-800 p-5 rounded-2xl space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5 border-b border-slate-800 pb-2">
              <Sliders className="w-4 h-4 text-[#D32F2F]" />
              Model Physical Customizer
            </h3>

            {/* A. Casing Color choosing buttons */}
            <div className="space-y-2">
              <span className="block text-[11px] font-bold text-slate-400">Device Hardware Armor Finish:</span>
              <div className="flex gap-3">
                <button 
                  onClick={() => { setDeviceColor('plum'); triggerHaptic(); }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 border ${
                    deviceColor === 'plum' 
                      ? 'bg-red-800/10 border-[#D32F2F] text-red-400' 
                      : 'bg-zinc-850/40 border-transparent text-slate-400 hover:bg-zinc-800'
                  }`}
                >
                  <span className="w-2.5 h-2.5 rounded-full bg-[#B71C1C]" />
                  Rhododendron Plum
                </button>
                <button 
                  onClick={() => { setDeviceColor('silver'); triggerHaptic(); }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 border ${
                    deviceColor === 'silver' 
                      ? 'bg-slate-405/10 border-slate-400 text-slate-250' 
                      : 'bg-zinc-855/40 border-transparent text-slate-400 hover:bg-zinc-800'
                  }`}
                >
                  <span className="w-2.5 h-2.5 rounded-full bg-slate-350" />
                  Sleek Silver
                </button>
                <button 
                  onClick={() => { setDeviceColor('onyx'); triggerHaptic(); }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 border ${
                    deviceColor === 'onyx' 
                      ? 'bg-stone-500/10 border-stone-450 text-white' 
                      : 'bg-zinc-855/40 border-transparent text-slate-400 hover:bg-zinc-800'
                  }`}
                >
                  <span className="w-2.5 h-2.5 rounded-full bg-gray-900" />
                  Jet Onyx
                </button>
              </div>
            </div>

            {/* B. Action Trigger Keys */}
            <div className="space-y-2 pt-2 border-t border-slate-800">
              <span className="block text-[11px] font-bold text-slate-400">Injection Telemetry Signals:</span>
              <div className="grid grid-cols-2 gap-2">
                <button 
                  onClick={triggerMockEmergencyPush}
                  className="py-2 px-3 bg-red-950/20 hover:bg-red-950/40 border border-red-900/30 text-[#D32F2F] rounded-lg text-[11px] font-bold transition flex items-center justify-center gap-1 cursor-pointer"
                >
                  <ShieldAlert className="w-3.5 h-3.5 animate-pulse" />
                  Trigger O- Crisis Push
                </button>
                <button 
                  onClick={triggerBiometricLockScan}
                  className="py-2 px-3 bg-zinc-800/40 hover:bg-zinc-850/60 border border-zinc-700/30 text-slate-300 rounded-lg text-[11px] font-bold transition flex items-center justify-center gap-1 cursor-pointer"
                >
                  <Lock className="w-3.5 h-3.5" />
                  Simulate Biometric Lock
                </button>
              </div>
            </div>
          </div>

          {/* TELEMETRY DIAGNOSTICS STATS */}
          <div className="bg-slate-900/60 border border-slate-800 p-5 rounded-2xl space-y-3.5">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5 border-b border-slate-800 pb-2">
              <Cpu className="w-4 h-4 text-emerald-400 font-bold" />
              Developer Sandboxed Diagnostics
            </h3>

            <div className="grid grid-cols-2 gap-3 text-[11px] font-semibold text-slate-400">
              <div className="bg-slate-950/50 p-2.5 rounded-xl border border-slate-900 flex flex-col">
                <span className="text-slate-500 text-[10px] uppercase font-bold">API Network Latency</span>
                <span className="text-emerald-400 font-mono font-extrabold text-sm mt-0.5">12 ms (Verified)</span>
              </div>
              <div className="bg-slate-950/50 p-2.5 rounded-xl border border-slate-900 flex flex-col">
                <span className="text-slate-500 text-[10px] uppercase font-bold">GPS Terminal Lock</span>
                <span className="text-sky-400 font-mono font-extrabold mt-0.5">Kathmandu TIA Center</span>
              </div>
              <div className="bg-slate-950/50 p-2.5 rounded-xl border border-slate-900 flex flex-col">
                <span className="text-slate-500 text-[10px] uppercase font-bold">Local Cache Nodes</span>
                <span className="text-amber-400 font-mono font-extrabold mt-0.5">98.4 KB Allocated</span>
              </div>
              <div className="bg-slate-950/50 p-2.5 rounded-xl border border-slate-900 flex flex-col">
                <span className="text-slate-500 text-[10px] uppercase font-bold">Client Frame rate</span>
                <span className="text-purple-400 font-mono font-extrabold mt-0.5">60 FPS (Vsync On)</span>
              </div>
            </div>
          </div>

          {/* REAL TIME CONSOLE STREAM */}
          <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-4 flex flex-col h-40">
            <h4 className="text-[10px] font-bold uppercase tracking-wider text-[#D32F2F] flex items-center gap-1.5 border-b border-slate-900 pb-1.5 shrink-0">
              <Terminal className="w-3.5 h-3.5" />
              Liaison Operations Stream Log
            </h4>
            
            <div className="flex-1 overflow-y-auto font-mono text-[9px] text-[#388E3C] py-2 space-y-1 scroll-smooth">
              {systemLogs.map((log, idx) => (
                <div key={idx} className="leading-tight break-all truncate">
                  {log}
                </div>
              ))}
              <div ref={logsEndRef} />
            </div>
          </div>

          {/* CREDITS FOOTER */}
          <p className="text-[10px] text-slate-500 leading-normal text-center">
            *VitalTrack Nepal clinical server endpoints proxy active.<br />
            Complies with standards: NRCS Red Cross Guidelines & B2C clinical supply matching.
          </p>

        </div>

        {/* 📱 CENTER COMPANION: IMMERSIVE 3D-EFFECT PHYSICAL PHONE DEVICE FRAME */}
        <div className="flex-1 flex justify-center items-center py-4 relative group">
          
          {/* Subtle Ambient Red Glow backing the phone */}
          <div className="absolute w-[360px] h-[720px] bg-[#D32F2F]/10 blur-[90px] rounded-full pointer-events-none transition group-hover:bg-[#D32F2F]/15 duration-1000" />

          {/* Virtual Device Side Buttons wrapper (Volume, Power, Action) */}
          <div className="flex items-center justify-center relative">
            
            {/* VOL UP & VOL DOWN (Left edge of device Casing) */}
            <div className="absolute -left-14 top-40 flex flex-col gap-5 z-45">
              <div className="text-[9px] text-slate-500 font-bold uppercase tracking-wider absolute -top-8 left-1 select-none">Volt</div>
              {/* Vol Up */}
              <button 
                onClick={() => adjustVolume('up')}
                className="w-1.5 h-12 bg-zinc-800 hover:bg-zinc-700 active:bg-[#D32F2F] transition rounded-l-md border-r border-zinc-950 shadow-md transform hover:-translate-x-0.5 active:scale-95 cursor-pointer"
                title="Vol Up Key"
              />
              {/* Vol Down */}
              <button 
                onClick={() => adjustVolume('down')}
                className="w-1.5 h-12 bg-zinc-800 hover:bg-zinc-700 active:bg-[#D32F2F] transition rounded-l-md border-r border-zinc-950 shadow-md transform hover:-translate-x-0.5 active:scale-95 cursor-pointer"
                title="Vol Down Key"
              />
            </div>

            {/* ACTION TOGGLE RING (Top left) */}
            <button 
              onClick={() => {
                triggerHaptic();
                setSoundMuted(!soundMuted);
                logEvent(`HARDWARE: Physical silent toggle switched ${!soundMuted ? 'ON' : 'OFF'}`);
              }}
              className="absolute -left-14 top-24 w-1.5 h-7 bg-zinc-800 hover:bg-zinc-700 active:bg-amber-500 transition rounded-l-md border-r border-zinc-950 shadow-md transform hover:-translate-x-0.5 active:scale-95 cursor-pointer"
              title="Toggle Alert Sounds"
            />

            {/* SLEEP POWER BUTTON (Right edge of device Casing) */}
            <div className="absolute -right-14 top-36 z-45">
              <div className="text-[9px] text-slate-500 font-bold uppercase tracking-wider absolute -top-8 right-1 select-none">Pwr</div>
              <button 
                onClick={() => {
                  triggerHaptic();
                  setIsLocked(!isLocked);
                  logEvent(`HARDWARE: Power button clicked. Screen turned ${!isLocked ? 'OFF (Standby Mode)' : 'ON'}`);
                }}
                className="w-1.5 h-20 bg-zinc-800 hover:bg-zinc-700 active:bg-[#D32F2F] transition rounded-r-md border-l border-zinc-950 shadow-md transform hover:translate-x-0.5 active:scale-95 cursor-pointer"
                title="Power Sleep Key"
              />
            </div>

            {/* PHYSICAL SMARTPHONE OUTER SHELL */}
            <div 
              className={`w-[390px] h-[800px] rounded-[50px] border-[12px] relative transition-all duration-350 shadow-[0_25px_65px_-12px_rgba(0,0,0,0.85)] flex flex-col justify-between overflow-hidden ring-[6px] ${
                colorBorders[deviceColor]
              } ${hapticTriggered ? 'animate-bounce scale-[0.992] duration-75 ring-red-400' : 'scale-100'}`}
            >
              
              {/* Glossy Diagonal Reflections over the entire glass screen */}
              <div className="absolute inset-x-0 top-0 h-[220px] bg-gradient-to-tr from-white/[0.05] via-white/[0.02] to-transparent skew-y-12 rotate-12 z-[41] pointer-events-none" />

              {/* RENDER SMARTPHONE VIEW WRAPPER */}
              {renderPhoneInnerView()}

            </div>

          </div>

        </div>

      </div>

      {/* 📱 MOBILE VIEW: COLLAPSEC FROM SIMULATOR DESK EXCEL ON SMALL SCREEN FOR Standalone Screen experience */}
      <div className="flex lg:hidden flex-1 w-full max-w-md mx-auto flex-col h-screen overflow-hidden relative bg-slate-50 shadow-xl">
        {renderPhoneInnerView()}
      </div>

    </div>
  );
}
