import React, { useState } from 'react';
import { 
  ChevronRight, MapPin, CheckCircle2, Phone, Compass, ArrowLeft, 
  Clock, Info, Mail, Calendar, HeartHandshake, ShieldAlert, Check 
} from 'lucide-react';
import { Hospital, BloodGroup, ComponentType, DonorBooking } from '../types';

interface HospitalDetailScreenProps {
  hospital: Hospital;
  onBack: () => void;
  onBookSlot: (booking: Omit<DonorBooking, 'id' | 'hospitalName'>) => void;
}

export const HospitalDetailScreen: React.FC<HospitalDetailScreenProps> = ({
  hospital,
  onBack,
  onBookSlot,
}) => {
  const [donorName, setDonorName] = useState('');
  const [donorPhone, setDonorPhone] = useState('');
  const [bloodGroup, setBloodGroup] = useState<BloodGroup>('O-');
  const [selectedDate, setSelectedDate] = useState('2026-06-08');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('09:00 - 10:00 AM');
  const [isBookingSuccess, setIsBookingSuccess] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  const keyGroups: BloodGroup[] = ['A+', 'O-', 'B+', 'AB-'];

  const timeSlots = [
    '09:00 - 10:00 AM',
    '10:30 - 11:30 AM',
    '01:00 - 02:00 PM',
    '03:00 - 04:00 PM'
  ];

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!donorName.trim() || !donorPhone.trim()) return;

    onBookSlot({
      hospitalId: hospital.id,
      donorName,
      donorPhone,
      bloodGroup,
      date: selectedDate,
      timeSlot: selectedTimeSlot
    });

    setIsBookingSuccess(true);
    setTimeout(() => {
      setIsBookingSuccess(false);
      setIsBookingOpen(false);
      setDonorName('');
      setDonorPhone('');
    }, 2500);
  };

  return (
    <div className="space-y-6 animate-fade-in pb-16">
      
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-xs font-bold text-gray-500">
        <button onClick={onBack} className="hover:text-[#D32F2F] transition cursor-pointer flex items-center gap-1">
          <ArrowLeft className="w-3.5 h-3.5" />
          Hospitals
        </button>
        <ChevronRight className="w-3 h-3 text-slate-400" />
        <span className="text-gray-900 truncate max-w-xs">{hospital.name}</span>
      </nav>

      {/* Hero Location Banner overlay */}
      <div className="relative rounded-2xl overflow-hidden h-64 md:h-80 bg-slate-900 border border-gray-200">
        {/* Grayscale Map texture overlay background */}
        <img 
          alt="Kathmandu Map Location" 
          className="absolute inset-0 w-full h-full object-cover grayscale opacity-45 pointer-events-none"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuD3JX4PgSxdNUa0S5xmW4t4hozHClIBI_qLNE0QpNxI_CIVo_oQ3GtmPnOCyxX7KjwnSFIcghYTSiOOmnrVDAm8EEZTMf6mkiGj_NRpTo_VtMpe3RXKwTTyKsm8HwvYemw37CH3-K-uyCJpivcp4N4fKDoekiqNznz8F5yTXtacYHoaYel3vSofCeTO7nX2bn_0tJkJQOAwUFpCro4rlAhk-270lobIr-7YyPD_FrOF0o-3YRNwGv--EYmJXqMbKA0NQBPzdCGklg"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/60 to-transparent" />

        {/* Info panel atop map layer */}
        <div className="absolute bottom-0 left-0 w-full p-6 text-white flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <h2 className="font-sans text-xl md:text-2xl lg:text-3xl font-extrabold tracking-tight">
              {hospital.name}
            </h2>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-gray-300">
              <span className="flex items-center gap-1 text-slate-200 font-semibold">
                <MapPin className="w-3.5 h-3.5 text-[#D32F2F]" />
                {hospital.address}
              </span>
              <span className="inline-flex items-center gap-1 text-emerald-400 font-bold">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-450 fill-emerald-450/20" />
                Open 24/7 (Emergency)
              </span>
            </div>
          </div>

          <div className="flex gap-3">
            <a 
              href={`tel:${hospital.phone}`}
              className="px-5 h-11 bg-[#D32F2F] hover:bg-[#b71c1c] text-white rounded-xl shadow-md shadow-red-900/10 font-bold text-xs flex items-center justify-center gap-1.5 transition active:scale-95 cursor-pointer"
            >
              <Phone className="w-3.5 h-3.5" />
              Call Hospital
            </a>
            <a 
              href="https://maps.google.com" 
              target="_blank" 
              rel="noreferrer"
              className="px-5 h-11 border border-gray-400 hover:bg-white/10 text-white rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition cursor-pointer"
            >
              <Compass className="w-3.5 h-3.5" />
              Directions
            </a>
          </div>
        </div>
      </div>

      {/* Main detail distribution layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Side: Stock Grid & tables */}
        <div className="lg:col-span-8 space-y-6">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-gray-200">
            <h3 className="font-sans text-base font-bold text-gray-900">Certified Blood Component Inventory</h3>
            <div className="flex flex-wrap gap-2 text-[10px] font-bold">
              <span className="flex items-center gap-1 px-2.5 py-0.5 bg-red-50 text-[#D32F2F] rounded border border-red-100">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D32F2F]" />
                Critical (0-1u)
              </span>
              <span className="flex items-center gap-1 px-2.5 py-0.5 bg-amber-50 text-amber-700 rounded border border-amber-200">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-550" />
                Low (2-5u)
              </span>
              <span className="flex items-center gap-1 px-2.5 py-0.5 bg-emerald-50 text-emerald-700 rounded border border-emerald-150">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                Stable (6u+)
              </span>
            </div>
          </div>

          {/* Bento grids showing matching keys */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {keyGroups.map(group => {
              const items = hospital.stocks[group] || [];
              const wholeBlood = items.find(i => i.component === 'Whole Blood');
              const platelets = items.find(i => i.component === 'Platelets');
              const plasma = items.find(i => i.component === 'Plasma');

              // Compute overall status flag
              const maxUnits = Math.max(wholeBlood?.units || 0, platelets?.units || 0);
              let statusLabel = 'Stable';
              let badgeColor = 'bg-[#388E3C] text-white';
              let borderColor = 'border-gray-200';

              if (items.length === 0 || maxUnits === 0) {
                statusLabel = 'Critical';
                badgeColor = 'bg-[#D32F2F] text-white';
                borderColor = 'border-2 border-red-200 shadow-sm bg-red-50/10';
              } else if (maxUnits < 4) {
                statusLabel = 'Low';
                badgeColor = 'bg-amber-500 text-white';
              }

              return (
                <div 
                  key={group} 
                  className={`bg-white border rounded-2xl p-4.5 space-y-3.5 hover:shadow-sm transition ${borderColor}`}
                >
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-extrabold text-[#D32F2F]">{group}</span>
                    <span className={`px-2 py-0.5 text-[9px] rounded font-extrabold uppercase ${badgeColor}`}>
                      {statusLabel}
                    </span>
                  </div>

                  {/* Component bars matching screenshot specification */}
                  <div className="space-y-3 font-sans text-xs">
                    {/* Part A: Whole Blood bar */}
                    <div className="space-y-1">
                      <div className="flex justify-between text-gray-500 font-bold text-[11px]">
                        <span>Whole Blood</span>
                        <span className="font-semibold text-gray-800">{wholeBlood ? `${wholeBlood.units} Units` : '0 Units'}</span>
                      </div>
                      <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full transition-all duration-300 ${
                            !wholeBlood || wholeBlood.units === 0 ? 'bg-[#D32F2F] w-[5%]' : 
                            wholeBlood.units < 5 ? 'bg-amber-500 w-[35%]' : 'bg-[#388E3C] w-[70%]'
                          }`}
                        />
                      </div>
                    </div>

                    {/* Part B: Platelets bar */}
                    <div className="space-y-1">
                      <div className="flex justify-between text-gray-500 font-bold text-[11px]">
                        <span>Platelets</span>
                        <span className="font-semibold text-gray-800">{platelets ? `${platelets.units} Units` : '0 Units'}</span>
                      </div>
                      <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full transition-all duration-300 ${
                            !platelets || platelets.units === 0 ? 'bg-[#D32F2F] w-[5%]' : 
                            platelets.units < 4 ? 'bg-amber-500 w-[20%]' : 'bg-[#388E3C] w-[45%]'
                          }`}
                        />
                      </div>
                    </div>

                    {/* Plasma extra lines if exists */}
                    {plasma && (
                      <div className="flex justify-between text-gray-500 text-[11px] font-bold pt-1 border-t border-dashed border-gray-250">
                        <span>FFP (Plasma)</span>
                        <span className="font-semibold text-gray-800">{plasma.units} Units</span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Web Expanded Data Table */}
          <div className="overflow-hidden border border-gray-200 rounded-2xl bg-white shadow-sm">
            <div className="p-4 bg-gray-50 border-b border-gray-200">
              <span className="text-xs font-bold text-gray-750 uppercase tracking-wider block">
                Deep Lab Components Spreadsheet — Central Transit Network
              </span>
            </div>
            <table className="w-full text-left border-collapse font-sans">
              <thead className="bg-[#f3f4f5] font-bold text-xs text-gray-650">
                <tr>
                  <th className="p-3 border-b border-gray-200">Component Name</th>
                  <th className="p-3 border-b border-gray-200 text-center">Type A</th>
                  <th className="p-3 border-b border-gray-200 text-center">Type B</th>
                  <th className="p-3 border-b border-gray-200 text-center">Type O</th>
                  <th className="p-3 border-b border-gray-200 text-center">Type AB</th>
                </tr>
              </thead>
              <tbody className="text-xs text-gray-900 divide-y divide-slate-100 font-medium font-semibold">
                <tr className="hover:bg-slate-50">
                  <td className="p-3 font-semibold text-gray-800">Fresh Frozen Plasma (FFP)</td>
                  <td className="p-3 text-center text-[#388E3C] font-bold">24 Units</td>
                  <td className="p-3 text-center text-[#D32F2F] font-bold">02 Units (Low)</td>
                  <td className="p-3 text-center">18 Units</td>
                  <td className="p-3 text-center">05 Units</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="p-3 font-semibold text-gray-800">Cryoprecipitate</td>
                  <td className="p-3 text-center">10 Units</td>
                  <td className="p-3 text-center">08 Units</td>
                  <td className="p-3 text-center">12 Units</td>
                  <td className="p-3 text-center text-amber-600 font-bold">02 Units (Low)</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="p-3 font-semibold text-gray-800">Packed Red Cells (PRCB)</td>
                  <td className="p-3 text-center">15 Units</td>
                  <td className="p-3 text-center">20 Units</td>
                  <td className="p-3 text-center text-[#388E3C] font-bold">35 Units</td>
                  <td className="p-3 text-center text-[#D32F2F] font-bold font-mono">01 Unit (Critical)</td>
                </tr>
              </tbody>
            </table>
          </div>

        </div>

        {/* Right Side: Operations Sidebar */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Operating hours list */}
          <div className="bg-white border border-gray-200 rounded-2xl p-5.5 space-y-4 shadow-sm">
            <div className="flex items-center gap-1.5 border-b border-gray-150 pb-2 text-gray-700">
              <Clock className="w-4 h-4 text-[#D32F2F]" />
              <h4 className="font-sans text-sm font-bold uppercase tracking-wider">Operating Lines</h4>
            </div>

            <ul className="space-y-3 text-xs leading-none">
              <li className="flex justify-between items-center py-1 font-semibold">
                <span className="text-gray-500 font-semibold">Emergency Room</span>
                <span className="font-extrabold text-[#388E3C]">24 Hours</span>
              </li>
              <li className="flex justify-between items-center py-1 font-semibold">
                <span className="text-gray-500 font-semibold">Blood Bank Desk</span>
                <span className="font-bold text-gray-900">{hospital.hours.desk}</span>
              </li>
              <li className="flex justify-between items-center py-1 font-semibold">
                <span className="text-gray-500 font-semibold">Donation Center Desk</span>
                <span className="font-bold text-gray-900">{hospital.hours.donation}</span>
              </li>
            </ul>

            <div className="bg-gray-50 p-3.5 rounded-xl flex items-start gap-2.5 border border-gray-100">
              <Info className="w-4 h-4 text-[#D32F2F] shrink-0 mt-0.5" />
              <p className="text-[11px] text-gray-500 font-semibold leading-relaxed">
                Stocks are updated manually inside local laboratory terminals. For life-threatening situations, call directly to confirm before transport mobilization.
              </p>
            </div>
          </div>

          {/* Contact Details module */}
          <div className="bg-white border border-gray-200 rounded-2xl p-5.5 space-y-4 shadow-sm">
            <h4 className="font-sans text-sm font-bold uppercase tracking-wider text-gray-700 border-b border-gray-150 pb-2">
              Contact Liaison
            </h4>

            <div className="space-y-3 text-xs">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-[#D32F2F]">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[9px] uppercase font-bold text-gray-400">Direct Lab Desk</p>
                  <a href={`tel:${hospital.phone}`} className="font-bold hover:underline text-gray-950">{hospital.phone}</a>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-[#D32F2F]">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[9px] uppercase font-bold text-gray-400">Official Email</p>
                  <a href={`mailto:${hospital.email}`} className="font-bold hover:underline text-gray-950">{hospital.email}</a>
                </div>
              </div>
            </div>
          </div>

          {/* Book Donation form block */}
          <div className="bg-gradient-to-br from-[#D32F2F] to-red-800 text-white rounded-2xl p-6 shadow-sm relative overflow-hidden group">
            
            {/* Ambient visual watermark mockup and graphics */}
            <div className="absolute -bottom-6 -right-6 text-white/10 select-none group-hover:scale-105 transition-transform duration-500">
              <HeartHandshake className="w-36 h-36" />
            </div>

            <div className="relative z-10 space-y-4">
              <h4 className="font-sans text-lg font-bold">Donate Here</h4>
              <p className="text-xs text-red-150 leading-relaxed max-w-xs font-semibold">
                Schedule your voluntary replacement donation slot at this hospital to support live regional stock reserves.
              </p>

              {isBookingOpen ? (
                <form onSubmit={handleBookingSubmit} className="bg-white/10 p-3.5 rounded-xl border border-white/25 space-y-3.5">
                  {isBookingSuccess ? (
                    <div className="p-4 text-center space-y-2 text-white">
                      <div className="w-10 h-10 bg-green-500 text-white rounded-full flex items-center justify-center mx-auto">
                        <Check className="w-5 h-5 stroke-[3]" />
                      </div>
                      <p className="text-xs font-bold">Booking Slot Saved!</p>
                      <p className="text-[10px] text-red-100">Preparatory guidelines dispatched to phone.</p>
                    </div>
                  ) : (
                    <>
                      <div className="space-y-1">
                        <label className="block text-[9px] font-bold uppercase tracking-wider text-red-200">Donor Name</label>
                        <input 
                          type="text" 
                          required 
                          value={donorName}
                          onChange={(e) => setDonorName(e.target.value)}
                          placeholder="Your complete name" 
                          className="w-full h-8 px-2.5 rounded bg-white/20 text-white border-none outline-none focus:bg-white/30 text-xs placeholder-white/50 font-semibold"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="block text-[9px] font-bold uppercase tracking-wider text-red-200">Phone Code</label>
                        <input 
                          type="text" 
                          required 
                          value={donorPhone}
                          onChange={(e) => setDonorPhone(e.target.value)}
                          placeholder="e.g. 9812345678" 
                          className="w-full h-8 px-2.5 rounded bg-white/20 text-white border-none outline-none focus:bg-white/30 text-xs placeholder-white/50 font-semibold"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <div className="space-y-1">
                          <label className="block text-[9px] font-bold uppercase tracking-wider text-red-200">Blood Group</label>
                          <select 
                            value={bloodGroup}
                            onChange={(e) => setBloodGroup(e.target.value as BloodGroup)}
                            className="w-full h-8 px-1 rounded bg-[#D32F2F] text-white border-none outline-none text-xs font-semibold cursor-pointer"
                          >
                            <option value="A+">A+</option>
                            <option value="B+">B+</option>
                            <option value="O+">O+</option>
                            <option value="AB+">AB+</option>
                            <option value="O-">O-</option>
                            <option value="AB-">AB-</option>
                          </select>
                        </div>
                        <div className="space-y-1">
                          <label className="block text-[9px] font-bold uppercase tracking-wider text-red-200">Preferred Slot</label>
                          <select 
                            value={selectedTimeSlot}
                            onChange={(e) => setSelectedTimeSlot(e.target.value)}
                            className="w-full h-8 px-1 rounded bg-[#D32F2F] text-white border-none outline-none text-xs font-semibold cursor-pointer"
                          >
                            {timeSlots.map(t => (
                              <option key={t} value={t}>{t}</option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div className="flex gap-2 pt-1.5">
                        <button 
                          type="button" 
                          onClick={() => setIsBookingOpen(false)}
                          className="flex-1 h-8 bg-transparent hover:bg-white/5 text-white border border-white/20 rounded text-[11px] transition font-bold cursor-pointer"
                        >
                          Cancel
                        </button>
                        <button 
                          type="submit" 
                          className="flex-1 h-8 bg-white hover:bg-red-50 text-[#D32F2F] rounded text-[11px] font-extrabold transition cursor-pointer"
                        >
                          Confirm
                        </button>
                      </div>
                    </>
                  )}
                </form>
              ) : (
                <button 
                  onClick={() => setIsBookingOpen(true)}
                  className="w-full h-11 bg-white hover:bg-red-50 text-[#D32F2F] rounded-xl font-bold text-xs transition duration-150 flex items-center justify-center gap-2 cursor-pointer shadow"
                >
                  Book Slot
                </button>
              )}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};

