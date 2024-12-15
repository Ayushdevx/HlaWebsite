import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send } from 'lucide-react';
import Button from '../ui/Button';

interface Comment {
  id: string;
  author: string;
  content: string;
  timestamp: string;
}

interface CommentSectionProps {
  blogId: string;
  comments: number;
}

export default function CommentSection({ blogId, comments }: CommentSectionProps) {
  const [newComment, setNewComment] = useState('');
  const [commentsList, setCommentsList] = useState<Comment[]>([
    {
      id: '1',
      author: 'Amit Kumar',
      content: 'Great article! Very insightful.',
      timestamp: '2 hours ago'
    },
    {
      id: '2',
      author: 'Priya Singh',
      content: 'Thanks for sharing this knowledge.',
      timestamp: '1 day ago'
    }
  ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const comment: Comment = {
      id: Date.now().toString(),
      author: 'Current User', // TODO: Get from auth
      content: newComment,
      timestamp: 'Just now'
    };

    setCommentsList([comment, ...commentsList]);
    setNewComment('');
  };

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      className="mt-6 pt-4 border-t"
    >
      <h4 className="text-lg font-semibold mb-4">Comments ({commentsList.length})</h4>

      <form onSubmit={handleSubmit} className="mb-6">
        <div className="flex gap-2">
          <input
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Write a comment..."
            className="flex-1 px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          />
          <Button type="submit">
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </form>

      <div className="space-y-4">
        {commentsList.map(comment => (
          <motion.div
            key={comment.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gray-50 rounded-lg p-4"
          >
            <div className="flex justify-between items-start mb-2">
              <h5 className="font-medium">{comment.author}</h5>
              <span className="text-sm text-gray-500">{comment.timestamp}</span>
            </div>
            <p className="text-gray-700">{comment.content}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}