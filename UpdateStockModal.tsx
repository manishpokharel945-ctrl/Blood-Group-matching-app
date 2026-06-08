import React, { useState } from 'react';
import { X, Check } from 'lucide-react';
import { Hospital, BloodGroup, ComponentType } from '../types';

interface UpdateStockModalProps {
  hospitals: Hospital[];
  onClose: () => void;
  onUpdateStock: (hospitalId: string, bloodGroup: BloodGroup, componentType: ComponentType, newUnits: number) => void;
}

export const UpdateStockModal: React.FC<UpdateStockModalProps> = ({ hospitals, onClose, onUpdateStock }) => {
  const [selectedHospitalId, setSelectedHospitalId] = useState(hospitals[0]?.id || '');
  const [selectedGroup, setSelectedGroup] = useState<BloodGroup>('O-');
  const [selectedComponent, setSelectedComponent] = useState<ComponentType>('Whole Blood');
  const [unitsStr, setUnitsStr] = useState('5');
  const [successMsg, setSuccessMsg] = useState('');

  const groupsList: BloodGroup[] = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
  const componentsList: ComponentType[] = ['Whole Blood', 'Platelets', 'Plasma', 'Packed Red Cells', 'Cryoprecipitate'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const units = parseInt(unitsStr, 10);
    if (isNaN(units) || units < 0) return;

    onUpdateStock(selectedHospitalId, selectedGroup, selectedComponent, units);
    const selectedHosp = hospitals.find(h => h.id === selectedHospitalId);
    
    setSuccessMsg(`Successfully updated ${selectedComponent} for group ${selectedGroup} at ${selectedHosp?.name || 'Hospital'} to ${units} Units!`);
    setTimeout(() => {
      setSuccessMsg('');
      onClose();
    }, 2000);
  };

  return (
    <div className="absolute inset-0 z-[99] flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-fade-in">
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#D32F2F] text-white">
          <h3 className="font-sans text-lg font-bold">Update Lab Blood Stock</h3>
          <button 
            onClick={onClose}
            className="p-1 hover:bg-white/10 rounded-full transition-colors text-white cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {successMsg ? (
          <div className="p-8 text-center flex flex-col items-center justify-center gap-4">
            <div className="w-16 h-16 bg-emerald-50 text-emerald-750 rounded-full flex items-center justify-center border border-emerald-100">
              <Check className="w-8 h-8 stroke-[3]" />
            </div>
            <p className="font-sans font-semibold text-emerald-800 text-base">{successMsg}</p>
            <p className="text-xs text-slate-500">Inventory grid sync is instant.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <p className="font-sans text-xs text-gray-500 font-semibold leading-relaxed">
              *Authorized laboratory staff entry only. Updates will broadcast instantly to Kathmandu live inventory network.
            </p>

            {/* Hospital selection */}
            <div>
              <label className="block text-xs font-bold text-gray-550 mb-1.5 uppercase tracking-wide">
                Select Hospital Lab
              </label>
              <select
                value={selectedHospitalId}
                onChange={(e) => setSelectedHospitalId(e.target.value)}
                className="w-full h-11 px-3 border border-gray-300 rounded-lg bg-white text-gray-900 focus:border-[#D32F2F] focus:ring-1 focus:ring-[#D32F2F] outline-none text-sm transition-all"
              >
                {hospitals.map(h => (
                  <option key={h.id} value={h.id}>
                    {h.name} ({h.district})
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {/* Blood Group */}
              <div>
                <label className="block text-xs font-bold text-gray-550 mb-1.5 uppercase tracking-wide">
                  Blood Group
                </label>
                <select
                  value={selectedGroup}
                  onChange={(e) => setSelectedGroup(e.target.value as BloodGroup)}
                  className="w-full h-11 px-3 border border-gray-300 rounded-lg bg-white text-gray-900 focus:border-[#D32F2F] focus:ring-1 focus:ring-[#D32F2F] outline-none text-sm transition-all"
                >
                  {groupsList.map(g => (
                    <option key={g} value={g}>{g}</option>
                  ))}
                </select>
              </div>

              {/* Component */}
              <div>
                <label className="block text-xs font-bold text-gray-550 mb-1.5 uppercase tracking-wide">
                  Component Type
                </label>
                <select
                  value={selectedComponent}
                  onChange={(e) => setSelectedComponent(e.target.value as ComponentType)}
                  className="w-full h-11 px-3 border border-gray-300 rounded-lg bg-white text-gray-900 focus:border-[#D32F2F] focus:ring-1 focus:ring-[#D32F2F] outline-none text-sm transition-all"
                >
                  {componentsList.map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Units */}
            <div>
              <label className="block text-xs font-bold text-gray-550 mb-1.5 uppercase tracking-wide">
                Available Volume (Units)
              </label>
              <input
                type="number"
                min="0"
                max="250"
                value={unitsStr}
                onChange={(e) => setUnitsStr(e.target.value)}
                required
                className="w-full h-11 px-3 border border-gray-300 rounded-lg bg-white text-gray-900 focus:border-[#D32F2F] focus:ring-1 focus:ring-[#D32F2F] outline-none text-sm transition-all animate-none"
                placeholder="e.g. 12"
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
                className="flex-1 h-11 bg-[#D32F2F] hover:bg-[#b71c1c] text-white rounded-lg font-bold transition flex items-center justify-center gap-1.5 cursor-pointer"
              >
                Update Inventory
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

