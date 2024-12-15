import React from 'react';
import { Heart, MessageCircle, Share2 } from 'lucide-react';

interface BlogCardProps {
  title: string;
  author: string;
  excerpt: string;
  image: string;
}

export default function BlogCard({ title, author, excerpt, image }: BlogCardProps) {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow">
      <img src={image} alt={title} className="w-full h-48 object-cover" />
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-600 text-sm mb-4">By {author}</p>
        <p className="text-gray-700 mb-4">{excerpt}</p>
        
        <div className="flex justify-between items-center pt-4 border-t">
          <button className="flex items-center text-gray-600 hover:text-orange-600">
            <Heart className="h-5 w-5 mr-1" />
            <span>24</span>
          </button>
          <button className="flex items-center text-gray-600 hover:text-orange-600">
            <MessageCircle className="h-5 w-5 mr-1" />
            <span>12</span>
          </button>
          <button className="flex items-center text-gray-600 hover:text-orange-600">
            <Share2 className="h-5 w-5 mr-1" />
            <span>Share</span>
          </button>
        </div>
      </div>
    </div>
  );
}