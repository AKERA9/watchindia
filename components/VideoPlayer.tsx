import React, { useState, useRef, useEffect } from 'react';
import type { Video } from '../types';
import { Icon } from './Icon';

interface VideoPlayerProps {
  video: Video;
  onLikeToggle: (videoId: string) => void;
  onCommentClick: (videoId: string) => void;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({ video, onLikeToggle, onCommentClick }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const togglePlay = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
            videoElement.play().catch(() => {}); // Autoplay might be blocked
            setIsPlaying(true);
        } else {
            videoElement.pause();
            setIsPlaying(false);
        }
      },
      { threshold: 0.5 } // 50% of the video must be visible to play
    );

    observer.observe(videoElement);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section className="relative h-screen w-full snap-start flex justify-center items-center bg-black">
      <video
        ref={videoRef}
        src={video.url}
        loop
        muted
        playsInline
        className="w-full h-full object-contain"
        onClick={togglePlay}
      ></video>
      
      {!isPlaying && (
         <div className="absolute inset-0 flex items-center justify-center bg-black/20 pointer-events-none">
            <Icon name="play" className="h-20 w-20 text-white/50" />
         </div>
      )}

      <div className="absolute bottom-0 left-0 right-0 p-4 pb-24 text-white bg-gradient-to-t from-black/60 to-transparent">
        <div className="flex items-end justify-between">
          <div className="flex-1 pr-10">
            <div className="flex items-center gap-3 mb-2">
              <img src={video.uploader.avatarUrl} alt={video.uploader.username} className="w-10 h-10 rounded-full border-2 border-white" />
              <p className="font-bold text-lg">{video.uploader.username}</p>
            </div>
            <p className="text-sm">{video.description}</p>
          </div>
          <div className="flex flex-col items-center gap-4">
            <button onClick={() => onLikeToggle(video.id)} className="flex flex-col items-center gap-1 text-white hover:text-red-500 transition-colors">
              <div className={`p-3 rounded-full bg-black/40 ${video.isLiked ? 'text-red-500' : 'text-white'}`}>
                 <Icon name="like" className="h-7 w-7" />
              </div>
              <span className="text-sm font-semibold">{video.likes}</span>
            </button>
            <button onClick={() => onCommentClick(video.id)} className="flex flex-col items-center gap-1 text-white">
               <div className="p-3 rounded-full bg-black/40">
                  <Icon name="comment" className="h-7 w-7" />
               </div>
              <span className="text-sm font-semibold">{video.comments.length}</span>
            </button>
            <button className="flex flex-col items-center gap-1 text-white">
               <div className="p-3 rounded-full bg-black/40">
                  <Icon name="share" className="h-7 w-7" />
               </div>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};