import React from 'react';
import { Heart, MessageCircle, Share2 } from 'lucide-react';

interface BlogStatsProps {
  likes?: number;
  comments?: number;
}

export default function BlogStats({ likes = 24, comments = 12 }: BlogStatsProps) {
  return (
    <div className="flex justify-between items-center pt-4 border-t">
      <button className="flex items-center text-gray-600 hover:text-orange-600">
        <Heart className="h-5 w-5 mr-1" />
        <span>{likes}</span>
      </button>
      <button className="flex items-center text-gray-600 hover:text-orange-600">
        <MessageCircle className="h-5 w-5 mr-1" />
        <span>{comments}</span>
      </button>
      <button className="flex items-center text-gray-600 hover:text-orange-600">
        <Share2 className="h-5 w-5 mr-1" />
        <span>Share</span>
      </button>
    </div>
  );
}