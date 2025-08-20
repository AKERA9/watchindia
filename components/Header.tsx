import React from 'react';
import { Icon } from './Icon';

interface HeaderProps {
  onSearchChange: (query: string) => void;
  onUploadClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onSearchChange, onUploadClick }) => {
  return (
    <header className="absolute top-0 left-0 right-0 z-10 p-4 bg-gradient-to-b from-black/70 to-transparent">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 flex-shrink-0">
           <Icon name="logo" className="h-8 w-8 text-red-600" />
           <h1 className="text-2xl font-bold tracking-tighter hidden sm:block">WatchIndia</h1>
        </div>
        <div className="relative flex-1 max-w-xl mx-auto">
          <Icon name="search" className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search..."
            className="w-full bg-gray-800/50 border border-gray-700 rounded-full py-2 pl-10 pr-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all"
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
        <button
          onClick={onUploadClick}
          className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-full transition-transform duration-200 ease-in-out hover:scale-105 flex-shrink-0"
        >
          <Icon name="upload" className="h-5 w-5" />
          <span className="hidden md:inline">Create</span>
        </button>
      </div>
    </header>
  );
};