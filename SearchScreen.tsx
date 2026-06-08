import React, { useState, useMemo } from 'react';
import { SlidersHorizontal, MapPin, Search, ArrowRight, History, HelpCircle, Plus } from 'lucide-react';
import { Hospital, BloodGroup, ComponentType, BloodStock } from '../types';

interface SearchScreenProps {
  hospitals: Hospital[];
  onSelectHospital: (id: string) => void;
  onRequestNewLocation: () => void;
  initialBloodGroup?: BloodGroup | '';
  initialComponent?: ComponentType | '';
  initialLocationCity?: string;
}

export const SearchScreen: React.FC<SearchScreenProps> = ({
  hospitals,
  onSelectHospital,
  onRequestNewLocation,
  initialBloodGroup = '',
  initialComponent = '',
  initialLocationCity = '',
}) => {
  const [selectedGroup, setSelectedGroup] = useState<BloodGroup | ''>(initialBloodGroup);
  const [selectedComponent, setSelectedComponent] = useState<ComponentType | 'All'>(initialComponent || 'All');
  const [distanceLimit, setDistanceLimit] = useState<number>(30); // in km
  const [searchQuery, setSearchQuery] = useState(initialLocationCity || '');

  const groupsList: BloodGroup[] = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
  const componentsList: ComponentType[] = ['Whole Blood', 'Platelets', 'Plasma', 'Packed Red Cells', 'Cryoprecipitate'];

  // Search logic
  const filteredHospitals = useMemo(() => {
    return hospitals.filter(hospital => {
      // 1. Filter by location / search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = hospital.name.toLowerCase().includes(query);
        const matchesAddress = hospital.address.toLowerCase().includes(query);
        const matchesDistrict = hospital.district.toLowerCase().includes(query);
        if (!matchesName && !matchesAddress && !matchesDistrict) {
          return false;
        }
      }

      // 2. Filter by max distance
      if (hospital.distance > distanceLimit) {
        return false;
      }

      // 3. Filter by selected blood group & component
      if (selectedGroup) {
        const groupStocks = hospital.stocks[selectedGroup];
        if (!groupStocks || groupStocks.length === 0) {
          return false; // Alka stock represents completely depleted context
        }
        
        if (selectedComponent !== 'All') {
          const hasComponent = groupStocks.some(st => st.component === selectedComponent && st.units > 0);
          if (!hasComponent) return false;
        } else {
          // Verify if there is some quantity greater than 0
          const hasAnyUnits = groupStocks.some(st => st.units > 0);
          if (!hasAnyUnits) return false;
        }
      }

      return true;
    });
  }, [hospitals, searchQuery, distanceLimit, selectedGroup, selectedComponent]);

  return (
    <div className="space-y-6 animate-fade-in pb-16">
      
      {/* Search Header Banner */}
      <section className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="font-sans text-2xl font-extrabold text-gray-900">Inventory Search</h2>
          <p className="text-sm text-gray-500 font-semibold">
            Finding real-time blood components and matching hospital networks in Nepal.
          </p>
        </div>
        <div className="flex items-center gap-1.5 text-[#D32F2F] font-bold text-xs bg-red-50 px-3 py-1.5 rounded-xl border border-red-100">
          <MapPin className="w-4.5 h-4.5" />
          <span>Kathmandu Valley Grid</span>
        </div>
      </section>

      {/* Filter Control Board */}
      <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm space-y-4">
        <div className="flex items-center gap-2 text-slate-850 border-b border-gray-150 pb-2">
          <SlidersHorizontal className="w-4 h-4 text-[#D32F2F]" />
          <span className="text-xs font-bold uppercase tracking-wider text-gray-700">Dynamic Parameters</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
          {/* Blood group */}
          <div className="flex flex-col gap-1">
            <label className="text-xs font-bold text-gray-500 px-1">Blood Group</label>
            <select
              value={selectedGroup}
              onChange={(e) => setSelectedGroup(e.target.value as BloodGroup | '')}
              className="w-full h-11 px-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-900 focus:border-[#D32F2F] focus:ring-1 focus:ring-[#D32F2F] outline-none text-xs font-semibold transition cursor-pointer"
            >
              <option value="">All Blood Groups</option>
              {groupsList.map(g => (
                <option key={g} value={g}>{g}</option>
              ))}
            </select>
          </div>

          {/* Component */}
          <div className="flex flex-col gap-1">
            <label className="text-xs font-bold text-gray-500 px-1">Component Type</label>
            <select
              value={selectedComponent}
              onChange={(e) => setSelectedComponent(e.target.value as ComponentType | 'All')}
              className="w-full h-11 px-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-900 focus:border-[#D32F2F] focus:ring-1 focus:ring-[#D32F2F] outline-none text-xs font-semibold transition cursor-pointer"
            >
              <option value="All">All Component Types</option>
              {componentsList.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          {/* Distance */}
          <div className="flex flex-col gap-1">
            <label className="text-xs font-bold text-gray-500 px-1">Max Distance</label>
            <select
              value={distanceLimit}
              onChange={(e) => setDistanceLimit(Number(e.target.value))}
              className="w-full h-11 px-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-900 focus:border-[#D32F2F] focus:ring-1 focus:ring-[#D32F2F] outline-none text-xs font-semibold transition cursor-pointer"
            >
              <option value={5}>Within 5 km</option>
              <option value={10}>Within 10 km</option>
              <option value={20}>Within 20 km</option>
              <option value={100}>Anywhere in Nepal</option>
            </select>
          </div>

          {/* Text Search Inputs */}
          <div className="flex flex-col gap-1">
            <label className="text-xs font-bold text-gray-500 px-1">Filter by City/Name</label>
            <div className="relative">
              <Search className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search hospital or city..."
                className="w-full h-11 pl-9 pr-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-900 focus:border-[#D32F2F] focus:ring-1 focus:ring-[#D32F2F] outline-none text-xs font-semibold transition"
              />
            </div>
          </div>
        </div>

        {/* Selected group info or reset options */}
        {(selectedGroup || selectedComponent !== 'All' || searchQuery) && (
          <div className="flex items-between justify-between pt-1 text-xs">
            <span className="text-gray-400 font-bold font-mono">
              Found {filteredHospitals.length} matching institutional stores
            </span>
            <button
              onClick={() => {
                setSelectedGroup('');
                setSelectedComponent('All');
                setSearchQuery('');
                setDistanceLimit(30);
              }}
              className="text-[#D32F2F] font-bold hover:underline cursor-pointer"
            >
              Clear All Filters
            </button>
          </div>
        )}
      </div>

      {/* Hospitals Grid */}
      {filteredHospitals.length === 0 ? (
        <div className="bg-slate-50 py-12 px-4 rounded-2xl text-center border border-dashed border-gray-300 max-w-lg mx-auto space-y-4">
          <HelpCircle className="w-12 h-12 text-gray-300 mx-auto" />
          <div className="space-y-1">
            <p className="font-bold text-gray-900 text-base">No Matching Stocks Found</p>
            <p className="text-xs text-gray-500 font-semibold max-w-xs mx-auto">
              We couldn't locate any certified laboratory with these exact filters currently in our Kathmandu central database index.
            </p>
          </div>
          <button
            onClick={() => {
              setSelectedGroup('');
              setSelectedComponent('All');
              setSearchQuery('');
            }}
            className="text-xs font-bold text-white bg-[#D32F2F] hover:bg-[#b71c1c] px-4 py-2.5 rounded-lg transition shadow-sm shadow-red-100 cursor-pointer"
          >
            Show All Laboratories
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredHospitals.map(hospital => {
            // Determine stock level status
            let isDepleted = true;
            let isCritical = false;
            let isLow = false;

            // Iterate over all stocks values
            const allStockList: BloodStock[] = (Object.values(hospital.stocks).filter(Boolean) as BloodStock[][]).flat();
            if (allStockList.length > 0) {
              isDepleted = false;
              isCritical = allStockList.some(item => item.status === 'Critical' && item.units === 0);
              isLow = allStockList.some(item => item.status === 'Low' || (item.units > 0 && item.units < 5));
            } else {
              isDepleted = true;
            }

            return (
              <article 
                key={hospital.id} 
                className="bg-white rounded-2xl border border-gray-200 overflow-hidden flex flex-col hover:shadow-md transition-all duration-300 relative group"
              >
                {/* Hospital Card Exterior Image Representative */}
                <div className="relative h-44 overflow-hidden bg-slate-100">
                  <img
                    alt={hospital.name}
                    className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                    src={hospital.overviewImage}
                  />
                  {/* Stock status indicator pill */}
                  <div className="absolute top-3 right-3">
                    {isDepleted ? (
                      <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-rose-50 text-rose-700 border border-rose-200">
                        <span className="w-2 h-2 rounded-full bg-rose-600" />
                        Out of Stock
                      </span>
                    ) : isCritical ? (
                      <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200">
                        <span className="w-2 h-2 rounded-full bg-amber-500" />
                        Critical Stock
                      </span>
                    ) : (
                      <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        <span className="w-2 h-2 rounded-full bg-emerald-600" />
                        In Stock
                      </span>
                    )}
                  </div>
                </div>

                {/* Card Content parameters */}
                <div className="p-5 flex flex-col flex-1 justify-between space-y-4">
                  <div className="space-y-1">
                    <div className="flex justify-between items-start gap-2">
                      <h3 className="font-sans text-base font-bold text-gray-900 leading-snug hover:text-[#D32F2F] cursor-pointer" onClick={() => onSelectHospital(hospital.id)}>
                        {hospital.name}
                      </h3>
                      <span className="font-mono text-[10px] font-bold text-[#1976D2] whitespace-nowrap bg-blue-50 border border-blue-100 px-2 py-0.5 rounded">
                        {hospital.distance} km
                      </span>
                    </div>

                    <p className="text-xs text-gray-500 font-semibold">
                      {hospital.address}
                    </p>

                    <div className="flex items-center gap-1.5 text-gray-400 text-[11px] pt-1.5 font-semibold">
                      <History className="w-3.5 h-3.5" />
                      <span>Updated {hospital.updatedMinutesAgo} mins ago</span>
                    </div>
                  </div>

                  {/* Summary of blood availability */}
                  <div className="pt-2 border-t border-gray-100">
                    <span className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">
                      Key Stocks Available
                    </span>

                    {Object.keys(hospital.stocks).length === 0 || allStockList.length === 0 ? (
                      <div className="p-2 bg-rose-50 rounded-lg text-center">
                        <p className="text-xs text-[#D32F2F] font-semibold italic">
                          Depleted. Fresh replenishment in progress.
                        </p>
                      </div>
                    ) : (
                      <div className="flex gap-2 overflow-x-auto pb-1.5 scrollbar-thin">
                        {(Object.keys(hospital.stocks) as BloodGroup[]).map(group => {
                          const items = hospital.stocks[group] || [];
                          const totalUnits = items.reduce((sum, item) => sum + item.units, 0);
                          if (totalUnits === 0) return null;

                          return (
                            <div 
                              key={group} 
                              className="flex-shrink-0 bg-gray-50 border border-gray-100 p-2 rounded-lg text-center min-w-[55px] font-sans"
                            >
                              <span className="block text-[10px] font-bold text-gray-650">{group}</span>
                              <span className="block text-sm font-extrabold text-[#D32F2F] font-mono leading-tight">
                                {String(totalUnits).padStart(2, '0')}u
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>

                  {/* Detail CTAs */}
                  <div className="pt-2">
                    <button
                      onClick={() => onSelectHospital(hospital.id)}
                      className="w-full h-11 border-2 border-[#1976D2] hover:bg-blue-50 text-[#1976D2] rounded-lg font-bold text-xs transition duration-150 flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      View Detail
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

              </article>
            );
          })}

          {/* Dash Add Hospital widget */}
          <button 
            onClick={onRequestNewLocation}
            className="bg-slate-50 border-2 border-dashed border-gray-350 rounded-3xl flex flex-col items-center justify-center p-6 text-center hover:bg-red-50/10 hover:border-[#D32F2F]/40 transition duration-300 group cursor-pointer"
          >
            <div className="w-12 h-12 rounded-full bg-slate-200 group-hover:bg-red-50 flex items-center justify-center mb-3 transition">
              <Plus className="w-6 h-6 text-gray-500 group-hover:text-[#D32F2F]" />
            </div>
            <span className="font-sans text-sm font-bold text-gray-900 group-hover:text-[#D32F2F]">
              Can't find a hospital?
            </span>
            <span className="text-xs text-gray-500 font-semibold max-w-xs mt-1.5 leading-relaxed">
              Request inventory data coverage, setup interfaces, or sync records for a new clinical location in Nepal.
            </span>
          </button>
        </div>
      )}

    </div>
  );
};

