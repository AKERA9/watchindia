import React from 'react';
import type { Video } from '../types';

interface VideoCardProps {
  video: Video;
}

// Helper to format numbers (e.g., 1200 -> 1.2K)
const formatNumber = (num: number) => {
  if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
  if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
  return num.toString();
};

// Helper to format duration (e.g., 95 -> 1:35)
const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
}

export const VideoCard: React.FC<VideoCardProps> = ({ video }) => {
  return (
    <div className="flex flex-col gap-3 cursor-pointer group">
        <div className="relative aspect-video rounded-lg overflow-hidden shadow-lg">
            <img src={video.thumbnailUrl} alt={video.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
            <span className="absolute bottom-2 right-2 bg-black/80 text-white text-xs font-semibold px-1.5 py-0.5 rounded">
                {formatDuration(video.duration)}
            </span>
        </div>
        <div className="flex gap-3">
            <img src={video.uploader.avatarUrl} alt={video.uploader.username} className="w-9 h-9 rounded-full mt-1 flex-shrink-0" />
            <div>
                <h3 className="font-bold text-white text-base leading-snug break-words max-h-12 overflow-hidden">
                    {video.title}
                </h3>
                <p className="text-gray-400 text-sm mt-1">{video.uploader.username}</p>
                <p className="text-gray-400 text-sm">{formatNumber(video.views)} views</p>
            </div>
        </div>
    </div>
  );
};
