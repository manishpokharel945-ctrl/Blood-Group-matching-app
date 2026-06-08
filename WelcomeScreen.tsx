import React, { useState } from 'react';
import { Search, MapPin, Activity, HelpCircle, ShieldAlert, Award, RefreshCw, Truck, Heart } from 'lucide-react';
import { Hospital, EmergencyAlert, BloodGroup, ComponentType } from '../types';

interface WelcomeScreenProps {
  emergencyAlerts: EmergencyAlert[];
  hospitals: Hospital[];
  onQuickSearch: (group: BloodGroup | '', component: ComponentType | '', city: string) => void;
  onSelectHospital: (hospitalId: string) => void;
  onContactHospital: (hospital: Hospital) => void;
  onNavigateToEmergency: () => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({
  emergencyAlerts,
  hospitals,
  onQuickSearch,
  onSelectHospital,
  onContactHospital,
  onNavigateToEmergency,
}) => {
  const [bloodGroup, setBloodGroup] = useState<BloodGroup | ''>('');
  const [component, setComponent] = useState<ComponentType | ''>('');
  const [location, setLocation] = useState('');

  const bloodGroups: BloodGroup[] = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
  const components: ComponentType[] = ['Whole Blood', 'Platelets', 'Plasma', 'Packed Red Cells', 'Cryoprecipitate'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onQuickSearch(bloodGroup, component, location);
  };

  const executeShortcut = (group: BloodGroup, componentType: ComponentType, filterCity: string) => {
    setBloodGroup(group);
    setComponent(componentType);
    setLocation(filterCity);
    onQuickSearch(group, componentType, filterCity);
  };

  return (
    <div className="space-y-10 animate-fade-in pb-16">
      
      {/* Hero Header Unit */}
      <section className="relative overflow-hidden rounded-3xl bg-gray-900 text-white p-6 md:p-10 shadow-sm border border-gray-800">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-red-950/20 via-gray-950 to-gray-950 z-0" />
        
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-10">
          <div className="max-w-2xl space-y-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-red-500/10 border border-red-500/20 rounded-full text-xs font-semibold text-red-400">
              <Activity className="w-3.5 h-3.5 animate-pulse" />
              Institutions Grid — Kathmandu Valley
            </span>
            <h1 className="font-sans text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
              Nepal's Unified <br className="hidden md:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D32F2F] to-amber-500">
                Blood Infrastructure
              </span>
            </h1>
            <p className="font-sans text-sm md:text-base text-gray-300 max-w-lg leading-relaxed">
              Real-time, zero-friction medical infrastructure tracking exposing centralized blood-component inventory. No peer-to-peer donor noise.
            </p>
          </div>

          <div className="w-full lg:w-80 h-44 rounded-2xl overflow-hidden shadow-md border border-gray-800 bg-gray-950">
            <img 
              alt="Medical Infrastructure" 
              className="w-full h-full object-cover opacity-85 hover:scale-105 transition-transform duration-700 font-sans"
              referrerPolicy="no-referrer"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuA9Uw0SkT2BpWlamm3mXjq7w2hOYDzrfU-KknQxl47zgZV1BZNDh1cWrxXxLupcS6g3e0ljz390m40F0QBqEnS02EHb137KAlBVKG4nL3HJizu3Lgaf8PnN36rmRWwkYu4kpFtJTsjH6bnsQJrMdDHnHTUMiLyWN4DJInbmXN43lcUxXjj7ib11S3sfft8GipuDWjKaLhHpzQLmJaIKW13aXZTaPR-c6xEMaBBYx1OmRp6ffmuwfopizfuduDCA9ZKNYKdRzBm0Ag" 
            />
          </div>
        </div>
      </section>

      {/* Main Grid Layout (Search Card Left, Proximity Alerts Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Interactive Search Card */}
        <div id="search-card" className="lg:col-span-8 bg-white rounded-2xl border border-gray-200 shadow-sm p-6 flex flex-col justify-between space-y-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Search className="w-5 h-5 text-[#D32F2F]" />
              <h2 className="font-sans text-xl font-bold text-gray-900">Inventory Quick Search</h2>
            </div>
            <p className="text-xs text-gray-500 mb-4 font-semibold">
              Search available inventory across verified clinics with absolute real-time visibility.
            </p>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Blood Group */}
              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold text-gray-500 px-1">Blood Group</label>
                <select
                  value={bloodGroup}
                  onChange={(e) => setBloodGroup(e.target.value as BloodGroup | '')}
                  className="w-full h-11 px-3 rounded-lg bg-gray-50 border border-gray-300 text-gray-900 focus:border-[#D32F2F] focus:ring-1 focus:ring-[#D32F2F] transition-all text-sm outline-none font-semibold cursor-pointer"
                >
                  <option value="">Select Group</option>
                  {bloodGroups.map(bg => (
                    <option key={bg} value={bg}>{bg}</option>
                  ))}
                </select>
              </div>

              {/* Component */}
              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold text-gray-500 px-1">Component</label>
                <select
                  value={component}
                  onChange={(e) => setComponent(e.target.value as ComponentType | '')}
                  className="w-full h-11 px-3 rounded-lg bg-gray-50 border border-gray-300 text-gray-900 focus:border-[#D32F2F] focus:ring-1 focus:ring-[#D32F2F] transition-all text-sm outline-none font-semibold cursor-pointer"
                >
                  <option value="">Select Component</option>
                  {components.map(cp => (
                    <option key={cp} value={cp}>{cp}</option>
                  ))}
                </select>
              </div>

              {/* Location */}
              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold text-gray-500 px-1 mb-0.5">Current City/District</label>
                <div id="relative-location" className="relative">
                  <MapPin className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="e.g. Kathmandu"
                    className="w-full h-11 pl-9 pr-3 rounded-lg bg-gray-50 border border-gray-300 text-gray-900 focus:border-[#D32F2F] focus:ring-1 focus:ring-[#D32F2F] transition-all text-sm outline-none font-semibold"
                  />
                </div>
              </div>

              {/* Find Button */}
              <button
                type="submit"
                className="md:col-span-3 mt-4 h-12 bg-[#D32F2F] hover:bg-[#b71c1c] text-white rounded-xl shadow-md shadow-red-100 font-bold text-sm transition-all flex items-center justify-center gap-2 group cursor-pointer"
              >
                <Search className="w-4 h-4 group-hover:scale-110 transition-transform" />
                Search Live Inventory
              </button>
            </form>
          </div>

          {/* Quick Shortcuts */}
          <div className="border-t border-gray-150 pt-4 flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-gray-500">Quick Shortcuts:</span>
            <button 
              onClick={() => executeShortcut('A+', 'Whole Blood', 'Lalitpur')}
              className="px-3 py-1 bg-gray-100 hover:bg-red-50 text-gray-600 hover:text-[#D32F2F] rounded-full text-xs font-semibold transition cursor-pointer"
            >
              A+ in Lalitpur
            </button>
            <button 
              onClick={() => executeShortcut('O-', 'Whole Blood', 'Kathmandu')}
              className="px-3 py-1 bg-gray-100 hover:bg-red-50 text-gray-600 hover:text-[#D32F2F] rounded-full text-xs font-semibold transition cursor-pointer"
            >
              O- Emergency
            </button>
            <button 
              onClick={() => {
                setBloodGroup('');
                setComponent('Plasma');
                setLocation('Bhaktapur');
                onQuickSearch('', 'Plasma', 'Bhaktapur');
              }}
              className="px-3 py-1 bg-gray-100 hover:bg-red-50 text-gray-600 hover:text-[#D32F2F] rounded-full text-xs font-semibold transition cursor-pointer"
            >
              Plasma Bhaktapur
            </button>
          </div>
        </div>

        {/* Proximity Alerts Widget */}
        <div className="lg:col-span-4 flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-sans text-sm font-bold uppercase tracking-wider text-gray-800 flex items-center gap-1.5">
              <ShieldAlert className="w-4 h-4 text-[#D32F2F]" />
              Emergency Near You
            </h3>
            <span className="text-[#D32F2F] font-bold text-xs animate-pulse flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-[#D32F2F]" />
              Live
            </span>
          </div>

          <div className="space-y-4 flex-1">
            {emergencyAlerts.map(alert => {
              const matchedHospital = hospitals.find(h => h.id === alert.hospitalId || h.name.toLowerCase().includes(alert.hospitalName.toLowerCase()));
              return (
                <div 
                  key={alert.id} 
                  className="bg-white rounded-xl border-l-4 border-[#D32F2F] p-4 shadow-sm flex flex-col justify-between border border-gray-100"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="inline-block text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 bg-red-50 text-[#D32F2F] rounded mb-1.5 border border-red-100">
                        {alert.level}
                      </span>
                      <h4 
                        onClick={() => matchedHospital && onSelectHospital(matchedHospital.id)}
                        className="font-sans text-sm font-bold text-gray-900 hover:text-[#D32F2F] cursor-pointer hover:underline transition"
                      >
                        {alert.hospitalName}
                      </h4>
                    </div>
                    <div className="text-right">
                      <p className="font-sans text-lg font-extrabold text-[#D32F2F] leading-none mb-0.5">{alert.bloodGroup}</p>
                      <p className="text-[10px] text-gray-400 font-bold">
                        {alert.unitsNeeded > 12 ? 'Multiple Units' : `${alert.unitsNeeded} Units Needed`}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-3 text-xs text-gray-500">
                    <span className="flex items-center gap-1 font-semibold">
                      <MapPin className="w-3.5 h-3.5 text-[#1976D2]" />
                      {alert.distance} km away • {alert.location}
                    </span>
                    <button 
                      onClick={() => matchedHospital && onContactHospital(matchedHospital)}
                      className="text-[#1976D2] font-bold text-xs hover:underline flex items-center gap-0.5 cursor-pointer"
                    >
                      Contact Hospital
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Static styled map placeholder */}
          <div 
            onClick={onNavigateToEmergency}
            className="rounded-xl h-24 w-full relative bg-slate-100 overflow-hidden border border-gray-200 grayscale opacity-75 hover:opacity-95 transition cursor-pointer shadow-inner"
            title="Open Emergency Dashboard Map"
          >
            <img 
              alt="Kathmandu City Medical Map View" 
              className="w-full h-full object-cover" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuByEZvcMtvYQ2aehD-sUt-NrHmgbUxkvAo-0SD6jOYZaAx3vo_fXKr5cwFEyKrdpR0L1ZRJ54yL7lC6h9vSK2UGUE2AFk2QAqhwAIkJJL3BLU-9E_QwbTdKDNQD5A0Il2knVyI8NuH2J_lkYCYs_2E-iP9RJO_zk7N6qw1xNn0RD6NRGhPjtmnfR-AGY_F4XgTYzSr60x3ADfL9nBVIEDBOO1nNf0o9Jx1ECYqDY4-1DD1o9zv6s6iz5LkVQ80ZUl6syFXatgDgOg" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-950/40 via-transparent to-transparent flex items-end p-2.5">
              <span className="text-xs font-semibold text-white bg-[#D32F2F] px-2 py-0.5 rounded shadow-sm">
                Kathmandu Map Radar
              </span>
            </div>
          </div>
        </div>

      </div>

      {/* Trust & Certifications Badgy Highlights */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        
        <div className="p-5 bg-white border border-gray-100 hover:border-gray-200 rounded-2xl flex flex-col items-center text-center space-y-3 shadow-sm hover:shadow-md transition duration-300">
          <div className="w-12 h-12 rounded-full bg-red-50 text-[#D32F2F] flex items-center justify-center">
            <Award className="w-6 h-6 stroke-[2]" />
          </div>
          <h4 className="font-sans text-sm font-bold text-gray-900">Certified Centers</h4>
          <p className="text-xs text-gray-500 font-semibold leading-relaxed">
            Only verified labs & NRCS-certified central blood storage units are admitted to our visible index.
          </p>
        </div>

        <div className="p-5 bg-white border border-gray-100 hover:border-gray-200 rounded-2xl flex flex-col items-center text-center space-y-3 shadow-sm hover:shadow-md transition duration-300">
          <div className="w-12 h-12 rounded-full bg-red-50 text-[#D32F2F] flex items-center justify-center">
            <RefreshCw className="w-6 h-6 stroke-[2]" />
          </div>
          <h4 className="font-sans text-sm font-bold text-gray-900">Real-Time Sync</h4>
          <p className="text-xs text-gray-500 font-semibold leading-relaxed">
            State-synchronized registries are checked and manually committed directly inside laboratory terminals.
          </p>
        </div>

        <div className="p-5 bg-white border border-gray-100 hover:border-gray-200 rounded-2xl flex flex-col items-center text-center space-y-3 shadow-sm hover:shadow-md transition duration-300">
          <div className="w-12 h-12 rounded-full bg-red-50 text-[#D32F2F] flex items-center justify-center">
            <Truck className="w-6 h-6 stroke-[2]" />
          </div>
          <h4 className="font-sans text-sm font-bold text-gray-900">Rapid Logistics</h4>
          <p className="text-xs text-gray-500 font-semibold leading-relaxed">
            Integrated dispatch coordination tracking for emergency hospital-to-hospital cold chain transfers.
          </p>
        </div>

        <div className="p-5 bg-white border border-gray-100 hover:border-gray-200 rounded-2xl flex flex-col items-center text-center space-y-3 shadow-sm hover:shadow-md transition duration-300">
          <div className="w-12 h-12 rounded-full bg-red-50 text-[#D32F2F] flex items-center justify-center">
            <Heart className="w-6 h-6 stroke-[2]" />
          </div>
          <h4 className="font-sans text-sm font-bold text-gray-900">Zero PeerSolicitation</h4>
          <p className="text-xs text-gray-500 font-semibold leading-relaxed">
            No endless donor spam or phone harassment circles. Safe B2C clinical supply matching.
          </p>
        </div>

      </section>

    </div>
  );
};

