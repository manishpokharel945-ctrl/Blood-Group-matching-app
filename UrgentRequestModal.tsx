import React, { useState } from 'react';
import { X, Check } from 'lucide-react';
import { BloodGroup, ComponentType } from '../types';

interface UrgentRequestModalProps {
  onClose: () => void;
  onSubmitUrgentRequest: (request: {
    patientName: string;
    bloodGroup: BloodGroup;
    componentType: ComponentType;
    unitsNeeded: number;
    hospitalName: string;
    contactPerson: string;
    contactPhone: string;
    reason: string;
  }) => void;
}

export const UrgentRequestModal: React.FC<UrgentRequestModalProps> = ({ onClose, onSubmitUrgentRequest }) => {
  const [patientName, setPatientName] = useState('');
  const [bloodGroup, setBloodGroup] = useState<BloodGroup>('O-');
  const [componentType, setComponentType] = useState<ComponentType>('Whole Blood');
  const [unitsStr, setUnitsStr] = useState('2');
  const [hospitalName, setHospitalName] = useState('');
  const [contactPerson, setContactPerson] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [reason, setReason] = useState('');
  const [success, setSuccess] = useState(false);

  const groupsList: BloodGroup[] = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
  const componentsList: ComponentType[] = ['Whole Blood', 'Platelets', 'Plasma', 'Packed Red Cells', 'Cryoprecipitate'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const units = parseInt(unitsStr, 10);
    if (isNaN(units) || units <= 0) return;

    onSubmitUrgentRequest({
      patientName,
      bloodGroup,
      componentType,
      unitsNeeded: units,
      hospitalName,
      contactPerson,
      contactPhone,
      reason
    });

    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
      onClose();
    }, 3000);
  };

  return (
    <div className="absolute inset-0 z-[99] flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-fade-in">
      <div className="relative w-full max-w-xl bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#D32F2F] text-white">
          <h3 className="font-sans text-lg font-bold">New Urgent Request</h3>
          <button 
            onClick={onClose}
            className="p-1 hover:bg-white/10 rounded-full transition-colors text-white cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {success ? (
          <div className="p-8 text-center flex flex-col items-center justify-center gap-4">
            <div className="w-16 h-16 bg-emerald-50 text-emerald-800 rounded-full flex items-center justify-center border border-emerald-100 animate-bounce">
              <Check className="w-8 h-8 stroke-[3]" />
            </div>
            <h4 className="font-sans font-bold text-emerald-850 text-lg">Request Confirmed & Broadcasted!</h4>
            <div className="max-w-md mx-auto text-sm text-gray-500 font-semibold space-y-2 leading-relaxed bg-slate-50 p-4 rounded-xl border border-gray-200">
              <p>
                <strong>B2C Infrastructure Notice:</strong> In line with safety regulations in Nepal, contact details are guarded. This urgent request was successfully broadcast to NRCS Central Dispatch and affiliated Kathmandu hospital staff networks.
              </p>
              <p className="font-bold text-[#D32F2F]">
                Direct lab coordinators will locate units and prepare dispatch protocols immediately.
              </p>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto custom-scrollbar">
            
            {/* Regulatory compliance callout */}
            <div className="p-3.5 bg-amber-50 text-amber-900 border border-amber-200 rounded-xl text-xs space-y-1.5 leading-relaxed">
              <p className="font-bold flex items-center gap-1">
                ⚠️ Platform Compliance Pledge
              </p>
              <p className="font-medium">
                VitalTrack Nepal refuses peer-to-peer donor matching or public solicitation. Your contact details will only be visible to certified medical laboratories and central transport coordinators.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Patient Name */}
              <div>
                <label className="block text-xs font-bold text-gray-550 mb-1 uppercase tracking-wide">
                  Patient Name / Reference
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Patient Ref-TUTH-44"
                  value={patientName}
                  onChange={(e) => setPatientName(e.target.value)}
                  className="w-full h-11 px-3 border border-gray-300 rounded-lg bg-white text-gray-900 focus:border-[#D32F2F] focus:ring-1 focus:ring-[#D32F2F] outline-none text-sm transition-all animate-none"
                />
              </div>

              {/* Hospital Location */}
              <div>
                <label className="block text-xs font-bold text-gray-550 mb-1 uppercase tracking-wide">
                  Where is blood needed?
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Teaching Hospital, Maharajgunj"
                  value={hospitalName}
                  onChange={(e) => setHospitalName(e.target.value)}
                  className="w-full h-11 px-3 border border-gray-300 rounded-lg bg-white text-gray-900 focus:border-[#D32F2F] focus:ring-1 focus:ring-[#D32F2F] outline-none text-sm transition-all animate-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Blood Group */}
              <div>
                <label className="block text-xs font-bold text-gray-550 mb-1 uppercase tracking-wide">
                  Required Group
                </label>
                <select
                  value={bloodGroup}
                  onChange={(e) => setBloodGroup(e.target.value as BloodGroup)}
                  className="w-full h-11 px-3 border border-gray-300 rounded-lg bg-white text-gray-900 focus:border-[#D32F2F] focus:ring-1 focus:ring-[#D32F2F] outline-none text-sm transition-all"
                >
                  {groupsList.map(g => (
                    <option key={g} value={g}>{g}</option>
                  ))}
                </select>
              </div>

              {/* Component */}
              <div>
                <label className="block text-xs font-bold text-gray-550 mb-1 uppercase tracking-wide">
                  Component Type
                </label>
                <select
                  value={componentType}
                  onChange={(e) => setComponentType(e.target.value as ComponentType)}
                  className="w-full h-11 px-3 border border-gray-300 rounded-lg bg-white text-gray-900 focus:border-[#D32F2F] focus:ring-1 focus:ring-[#D32F2F] outline-none text-sm transition-all"
                >
                  {componentsList.map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              {/* Units */}
              <div>
                <label className="block text-xs font-bold text-gray-550 mb-1 uppercase tracking-wide">
                  Units Needed
                </label>
                <input
                  type="number"
                  min="1"
                  max="12"
                  value={unitsStr}
                  onChange={(e) => setUnitsStr(e.target.value)}
                  required
                  className="w-full h-11 px-3 border border-gray-300 rounded-lg bg-white text-gray-900 focus:border-[#D32F2F] focus:ring-1 focus:ring-[#D32F2F] outline-none text-sm transition-all animate-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Authorized Contact Person */}
              <div>
                <label className="block text-xs font-bold text-gray-550 mb-1 uppercase tracking-wide">
                  Hospital Attendant / Contact Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="Official attendant's name"
                  value={contactPerson}
                  onChange={(e) => setContactPerson(e.target.value)}
                  className="w-full h-11 px-3 border border-gray-300 rounded-lg bg-white text-gray-900 focus:border-[#D32F2F] focus:ring-1 focus:ring-[#D32F2F] outline-none text-sm transition-all animate-none"
                />
              </div>

              {/* Authorized Contact Phone */}
              <div>
                <label className="block text-xs font-bold text-gray-550 mb-1 uppercase tracking-wide">
                  Contact Phone Number
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. +977 98XXXXXXXX"
                  value={contactPhone}
                  onChange={(e) => setContactPhone(e.target.value)}
                  className="w-full h-11 px-3 border border-gray-300 rounded-lg bg-white text-gray-900 focus:border-[#D32F2F] focus:ring-1 focus:ring-[#D32F2F] outline-none text-sm transition-all animate-none"
                />
              </div>
            </div>

            {/* Reason/Clinical Context */}
            <div>
              <label className="block text-xs font-bold text-gray-550 mb-1 uppercase tracking-wide">
                Clinical Context / Diagnosis
              </label>
              <textarea
                rows={2}
                placeholder="e.g. Emergency bypass surgery scheduled for Sunday morning."
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-900 focus:border-[#D32F2F] focus:ring-1 focus:ring-[#D32F2F] outline-none text-sm transition-all font-sans"
              />
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 h-11 border border-gray-300 rounded-lg hover:bg-slate-50 text-slate-700 transition cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 h-11 bg-[#D32F2F] hover:bg-[#b71c1c] text-white rounded-lg font-bold transition flex items-center justify-center cursor-pointer"
              >
                Broadcast Urgent Request
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

