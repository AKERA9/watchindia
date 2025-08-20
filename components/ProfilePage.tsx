import React from 'react';
import { Icon } from './Icon';

export const ProfilePage: React.FC = () => {
  return (
    <div className="h-full w-full flex flex-col items-center justify-center text-gray-400 bg-gray-900/50 px-4 pt-20 pb-24">
      <Icon name="profile" className="h-16 w-16 mb-4" />
      <h2 className="text-2xl font-bold text-white">Profile Page</h2>
      <p>This section is under construction.</p>
    </div>
  );
};