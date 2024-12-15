import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MessageCircle, 
  Users, 
  Bookmark, 
  Trophy, 
  Filter, 
  Search, 
  Star, 
  PlusCircle,
  ArrowUpRight
} from 'lucide-react';

export default function CommunityEnhanced() {
  // State management for discussions and interactions
  const [discussions, setDiscussions] = useState([
    {
      id: 1,
      title: "आधुनिक काव्य में प्रयोगवाद",
      author: "अनुराग शर्मा",
      replies: 24,
      views: 156,
      tags: ["काव्य", "आधुनिक साहित्य"],
      featured: true,
      likes: 42,
      timestamp: new Date('2024-01-15')
    },
    {
      id: 2,
      title: "हिंदी उपन्यास की वर्तमान दशा",
      author: "मीरा गुप्ता",
      replies: 18,
      views: 98,
      tags: ["उपन्यास", "समीक्षा"],
      featured: false,
      likes: 28,
      timestamp: new Date('2024-02-20')
    },
    {
      id: 3,
      title: "साहित्यिक अभिव्यक्ति और मीडिया",
      author: "राहुल दुबे",
      replies: 36,
      views: 220,
      tags: ["मीडिया", "साहित्य"],
      featured: true,
      likes: 55,
      timestamp: new Date('2024-03-10')
    }
  ]);

  // State for filters and search
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState(null);
  const [sortBy, setSortBy] = useState('recent');

  // Filtered and sorted discussions
  const filteredDiscussions = discussions
    .filter(discussion => 
      discussion.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedTag ? discussion.tags.includes(selectedTag) : true)
    )
    .sort((a, b) => {
      switch(sortBy) {
        case 'popular':
          return b.likes - a.likes;
        case 'most-viewed':
          return b.views - a.views;
        default:
          return b.timestamp - a.timestamp;
      }
    });

  // Community interaction stats
  const [communityStats, setCommunityStats] = useState({
    members: 1234,
    discussions: 456,
    bookmarks: 789,
    awards: 123
  });

  // Animated stats increment
  useEffect(() => {
    const statsInterval = setInterval(() => {
      setCommunityStats(prev => ({
        members: prev.members + Math.floor(Math.random() * 5),
        discussions: prev.discussions + Math.floor(Math.random() * 2),
        bookmarks: prev.bookmarks + Math.floor(Math.random() * 3),
        awards: prev.awards + Math.floor(Math.random() * 1)
      }));
    }, 5000);

    return () => clearInterval(statsInterval);
  }, []);

  // Unique tag collection
  const allTags = [...new Set(discussions.flatMap(d => d.tags))];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 pt-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid md:grid-cols-4 gap-8"
      >
        {/* Main Content Area */}
        <div className="md:col-span-3">
          {/* Header with Search and Filters */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 flex justify-between items-center"
          >
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">हिंदी साहित्य मंच</h1>
              <p className="text-gray-600">साहित्य की दुनिया में आपका स्वागत है</p>
            </div>
            
            {/* Search and Filter Section */}
            <div className="flex items-center space-x-4">
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="खोजें..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 rounded-full border border-orange-200 focus:ring-2 focus:ring-orange-300 transition"
                />
                <Search className="absolute left-3 top-3 text-orange-500" />
              </div>
              
              <div className="relative group">
                <button className="bg-orange-100 text-orange-800 p-2 rounded-full hover:bg-orange-200 transition">
                  <Filter />
                </button>
                <div className="absolute hidden group-hover:block right-0 mt-2 w-48 bg-white shadow-lg rounded-lg p-2">
                  <div className="space-y-2">
                    <button 
                      onClick={() => setSortBy('recent')} 
                      className="w-full text-left hover:bg-orange-50 p-2 rounded"
                    >
                      नवीनतम
                    </button>
                    <button 
                      onClick={() => setSortBy('popular')} 
                      className="w-full text-left hover:bg-orange-50 p-2 rounded"
                    >
                      लोकप्रिय
                    </button>
                    <button 
                      onClick={() => setSortBy('most-viewed')} 
                      className="w-full text-left hover:bg-orange-50 p-2 rounded"
                    >
                      सबसे ज्यादा देखे गए
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Tag Filter */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-wrap gap-2 mb-6"
          >
            {allTags.map((tag) => (
              <motion.button
                key={tag}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
                className={`px-3 py-1 rounded-full text-sm transition ${
                  selectedTag === tag 
                  ? 'bg-orange-500 text-white' 
                  : 'bg-orange-100 text-orange-800 hover:bg-orange-200'
                }`}
              >
                {tag}
              </motion.button>
            ))}
          </motion.div>

          {/* Discussions List */}
          <AnimatePresence>
            {filteredDiscussions.length > 0 ? (
              filteredDiscussions.map((discussion, index) => (
                <motion.div
                  key={discussion.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white/60 backdrop-blur-md rounded-xl p-6 mb-4 hover:shadow-lg transition-all group"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-orange-600 transition">
                        {discussion.title}
                      </h3>
                      <p className="text-gray-600 mb-4">
                        लेखक: {discussion.author}
                      </p>
                    </div>
                    {discussion.featured && (
                      <Star className="text-orange-500 w-6 h-6" />
                    )}
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {discussion.tags.map((tag, tagIndex) => (
                      <span 
                        key={tagIndex} 
                        className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex justify-between items-center text-gray-600">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center">
                        <MessageCircle className="h-5 w-5 mr-2" />
                        <span>{discussion.replies} टिप्पणियाँ</span>
                      </div>
                      <div className="flex items-center">
                        <Users className="h-5 w-5 mr-2" />
                        <span>{discussion.views} दृश्य</span>
                      </div>
                      <div className="flex items-center">
                        <PlusCircle className="h-5 w-5 mr-2 text-orange-500" />
                        <span>{discussion.likes} पसंद</span>
                      </div>
                    </div>
                    <button className="flex items-center text-orange-600 hover:text-orange-800 transition">
                      देखें <ArrowUpRight className="ml-2" />
                    </button>
                  </div>
                </motion.div>
              ))
            ) : (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12 bg-white/60 rounded-xl"
              >
                <p className="text-gray-600 text-xl">कोई चर्चा नहीं मिली</p>
                <p className="text-gray-500">अपनी खोज को बदलें या नई चर्चा शुरू करें</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Sidebar Stats */}
        <div className="md:col-span-1">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white/40 backdrop-blur-md rounded-xl p-6 space-y-6"
          >
            <h2 className="text-xl font-bold mb-4 flex items-center">
              <Trophy className="mr-3 text-orange-600" /> 
              समुदाय आँकड़े
            </h2>
            <div className="space-y-4">
              {Object.entries(communityStats).map(([key, value]) => (
                <motion.div 
                  key={key}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center"
                >
                  {key === 'members' && <Users className="h-5 w-5 text-orange-600 mr-3" />}
                  {key === 'discussions' && <MessageCircle className="h-5 w-5 text-orange-600 mr-3" />}
                  {key === 'bookmarks' && <Bookmark className="h-5 w-5 text-orange-600 mr-3" />}
                  {key === 'awards' && <Trophy className="h-5 w-5 text-orange-600 mr-3" />}
                  
                  <div>
                    <p className="font-semibold text-2xl">{value}</p>
                    <p className="text-sm text-gray-600">
                      {key === 'members' && 'सदस्य'}
                      {key === 'discussions' && 'चर्चाएँ'}
                      {key === 'bookmarks' && 'बुकमार्क'}
                      {key === 'awards' && 'पुरस्कार'}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}