import React from 'react';
import { Droplet, Bell } from 'lucide-react';

interface HeaderProps {
  notificationsCount: number;
  onNotificationsClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ notificationsCount, onNotificationsClick }) => {
  return (
    <header className="sticky top-0 left-0 w-full z-45 flex justify-between items-center px-4 h-14 bg-white border-b border-gray-150 shadow-xs transition-colors duration-200">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-[#D32F2F] rounded-lg flex items-center justify-center">
          <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
          </svg>
        </div>
        <h1 className="text-sm font-bold tracking-tight uppercase text-[#D32F2F]">
          VitalTrack <span className="text-gray-400 font-medium capitalize ml-0.5">Nepal</span>
        </h1>
      </div>
      
      <div className="flex items-center gap-3">
        <span className="flex items-center text-[10px] font-semibold text-[#388E3C] bg-green-50 px-2 py-0.5 rounded-full">
          <span className="w-1.5 h-1.5 bg-[#388E3C] rounded-full mr-1 animate-pulse" />
          Live
        </span>
        
        <button 
          onClick={onNotificationsClick}
          className="relative p-1.5 text-gray-500 hover:bg-gray-100 rounded-full transition-colors duration-150 focus:outline-none cursor-pointer"
          title="Notifications"
        >
          <Bell className="w-4.5 h-4.5 text-gray-600" />
          {notificationsCount > 0 && (
            <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-[#D32F2F] text-white text-[9px] rounded-full flex items-center justify-center font-bold">
              {notificationsCount}
            </span>
          )}
        </button>
      </div>
    </header>
  );
};

