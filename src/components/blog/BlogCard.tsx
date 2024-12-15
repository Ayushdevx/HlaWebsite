import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, MessageCircle, Share2, Download, Bookmark, MoreVertical } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../ui/Button';
import ShareModal from './ShareModal';
import CommentSection from './CommentSection';

interface BlogCardProps {
  id?: string;
  title: string;
  author: string;
  excerpt: string;
  image: string;
  likes?: number;
  comments?: number;
  content?: string;
}

export default function BlogCard({ 
  id = '1',
  title, 
  author, 
  excerpt, 
  image,
  likes = 0,
  comments = 0,
  content
}: BlogCardProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(likes);
  const [showComments, setShowComments] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikesCount(prev => isLiked ? prev - 1 : prev + 1);
  };

  const handleDownload = () => {
    const element = document.createElement('a');
    const file = new Blob([content || excerpt], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `${title}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-white/80 backdrop-blur-sm rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all"
    >
      <Link to={`/blogs/${id}`}>
        <img src={image} alt={title} className="w-full h-48 object-cover" />
      </Link>
      
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <Link to={`/blogs/${id}`}>
              <h3 className="text-xl font-semibold mb-2 hover:text-orange-600 transition-colors">
                {title}
              </h3>
            </Link>
            <p className="text-gray-600 text-sm">By {author}</p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsBookmarked(!isBookmarked)}
            className={isBookmarked ? 'text-orange-600' : ''}
          >
            <Bookmark className="h-4 w-4" />
          </Button>
        </div>

        <p className="text-gray-700 mb-4">{excerpt}</p>
        
        <div className="flex justify-between items-center pt-4 border-t">
          <Button
            variant="outline"
            size="sm"
            onClick={handleLike}
            className={isLiked ? 'text-red-500' : ''}
          >
            <Heart className="h-4 w-4 mr-1" fill={isLiked ? 'currentColor' : 'none'} />
            <span>{likesCount}</span>
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowComments(!showComments)}
          >
            <MessageCircle className="h-4 w-4 mr-1" />
            <span>{comments}</span>
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowShareModal(true)}
          >
            <Share2 className="h-4 w-4 mr-1" />
            <span>Share</span>
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={handleDownload}
          >
            <Download className="h-4 w-4" />
          </Button>
        </div>

        {showComments && (
          <CommentSection blogId={id} comments={comments} />
        )}
      </div>

      {showShareModal && (
        <ShareModal
          url={`/blogs/${id}`}
          title={title}
          onClose={() => setShowShareModal(false)}
        />
      )}
    </motion.div>
  );
}