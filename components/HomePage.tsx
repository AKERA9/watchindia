import React from 'react';
import type { Video } from '../types';
import { VideoCard } from './VideoCard';

interface HomePageProps {
  videos: Video[];
}

export const HomePage: React.FC<HomePageProps> = ({ videos }) => {
  if (videos.length === 0) {
    return (
      <div className="h-full w-full flex items-center justify-center text-gray-400 pt-20">
        <p>No videos found. Try a different search!</p>
      </div>
    );
  }

  return (
    <div className="pt-20 pb-24 px-4 h-full overflow-y-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-8">
        {videos.map(video => (
          <VideoCard key={video.id} video={video} />
        ))}
      </div>
    </div>
  );
};
