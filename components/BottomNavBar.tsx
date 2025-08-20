import React from 'react';
import { Icon } from './Icon';

type Tab = 'home' | 'shorts' | 'profile' | 'chats';

interface BottomNavBarProps {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
}

const NavItem: React.FC<{
  name: Tab;
  label: string;
  icon: string;
  isActive: boolean;
  onClick: () => void;
}> = ({ name, label, icon, isActive, onClick }) => {
  const color = isActive ? 'text-white' : 'text-gray-400 hover:text-white';
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center justify-center w-full pt-2 pb-1 transition-colors ${color}`}
      aria-label={label}
    >
      <Icon name={icon} className="h-6 w-6 mb-1" />
      <span className="text-xs font-medium">{label}</span>
    </button>
  );
};

export const BottomNavBar: React.FC<BottomNavBarProps> = ({ activeTab, onTabChange }) => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-20 bg-black border-t border-gray-800">
      <div className="flex justify-around max-w-md mx-auto">
        <NavItem 
          name="home"
          label="Home"
          icon="home"
          isActive={activeTab === 'home'}
          onClick={() => onTabChange('home')}
        />
        <NavItem 
          name="shorts"
          label="Shorts"
          icon="shorts"
          isActive={activeTab === 'shorts'}
          onClick={() => onTabChange('shorts')}
        />
        <NavItem 
          name="profile"
          label="Profile"
          icon="profile"
          isActive={activeTab === 'profile'}
          onClick={() => onTabChange('profile')}
        />
        <NavItem 
          name="chats"
          label="Chats"
          icon="chat"
          isActive={activeTab === 'chats'}
          onClick={() => onTabChange('chats')}
        />
      </div>
    </nav>
  );
};