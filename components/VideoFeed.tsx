import React from 'react';
import type { Video } from '../types';
import { VideoPlayer } from './VideoPlayer';

interface VideoFeedProps {
  videos: Video[];
  onLikeToggle: (videoId: string) => void;
  onCommentClick: (videoId: string) => void;
}

export const VideoFeed: React.FC<VideoFeedProps> = ({ videos, onLikeToggle, onCommentClick }) => {
  if (videos.length === 0) {
    return (
      <div className="h-full w-full flex items-center justify-center text-gray-400">
        <p>No videos found. Try a different search!</p>
      </div>
    );
  }
  
  return (
    <div className="relative h-full w-full rounded-lg overflow-y-auto snap-y snap-mandatory">
      {videos.map((video) => (
        <VideoPlayer 
          key={video.id} 
          video={video} 
          onLikeToggle={onLikeToggle} 
          onCommentClick={onCommentClick} 
        />
      ))}
    </div>
  );
};