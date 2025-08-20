import React, { useState } from 'react';
import type { Video, Comment } from '../types';
import { Icon } from './Icon';

interface CommentsModalProps {
  video: Video | null;
  onClose: () => void;
  onAddComment: (videoId: string, commentText: string) => void;
}

export const CommentsModal: React.FC<CommentsModalProps> = ({ video, onClose, onAddComment }) => {
  const [newComment, setNewComment] = useState('');

  if (!video) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim()) {
      onAddComment(video.id, newComment.trim());
      setNewComment('');
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black/50 z-40"
      onClick={onClose}
    >
      <div 
        className="fixed bottom-0 left-0 right-0 h-[60vh] bg-gray-900 rounded-t-2xl shadow-lg border-t border-gray-700 p-4 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="text-center mb-4 flex-shrink-0">
          <button onClick={onClose} className="absolute top-4 left-4 text-gray-400 hover:text-white">
            <Icon name="close" className="h-6 w-6" />
          </button>
          <h3 className="font-bold text-lg">{video.comments.length} Comments</h3>
        </div>

        <div className="overflow-y-auto flex-grow space-y-4 pr-2">
          {video.comments.length === 0 ? (
            <p className="text-gray-400 text-center pt-8">Be the first to comment.</p>
          ) : (
            video.comments.map((comment) => (
              <div key={comment.id} className="flex items-start gap-3">
                <img src={comment.user.avatarUrl} alt={comment.user.username} className="w-9 h-9 rounded-full" />
                <div>
                  <p className="font-semibold text-sm text-gray-300">{comment.user.username}</p>
                  <p className="text-white">{comment.text}</p>
                </div>
              </div>
            ))
          )}
        </div>

        <form onSubmit={handleSubmit} className="mt-4 border-t border-gray-700 pt-4 flex gap-3 flex-shrink-0">
          <input
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add a comment..."
            className="flex-grow bg-gray-800 border border-gray-700 rounded-full py-2 px-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
          />
          <button type="submit" disabled={!newComment.trim()} className="bg-red-600 text-white font-semibold py-2 px-4 rounded-full disabled:bg-gray-600 disabled:cursor-not-allowed">
            Post
          </button>
        </form>
      </div>
    </div>
  );
};