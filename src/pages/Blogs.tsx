import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Search } from 'lucide-react';
import BlogCard from '../components/blog/BlogCard';
import CreateBlogForm from '../components/blog/CreateBlogForm';
import Button from '../components/ui/Button';

export default function Blogs() {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const blogs = [
    {
      title: "आधुनिक हिंदी कविता का विकास",
      author: "रमेश कुमार",
      excerpt: "आधुनिक हिंदी कविता में नई विचारधाराओं का समावेश और उनका प्रभाव...",
      image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80",
      likes: 24,
      comments: 12
    },
    {
      title: "हिंदी साहित्य की विरासत",
      author: "प्रिया गुप्ता",
      excerpt: "भारतीय संस्कृति में हिंदी साहित्य का योगदान और महत्व...",
      image: "https://images.unsplash.com/photo-1506880018603-83d5b814b5a6?auto=format&fit=crop&q=80",
      likes: 32,
      comments: 8
    }
  ];

  const filteredBlogs = blogs.filter(blog =>
    blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    blog.author.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="pt-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/30 backdrop-blur-md rounded-xl p-8 mb-8"
      >
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-4xl font-bold text-gray-900">Blog Archive</h1>
          <Button onClick={() => setShowCreateForm(true)}>
            <Plus className="h-5 w-5 mr-2" /> Create Blog
          </Button>
        </div>
        
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search blogs..."
            className="w-full px-4 py-2 pl-10 rounded-lg border border-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white/50"
          />
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredBlogs.map((blog, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <BlogCard {...blog} />
          </motion.div>
        ))}
      </div>

      {showCreateForm && <CreateBlogForm onClose={() => setShowCreateForm(false)} />}
    </div>
  );
}