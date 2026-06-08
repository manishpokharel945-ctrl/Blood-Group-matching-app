import React from 'react';
import { Bookmark, MapPin, History, Trash2, ArrowRight } from 'lucide-react';
import { Hospital } from '../types';

interface SavedScreenProps {
  savedHospitalIds: string[];
  hospitals: Hospital[];
  onToggleSave: (id: string) => void;
  onSelectHospital: (id: string) => void;
}

export const SavedScreen: React.FC<SavedScreenProps> = ({
  savedHospitalIds,
  hospitals,
  onToggleSave,
  onSelectHospital,
}) => {
  const savedHospitals = hospitals.filter(h => savedHospitalIds.includes(h.id));

  return (
    <div className="space-y-6 animate-fade-in pb-16">
      
      <div>
        <h2 className="font-sans text-2xl font-extrabold text-gray-900">Saved Facilities & Labs</h2>
        <p className="text-sm text-gray-500 font-semibold">
          Monitor real-time inventory updates for your bookmarked medical networks in Kathmandu.
        </p>
      </div>

      {savedHospitals.length === 0 ? (
        <div className="bg-white p-8 rounded-2xl text-center border border-gray-200 max-w-md mx-auto space-y-4">
          <Bookmark className="w-12 h-12 text-slate-350 mx-auto" />
          <div className="space-y-1">
            <h4 className="font-sans font-bold text-slate-900">No Saved Channels</h4>
            <p className="text-xs text-slate-500 font-semibold max-w-xs mx-auto leading-relaxed">
              Bookmark hospitals from their detail pages to receive immediate stock levels notifications.
            </p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {savedHospitals.map(hospital => (
            <div 
              key={hospital.id}
              className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between space-y-4 hover:shadow-md transition"
            >
              <div className="space-y-1.5/2">
                <div className="flex justify-between items-start">
                  <h3 className="font-sans text-base font-bold text-slate-950">{hospital.name}</h3>
                  <button 
                    onClick={() => onToggleSave(hospital.id)}
                    className="p-1.5 text-slate-400 hover:text-red-650 rounded-full hover:bg-red-50 transition cursor-pointer"
                    title="Remove Bookmark"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <div className="flex items-center gap-1 text-xs text-slate-500 font-semibold">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{hospital.address} • {hospital.distance} km</span>
                </div>
              </div>

              {/* Mini stock listing status */}
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-semibold">
                <div className="flex items-center gap-1.5 text-slate-400">
                  <History className="w-3.5 h-3.5" />
                  <span>Synced {hospital.updatedMinutesAgo} mins ago</span>
                </div>
                
                <button
                  onClick={() => onSelectHospital(hospital.id)}
                  className="text-xs font-bold text-[#D32F2F] flex items-center gap-0.5 hover:underline cursor-pointer"
                >
                  Go to details
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};

