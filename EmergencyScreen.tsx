import React, { useState } from 'react';
import { 
  AlertTriangle, Phone, Truck, RefreshCw, Map, 
  MapPin, Navigation2, Compass, Droplet, Clock, Sliders, Box, HelpCircle, Check, ShieldCheck 
} from 'lucide-react';
import { RareRequest, Hospital, ComponentType } from '../types';

interface EmergencyScreenProps {
  rareRequests: RareRequest[];
  hospitals: Hospital[];
  onTriggerUpdateStock: () => void;
  onSelectHospital: (id: string) => void;
}

export const EmergencyScreen: React.FC<EmergencyScreenProps> = ({
  rareRequests,
  hospitals,
  onTriggerUpdateStock,
  onSelectHospital
}) => {
  const [selectedMapPin, setSelectedMapPin] = useState<{
    hospitalName: string;
    bloodGroup: string;
    units: string;
    lat: string;
    lng: string;
    distance: string;
    id: string;
  } | null>({
    hospitalName: 'Bir Hospital',
    bloodGroup: 'O-',
    units: '6 Units (Stable)',
    lat: '30%',
    lng: '45%',
    distance: '1.2 km',
    id: 'bir'
  });

  const [transportProgress, setTransportProgress] = useState<string | null>(null);

  // Simulation map nodes matching geography
  const pins = [
    {
      id: 'bir',
      hospitalName: 'Bir Hospital',
      bloodGroup: 'O-',
      units: '6 Units (Stable)',
      lat: '35%',
      lng: '40%',
      distance: '1.2 km'
    },
    {
      id: 'nrcs',
      hospitalName: 'Nepal Red Cross Society',
      bloodGroup: 'O-',
      units: '1 Unit (Critical)',
      lat: '58%',
      lng: '32%',
      distance: '2.4 km'
    },
    {
      id: 'tuth',
      hospitalName: 'T.U. Teaching Hospital (TUTH)',
      bloodGroup: 'AB-',
      units: '3 Units (Stable)',
      lat: '24%',
      lng: '52%',
      distance: '2.4 km'
    },
    {
      id: 'mediciti',
      hospitalName: 'Nepal Mediciti Hospital',
      bloodGroup: 'B+',
      units: '8 Units (Stable)',
      lat: '78%',
      lng: '48%',
      distance: '8.5 km'
    }
  ];

  const handleRequestTransport = () => {
    setTransportProgress('Initiating Central Dispatch transport protocols...');
    setTimeout(() => {
      setTransportProgress('Assigning clinical cold-chain ambulance courier GPS... 📍');
    }, 1500);
    setTimeout(() => {
      setTransportProgress('Courier code SECURED-901 dispatched. En route to Maharajgunj. 🚚');
    }, 4000);
    setTimeout(() => {
      setTransportProgress(null);
    }, 8000);
  };

  return (
    <div className="space-y-6 animate-fade-in pb-16">
      
      {/* Critical Shortage Alert Banner */}
      <section className="bg-gradient-to-r from-[#D32F2F] to-red-600 text-white px-4 md:px-6 py-4 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-md animate-pulse">
        <div className="flex items-center gap-3">
          <AlertTriangle className="w-6 h-6 text-yellow-300 fill-yellow-300/10 shrink-0" />
          <div>
            <h2 className="font-sans text-base md:text-lg font-extrabold tracking-tight">
              CRITICAL SHORTAGE: O-NEGATIVE
            </h2>
            <p className="text-xs text-red-100 max-w-md">
              Hospitals across Kathmandu are reporting high emergency bypass drainages. Voluntary replacement stores needed immediately.
            </p>
          </div>
        </div>
        <span className="font-sans text-xs font-bold bg-white/20 border border-white/30 px-3.5 py-1.5 rounded-full whitespace-nowrap self-start md:self-auto uppercase tracking-wide">
          Kathmandu Valley Grid
        </span>
      </section>

      {/* Quick Actions Grid layout */}
      <section className="grid grid-cols-1 md:grid-cols-4 gap-4">
        
        {/* Prime coordination dial widget */}
        <a 
          href="tel:+97714412404"
          className="md:col-span-2 p-5 bg-red-50 hover:bg-red-150/10 border border-red-100 text-[#D32F2F] rounded-2xl shadow-xs transition duration-150 flex items-center justify-between group active:scale-99 hover:shadow-sm cursor-pointer"
          title="Dial Central Dispatch Unit"
        >
          <div className="space-y-1.5">
            <span className="block text-[10px] font-bold text-gray-550 uppercase tracking-wide">
              Central Hospital Dispatch
            </span>
            <span className="font-sans text-lg md:text-xl font-extrabold text-[#D32F2F] leading-tight block">
              Direct Emergency Coordination
            </span>
            <span className="block text-xs text-red-800 border-t border-red-100 pt-1 font-medium">
              Click to initiate priority medical line
            </span>
          </div>

          <div className="w-12 h-12 rounded-full bg-[#D32F2F] text-white flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
            <Phone className="w-5 h-5 fill-white" />
          </div>
        </a>

        {/* Transport launcher simulation */}
        <button 
          onClick={handleRequestTransport}
          className="p-5 bg-blue-50 hover:bg-blue-100 border border-blue-200 text-[#1976D2] rounded-2xl shadow-xs transition duration-150 flex flex-col justify-center items-center text-center space-y-2 cursor-pointer outline-none"
        >
          <Truck className="w-6 h-6 stroke-[2]" />
          <span className="font-sans text-xs font-bold uppercase tracking-wider block">
            Request Transport
          </span>
          <span className="text-[10px] text-blue-800 leading-tight">
            Deploy emergency cold-chain courier
          </span>
        </button>

        {/* Local Stock update terminal */}
        <button 
          onClick={onTriggerUpdateStock}
          className="p-5 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-800 rounded-2xl shadow-xs transition duration-150 flex flex-col justify-center items-center text-center space-y-2 cursor-pointer outline-none"
        >
          <RefreshCw className="w-6 h-6 stroke-[2]" />
          <span className="font-sans text-xs font-bold uppercase tracking-wider block">
            Update Stock
          </span>
          <span className="text-[10px] text-slate-500 leading-tight">
            Commit lab storage values instantly
          </span>
        </button>

      </section>

      {/* Active notification bubble if courier is live */}
      {transportProgress && (
        <div className="p-4 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-xl flex items-center gap-3 font-medium text-xs shadow-xs animate-slide-up">
          <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
          <p>{transportProgress}</p>
        </div>
      )}

      {/* Main Bento Segment row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Rare Type Alerts left stack */}
        <div className="lg:col-span-4 space-y-4">
          <div className="flex items-center gap-2 text-gray-700 border-b border-gray-200 pb-2">
            <AlertTriangle className="w-4 h-4 text-[#D32F2F]" />
            <h3 className="font-sans text-sm font-bold uppercase tracking-wider">Active Rare Requests</h3>
          </div>

          <div className="space-y-3">
            {rareRequests.map(req => {
              // Extract status badges styling
              let codeText = 'PENDING';
              let styleObj = 'bg-red-50 text-[#D32F2F] border-red-105 border';
              if (req.status === 'SECURED') {
                codeText = 'SECURED';
                styleObj = 'bg-emerald-50 text-emerald-700 border-emerald-100 border';
              } else if (req.status === 'URGENT') {
                codeText = 'CRITICAL';
                styleObj = 'bg-rose-50 text-[#D32F2F] border-red-200 border animate-pulse';
              }

              return (
                <div 
                  key={req.id}
                  className="bg-white p-4 rounded-xl border border-slate-200 flex items-start justify-between space-x-4 shadow-xs"
                >
                  <div className="space-y-1.5 flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-0.5 text-[9px] font-extrabold rounded ${styleObj}`}>
                        {codeText}
                      </span>
                      <span className="text-[10px] text-slate-450 font-medium flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {req.timeAgoText}
                      </span>
                    </div>

                    <h4 className="font-sans text-sm font-bold text-slate-900 leading-tight">
                      {req.bloodGroup} Needed
                    </h4>
                    
                    <p className="text-xs text-slate-500 font-medium truncate">
                      {req.hospitalName}
                    </p>
                  </div>

                  <span className="font-sans text-xl font-extrabold text-[#D32F2F] whitespace-nowrap pt-1">
                    {req.unitsNeeded} Units
                  </span>
                </div>
              );
            })}
          </div>

          <div className="p-3.5 bg-slate-50 rounded-xl border border-dashed border-slate-350 text-center">
            <span className="text-[11px] text-slate-500 leading-normal block">
              Verified coordinates of inpatient requisitions routed directly into hospital dispatch logs.
            </span>
          </div>
        </div>

        {/* Heatmap right complex */}
        <div className="lg:col-span-8 space-y-4">
          <div className="flex justify-between items-center border-b border-gray-200 pb-2">
            <h3 className="font-sans text-sm font-bold uppercase tracking-wider text-gray-700 flex items-center gap-1.5">
              <Map className="w-4 h-4 text-[#D32F2F]" />
              Live Inventory Heatmap
            </h3>
            <div className="flex gap-2 text-[10px] font-bold text-gray-500">
              <span className="flex items-center gap-1 animate-pulse">
                <span className="w-2.5 h-2.5 rounded-full bg-[#D32F2F]" /> Low
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-[#388E3C]" /> Stable
              </span>
            </div>
          </div>

          <div className="relative w-full h-[400px] bg-slate-100 rounded-2xl overflow-hidden shadow-inner border border-slate-200">
            {/* Simulation background Kathmandu map layer */}
            <img 
              alt="Detailed Minimalist Map" 
              className="absolute inset-0 w-full h-full object-cover grayscale opacity-35" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBaXlhdkaG-sfm26Xao3uWr95rc3srb-erU7MCpVTZFe1uW29HM6bhvLRcErns9i-P_D-rkF_lT3-wqotYLviiQK9fWcE1-nHLbUl4Gz2apA6H4vBUS_55x_KoKwQhmx1dV5Tteb7pPVqg9c48iChz92O597t1PDBHIr-uvQQBbLgQLsyXKOJ33GnA-HuWFbCFNz28vpVP0wmdh-8waGcjIU6jJdgzoibkumzCNm2V2mko8w_Z8bPwk5LlwS3VJFF4R6hlWAMGL7g" 
            />

            {/* Interactive floating custom markers pins */}
            {pins.map(pin => {
              const isSelected = selectedMapPin?.id === pin.id;
              const isLow = pin.units.toLowerCase().includes('critical') || pin.units.toLowerCase().includes('low');
              
              return (
                <div 
                  key={pin.id}
                  className="absolute"
                  style={{ top: pin.lat, left: pin.lng }}
                >
                  <button
                    onClick={() => setSelectedMapPin(pin)}
                    className={`w-8 h-8 rounded-full border-2 border-white shadow-md flex items-center justify-center font-extrabold text-[10px] text-white hover:scale-110 active:scale-95 transition-all outline-none ${
                      isLow ? 'bg-[#D32F2F] animate-bounce' : 'bg-[#388E3C]'
                    } ${isSelected ? 'ring-4 ring-offset-2 ring-[#D32F2F]' : ''}`}
                    title={pin.hospitalName}
                  >
                    {pin.bloodGroup}
                  </button>
                </div>
              );
            })}

            {/* Float Detail overlay panel */}
            {selectedMapPin && (
              <div className="absolute bottom-4 left-4 right-4 md:right-auto md:w-80 bg-white/95 backdrop-blur-md p-4 rounded-xl shadow-lg border border-gray-200 animate-slide-up">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-red-50 flex items-center justify-center shrink-0">
                    <MapPin className="w-4.5 h-4.5 text-[#D32F2F]" />
                  </div>
                  <div className="min-w-0 flex-1 space-y-1">
                    <p className="text-[10px] font-bold text-[#D32F2F] uppercase tracking-wide">
                      Selected Heat Node
                    </p>
                    <h4 className="font-bold text-slate-900 text-xs truncate">
                      {selectedMapPin.hospitalName}
                    </h4>
                    <p className="text-xs text-slate-500 font-semibold font-mono">
                      Quantity: {selectedMapPin.units} • {selectedMapPin.distance}
                    </p>
                  </div>
                </div>

                <div className="flex gap-2 mt-3.5 pt-2 border-t border-slate-100">
                  <button 
                    onClick={() => onSelectHospital(selectedMapPin.id)}
                    className="flex-1 h-9 bg-[#D32F2F] hover:bg-[#b71c1c] text-white text-xs font-bold rounded-lg transition cursor-pointer"
                  >
                    View Hospital Details
                  </button>
                  <button 
                    onClick={() => setSelectedMapPin(null)}
                    className="h-9 px-3 border border-slate-300 hover:bg-slate-50 text-slate-500 text-xs rounded-lg transition cursor-pointer"
                  >
                    Clear Pin
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

      </div>

      {/* Lifesaving Components Grid at the bottom */}
      <section className="space-y-4">
        <h3 className="font-sans text-sm font-bold uppercase tracking-wider text-gray-700 flex items-center gap-1.5">
          <Box className="w-4 h-4 text-[#D32F2F]" />
          Nearest Available Blood Components
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* Card 1: Platelets */}
          <div className="bg-white p-4 rounded-xl border border-slate-205 space-y-3 shadow-xs">
            <div className="flex justify-between items-start">
              <span className="p-2 bg-red-50 text-[#D32F2F] rounded-lg">
                <Droplet className="w-5 h-5 fill-red-100" />
              </span>
              <span className="text-[10px] font-extrabold text-[#388E3C] px-2.5 py-0.5 bg-emerald-50 rounded font-mono border border-emerald-100">
                STABLE
              </span>
            </div>

            <div className="space-y-1">
              <h4 className="font-sans text-sm font-bold text-slate-900">Platelets</h4>
              <p className="text-xs text-slate-500 font-medium">Kanti Children's Hospital</p>
            </div>

            <div className="flex items-center justify-between text-xs text-slate-500">
              <span className="flex items-center gap-1 font-semibold">
                <Clock className="w-3.5 h-3.5" /> 15m away
              </span>
              <span className="font-bold text-slate-900 font-mono">12 Units</span>
            </div>
          </div>

          {/* Card 2: Fresh Frozen Plasma */}
          <div className="bg-white p-4 rounded-xl border border-slate-205 space-y-3 shadow-xs">
            <div className="flex justify-between items-start">
              <span className="p-2 bg-amber-50 text-amber-700 rounded-lg">
                <Droplet className="w-5 h-5 rotate-180 fill-amber-100" />
              </span>
              <span className="text-[10px] font-extrabold text-[#D32F2F] px-2.5 py-0.5 bg-red-50 rounded font-mono border border-red-100">
                LOW STOCK
              </span>
            </div>

            <div className="space-y-1">
              <h4 className="font-sans text-sm font-bold text-slate-900">Fresh Frozen Plasma</h4>
              <p className="text-xs text-slate-500 font-medium">Om Hospital & Research Centre</p>
            </div>

            <div className="flex items-center justify-between text-xs text-slate-500">
              <span className="flex items-center gap-1 font-semibold">
                <Clock className="w-3.5 h-3.5" /> 28m away
              </span>
              <span className="font-bold text-[#D32F2F] font-mono">3 Units</span>
            </div>
          </div>

          {/* Card 3: Cryoprecipitate */}
          <div className="bg-white p-4 rounded-xl border border-slate-205 space-y-3 shadow-xs">
            <div className="flex justify-between items-start">
              <span className="p-2 bg-emerald-50 text-emerald-700 rounded-lg">
                <Droplet className="w-5 h-5 fill-emerald-100" />
              </span>
              <span className="text-[10px] font-extrabold text-[#388E3C] px-2.5 py-0.5 bg-emerald-50 rounded font-mono border border-emerald-100">
                STABLE
              </span>
            </div>

            <div className="space-y-1">
              <h4 className="font-sans text-sm font-bold text-slate-900">Cryoprecipitate</h4>
              <p className="text-xs text-slate-500 font-medium">Nepal Mediciti Hospital</p>
            </div>

            <div className="flex items-center justify-between text-xs text-slate-500">
              <span className="flex items-center gap-1 font-semibold">
                <Clock className="w-3.5 h-3.5" /> 42m away
              </span>
              <span className="font-bold text-slate-900 font-mono">8 Units</span>
            </div>
          </div>

          {/* Card 4: Whole Blood (Unknown) */}
          <div className="bg-white p-4 rounded-xl border border-slate-205 space-y-3 shadow-xs">
            <div className="flex justify-between items-start">
              <span className="p-2 bg-slate-100 text-slate-500 rounded-lg">
                <Droplet className="w-5 h-5 opacity-40" />
              </span>
              <span className="text-[10px] font-extrabold text-slate-500 px-2.5 py-0.5 bg-slate-100 rounded font-mono border border-slate-200">
                UNKNOWN
              </span>
            </div>

            <div className="space-y-1">
              <h4 className="font-sans text-sm font-bold text-slate-900">Whole Blood</h4>
              <p className="text-xs text-slate-500 font-medium">Bhaktapur Cancer Hospital</p>
            </div>

            <div className="flex items-center justify-between text-xs text-slate-500">
              <span className="flex items-center gap-1 font-semibold">
                <Clock className="w-3.5 h-3.5" /> 55m away
              </span>
              <span className="font-bold text-slate-400 font-mono">-- Units</span>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
};

