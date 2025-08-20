import React, { useState, useMemo } from 'react';
import { Header } from './components/Header';
import { VideoFeed } from './components/VideoFeed';
import { UploadModal } from './components/UploadModal';
import { CommentsModal } from './components/CommentsModal';
import { BottomNavBar } from './components/BottomNavBar';
import { ProfilePage } from './components/ProfilePage';
import { ChatsPage } from './components/ChatsPage';
import { HomePage } from './components/HomePage';
import { MOCK_VIDEOS, MOCK_USERS } from './constants';
import type { Video, Comment } from './types';

type ActiveTab = 'home' | 'shorts' | 'profile' | 'chats';

export default function App(): React.ReactNode {
  const [videos, setVideos] = useState<Video[]>(MOCK_VIDEOS);
  const [searchQuery, setSearchQuery] = useState('');
  const [isUploadModalOpen, setUploadModalOpen] = useState(false);
  const [commentingVideoId, setCommentingVideoId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<ActiveTab>('home');

  const shortsVideos = useMemo(() => videos.filter(v => v.duration <= 20), [videos]);
  const longVideos = useMemo(() => videos.filter(v => v.duration > 20), [videos]);

  const filteredShorts = useMemo(() => {
    if (!searchQuery) return shortsVideos;
    return shortsVideos.filter(video =>
      video.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      video.uploader.username.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [shortsVideos, searchQuery]);

  const filteredLongVideos = useMemo(() => {
    if (!searchQuery) return longVideos;
    return longVideos.filter(video =>
      video.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      video.uploader.username.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [longVideos, searchQuery]);

  const commentingVideo = useMemo(() => {
      return videos.find(v => v.id === commentingVideoId) || null;
  }, [videos, commentingVideoId]);

  const handleAddVideo = (newVideoData: { url: string; description: string; duration: number; title: string }) => {
    const randomUser = MOCK_USERS[Math.floor(Math.random() * MOCK_USERS.length)];
    const videoToAdd: Video = {
      id: `vid-${Date.now()}`,
      ...newVideoData,
      thumbnailUrl: `https://picsum.photos/seed/${Date.now()}/400/225`,
      uploader: randomUser,
      likes: 0,
      comments: [],
      views: 0,
      isLiked: false,
    };
    setVideos(prevVideos => [videoToAdd, ...prevVideos]);
    setUploadModalOpen(false);
    // Switch to the correct tab after upload
    setActiveTab(videoToAdd.duration <= 20 ? 'shorts' : 'home');
  };

  const handleLikeToggle = (videoId: string) => {
    setVideos(prevVideos =>
      prevVideos.map(video =>
        video.id === videoId
          ? { ...video, likes: video.isLiked ? video.likes - 1 : video.likes + 1, isLiked: !video.isLiked }
          : video
      )
    );
  };

  const handleOpenComments = (videoId: string) => {
      setCommentingVideoId(videoId);
  };

  const handleCloseComments = () => {
      setCommentingVideoId(null);
  };

  const handleAddComment = (videoId: string, commentText: string) => {
      const newComment: Comment = {
          id: `c-${Date.now()}`,
          text: commentText,
          user: MOCK_USERS[3] 
      };
      
      setVideos(prevVideos => 
          prevVideos.map(video => 
              video.id === videoId 
              ? { ...video, comments: [newComment, ...video.comments] }
              : video
          )
      );
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <HomePage videos={filteredLongVideos} />;
      case 'shorts':
        return (
          <VideoFeed 
              videos={filteredShorts} 
              onLikeToggle={handleLikeToggle}
              onCommentClick={handleOpenComments}
          />
        );
      case 'profile':
        return <ProfilePage />;
      case 'chats':
        return <ChatsPage />;
      default:
        return null;
    }
  };

  return (
    <div className="h-screen w-screen bg-black text-white font-sans overflow-hidden">
      {['home', 'shorts'].includes(activeTab) && (
        <Header
          onSearchChange={setSearchQuery}
          onUploadClick={() => setUploadModalOpen(true)}
        />
      )}
      <main className="h-full">
        {renderContent()}
      </main>
      <BottomNavBar activeTab={activeTab} onTabChange={setActiveTab} />
      
      {isUploadModalOpen && (
        <UploadModal
          onClose={() => setUploadModalOpen(false)}
          onAddVideo={handleAddVideo}
        />
      )}
      <CommentsModal
        video={commentingVideo}
        onClose={handleCloseComments}
        onAddComment={handleAddComment}
      />
    </div>
  );
}