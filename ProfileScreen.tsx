import React from 'react';
import { 
  User, Mail, Phone, ShieldCheck, Heart, Calendar, 
  MapPin, Settings, ToggleLeft, ToggleRight, Info 
} from 'lucide-react';
import { DonorBooking } from '../types';

interface ProfileScreenProps {
  userEmail: string;
  donorBookings: DonorBooking[];
  onCancelBooking: (id: string) => void;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({
  userEmail,
  donorBookings,
  onCancelBooking,
}) => {
  const [allowAlerts, setAllowAlerts] = React.useState(true);
  const [silentMode, setSilentMode] = React.useState(false);

  return (
    <div className="space-y-6 animate-fade-in pb-16">
      
      <div>
        <h2 className="font-sans text-2xl font-extrabold text-gray-900">Logistics & Donor Profile</h2>
        <p className="text-sm text-gray-500 font-semibold">
          Manage authorized laboratory liaison credentials or view slot reservations.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Side: Profile Meta card */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white rounded-2xl border border-gray-205 p-6 text-center space-y-4 shadow-xs">
            <div className="w-20 h-20 bg-red-50 text-[#D32F2F] rounded-full flex items-center justify-center mx-auto border-4 border-white shadow-sm">
              <User className="w-10 h-10" />
            </div>

            <div className="space-y-1">
              <h3 className="font-sans text-base font-bold text-slate-950">Liaison Coordinator</h3>
              <p className="text-xs text-[#D32F2F] font-bold flex items-center justify-center gap-1">
                <ShieldCheck className="w-4 h-4 fill-red-100" />
                 Kathmandu Central Grid Supervisor
              </p>
            </div>

            <div className="pt-2 text-xs text-left space-y-2.5 text-gray-500 border-t border-slate-100 font-semibold">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-slate-400 shrink-0" />
                <span className="truncate">{userEmail || 'manishpokharel945@gmail.com'}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-slate-400 shrink-0" />
                <span>+977 1-4412404 (Verified)</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
                <span>Kathmandu Head Office Liaison</span>
              </div>
            </div>
          </div>

          {/* Local Settings Toggle Panel */}
          <div className="bg-white rounded-2xl border border-gray-205 p-5 space-y-4 shadow-xs">
            <h4 className="font-sans text-xs font-bold uppercase tracking-wider text-gray-500 border-b border-gray-150 pb-2 flex items-center gap-1.5/2">
              <Settings className="w-4 h-4 text-[#D32F2F]" />
              Local App Preferences
            </h4>

            <div className="space-y-3 text-xs font-bold text-gray-900">
              <div className="flex items-center justify-between">
                <span>Receive Live Grid Alerts</span>
                <button onClick={() => setAllowAlerts(!allowAlerts)} className="text-[#D32F2F] cursor-pointer">
                  {allowAlerts ? <ToggleRight className="w-8 h-8 stroke-[1.5]" /> : <ToggleLeft className="w-8 h-8 stroke-[1.5]" />}
                </button>
              </div>

              <div className="flex items-center justify-between">
                <span>Silent Clinic Updates Mode</span>
                <button onClick={() => setSilentMode(!silentMode)} className="text-[#D32F2F] cursor-pointer">
                  {silentMode ? <ToggleRight className="w-8 h-8 stroke-[1.5]" /> : <ToggleLeft className="w-8 h-8 stroke-[1.5]" />}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Active Bookings */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 shadow-xs">
            <h3 className="font-sans text-base font-bold text-slate-950 flex items-center gap-2 border-b border-slate-100 pb-3">
              <Heart className="w-5 h-5 text-[#D32F2F] fill-[#D32F2F]/20" />
              Your Active Donor Appointments ({donorBookings.length})
            </h3>

            {donorBookings.length === 0 ? (
              <div className="py-8 text-center text-slate-400 space-y-3">
                <Calendar className="w-10 h-10 mx-auto text-slate-350" />
                <div className="space-y-1 max-w-sm mx-auto">
                  <p className="font-bold text-slate-800 text-xs">No Scheduled Donor Sessions</p>
                  <p className="text-[11px] text-gray-500 font-semibold leading-relaxed">
                    Book donation slot schedules inside individual facility screens to directly list sessions here. Your sessions help laboratories balance supply chain shortfalls.
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                {donorBookings.map(session => (
                  <div 
                    key={session.id}
                    className="p-4 bg-slate-50 rounded-xl border border-slate-150 flex flex-col md:flex-row md:items-center md:justify-between gap-4 justify-between"
                  >
                    <div className="space-y-1">
                      <h4 className="font-sans text-xs font-bold text-[#D32F2F]">
                        Blood Group: {session.bloodGroup} session
                      </h4>
                      <p className="font-bold text-xs text-slate-900">{session.hospitalName}</p>
                      <div className="flex gap-4 text-[10px] text-slate-550 font-semibold font-mono">
                        <span>Date: {session.date}</span>
                        <span>Slot: {session.timeSlot}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-[10px] font-bold px-2 py-0.5 bg-emerald-50 text-emerald-850 rounded border border-emerald-100 whitespace-nowrap">
                        LIAISON APPROVED
                      </span>
                      <button 
                        onClick={() => onCancelBooking(session.id)}
                        className="text-[10px] font-bold text-rose-600 hover:underline hover:text-rose-700 cursor-pointer"
                      >
                        Cancel Slot
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Safe practices reminder banner */}
          <div className="bg-red-50/40 p-4 rounded-xl border border-red-100 flex items-start gap-3">
            <Info className="w-4.5 h-4.5 text-[#D32F2F] shrink-0 mt-0.5" />
            <div className="space-y-1">
              <h5 className="text-xs font-bold text-red-950">Ethical Healthcare Compliance</h5>
              <p className="text-[11px] text-gray-650 font-semibold leading-relaxed">
                VitalTrack Nepal operates strictly under Nepalese medical infrastructure guidelines. Direct peer-to-peer donor exchange networks or donor solicitation details are explicitly forbidden to ensure safety, trust, and supply authenticity.
              </p>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};

