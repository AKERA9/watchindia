
export interface User {
  id: string;
  username: string;
  avatarUrl: string;
}

export interface Comment {
  id: string;
  user: User;
  text: string;
}

export interface Video {
  id: string;
  url: string;
  thumbnailUrl: string;
  title: string;
  uploader: User;
  description: string;
  likes: number;
  comments: Comment[];
  isLiked?: boolean;
  duration: number; // in seconds
  views: number;
}