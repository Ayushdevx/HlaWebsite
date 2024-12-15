import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MessageCircle, Users, Bookmark, Trophy, Filter, Search, 
  Star, PlusCircle, ArrowUpRight, TrendingUp, Calendar,
  MenuIcon, X, BookOpen, Award, Bell
} from 'lucide-react';

export default function CommunityEnhanced() {
  // Extended state management
  const [discussions, setDiscussions] = useState([
    {
      id: 1,
      title: "आधुनिक काव्य में प्रयोगवाद",
      author: "अनुराग शर्मा",
      authorLevel: "विशेषज्ञ लेखक",
      replies: 24,
      views: 156,
      tags: ["काव्य", "आधुनिक साहित्य"],
      featured: true,
      likes: 42,
      category: "काव्य",
      timestamp: new Date('2024-01-15'),
      excerpt: "आधुनिक काव्य में प्रयोगवाद की भूमिका और उसके विभिन्न आयामों पर विचार-विमर्श..."
    },
    {
      id: 2,
      title: "हिंदी उपन्यास की वर्तमान दशा",
      author: "मीरा गुप्ता",
      authorLevel: "प्रतिष्ठित सदस्य",
      replies: 18,
      views: 98,
      tags: ["उपन्यास", "समीक्षा"],
      featured: false,
      likes: 28,
      category: "उपन्यास",
      timestamp: new Date('2024-02-20'),
      excerpt: "वर्तमान समय में हिंदी उपन्यास की स्थिति और उसके बदलते स्वरूप का विश्लेषण..."
    },
    {
      id: 3,
      title: "साहित्यिक अभिव्यक्ति और मीडिया",
      author: "राहुल दुबे",
      authorLevel: "नया लेखक",
      replies: 36,
      views: 220,
      tags: ["मीडिया", "साहित्य"],
      featured: true,
      likes: 55,
      category: "मीडिया",
      timestamp: new Date('2024-03-10'),
      excerpt: "डिजिटल युग में साहित्यिक अभिव्यक्ति के बदलते स्वरूप पर एक विस्तृत चर्चा..."
    }
  ]);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [sortBy, setSortBy] = useState('recent');
  const [showQuickActions, setShowQuickActions] = useState(false);

  // New state for trending topics
  const [trendingTopics] = useState([
    { id: 1, topic: "नई कविता", count: 156 },
    { id: 2, topic: "डिजिटल साहित्य", count: 143 },
    { id: 3, topic: "लोक कथाएं", count: 128 }
  ]);

  // New state for upcoming events
  const [events] = useState([
    {
      id: 1,
      title: "काव्य गोष्ठी",
      date: "25 मार्च, 2024",
      participants: 45
    },
    {
      id: 2,
      title: "साहित्य संवाद",
      date: "2 अप्रैल, 2024",
      participants: 32
    }
  ]);

  // Community stats with achievements
  const [communityStats, setCommunityStats] = useState({
    members: 1234,
    discussions: 456,
    bookmarks: 789,
    awards: 123,
    achievements: [
      { id: 1, title: "श्रेष्ठ लेखक", count: 12 },
      { id: 2, title: "उत्कृष्ट योगदान", count: 25 },
      { id: 3, title: "नए प्रतिभागी", count: 45 }
    ]
  });

  // Categories
  const categories = [
    "काव्य", "उपन्यास", "कहानी", "नाटक", "समीक्षा", "मीडिया"
  ];

  // Stats animation
  useEffect(() => {
    const statsInterval = setInterval(() => {
      setCommunityStats(prev => ({
        ...prev,
        members: prev.members + Math.floor(Math.random() * 5),
        discussions: prev.discussions + Math.floor(Math.random() * 2),
        bookmarks: prev.bookmarks + Math.floor(Math.random() * 3),
        awards: prev.awards + Math.floor(Math.random() * 1)
      }));
    }, 5000);

    return () => clearInterval(statsInterval);
  }, []);

  // Filter and sort discussions
  const filteredDiscussions = discussions
    .filter(discussion => 
      discussion.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedTag ? discussion.tags.includes(selectedTag) : true) &&
      (selectedCategory ? discussion.category === selectedCategory : true)
    )
    .sort((a, b) => {
      switch(sortBy) {
        case 'popular': return b.likes - a.likes;
        case 'most-viewed': return b.views - a.views;
        default: return b.timestamp - a.timestamp;
      }
    });

  const allTags = [...new Set(discussions.flatMap(d => d.tags))];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100">
      {/* Mobile Navigation */}
      <div className="lg:hidden fixed top-0 left-0 right-0 bg-white z-50 shadow-md">
        <div className="flex justify-between items-center p-4">
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-orange-600"
          >
            {isMenuOpen ? <X /> : <MenuIcon />}
          </button>
          <h1 className="text-xl font-bold">हिंदी साहित्य मंच</h1>
          <button className="text-orange-600">
            <Bell />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            className="fixed top-16 left-0 bottom-0 w-3/4 bg-white z-40 shadow-xl p-4 lg:hidden"
          >
            <div className="space-y-4">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => {
                    setSelectedCategory(selectedCategory === category ? null : category);
                    setIsMenuOpen(false);
                  }}
                  className="block w-full text-left p-3 rounded-lg hover:bg-orange-50"
                >
                  {category}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="pt-20 lg:pt-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid lg:grid-cols-4 gap-8"
        >
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Header */}
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
              <div>
                <h1 className="text-3xl lg:text-4xl font-bold text-gray-900">हिंदी साहित्य मंच</h1>
                <p className="text-gray-600">साहित्य की दुनिया में आपका स्वागत है</p>
              </div>
              
              <div className="w-full lg:w-auto flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <input 
                    type="text" 
                    placeholder="खोजें..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 rounded-full border border-orange-200 focus:ring-2 focus:ring-orange-300"
                  />
                  <Search className="absolute left-3 top-3 text-orange-500" />
                </div>
                
                <div className="relative">
                  <button 
                    onClick={() => setShowQuickActions(!showQuickActions)}
                    className="w-full sm:w-auto bg-orange-500 text-white px-6 py-2 rounded-full hover:bg-orange-600 transition flex items-center justify-center gap-2"
                  >
                    <PlusCircle className="w-5 h-5" />
                    <span>नई चर्चा</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Categories (Desktop) */}
            <div className="hidden lg:flex overflow-x-auto gap-4 pb-2">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(selectedCategory === category ? null : category)}
                  className={`px-4 py-2 rounded-full transition ${
                    selectedCategory === category 
                      ? 'bg-orange-500 text-white' 
                      : 'bg-white text-gray-700 hover:bg-orange-100'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Tag Filters */}
            <div className="flex flex-wrap gap-2">
              {allTags.map(tag => (
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
            </div>

            {/* Discussions List */}
            <AnimatePresence>
              {filteredDiscussions.length > 0 ? (
                filteredDiscussions.map((discussion, index) => (
                  <motion.div
                    key={discussion.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all"
                  >
                    <div className="flex justify-between items-start gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          {discussion.featured && (
                            <span className="bg-orange-100 text-orange-600 px-2 py-1 rounded-full text-xs font-medium">
                              विशेष
                            </span>
                          )}
                          <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs">
                            {discussion.category}
                          </span>
                        </div>
                        
                        <h3 className="text-xl font-semibold text-gray-900 hover:text-orange-600 transition">
                          {discussion.title}
                        </h3>
                        
                        <p className="text-gray-600 mt-2">
                          {discussion.excerpt}
                        </p>

                        <div className="flex items-center gap-2 mt-3">
                          <span className="text-sm text-gray-600">
                            {discussion.author}
                          </span>
                          <span className="text-xs bg-orange-100 text-orange-800 px-2 py-1 rounded-full">
                            {discussion.authorLevel}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mt-4">
                      {discussion.tags.map((tag, tagIndex) => (
                        <span 
                          key={tagIndex}
                          className="bg-orange-50 text-orange-800 px-3 py-1 rounded-full text-sm"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex flex-wrap justify-between items-center mt-4 pt-4 border-t border-gray-100">
                      <div className="flex flex-wrap items-center gap-4">
                        <div className="flex items-center text-gray-600">
                          <MessageCircle className="h-5 w-5 mr-2" />
                          <span>{discussion.replies}</span>
                        </div>
                        <div className="flex items-center text-gray-600">
                          <Users className="h-5 w-5 mr-2" />
                          <span>{discussion.views}</span>
                        </div>
                        <div className="flex items-center text-orange-600">
                          <Star className="h-5 w-5 mr-2" />
                          <span>{discussion.likes}</span>
                        </div>
                      </div>
                      
                      <button className="mt-2 sm:mt-0 w-full sm:w-auto flex items-center justify-center gap-2 bg-orange-100 text-orange-800 px-4 py-2 rounded-full hover:bg-orange-200 transition">
                        चर्चा देखें
                        <ArrowUpRight className="w-4 h-4" />
                      </button>
                    </div>
                  </motion.div>
                ))
              ) : (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-12 bg-white rounded-xl shadow-sm"
                >
                  <BookOpen className="w-12 h-12 text-orange-300 mx-auto mb-4" />
                  <p className="text-gray-600 text-xl">कोई चर्चा नहीं मिली</p>
                  <p className="text-gray-500 mt-2">अपनी खोज को बदलें या नई चर्चा शुरू करें</p>
                  <button className="mt-6 bg-orange-500 text-white px-6 py-2 rounded-full hover:bg-orange-600 transition">
                    नई चर्चा शुरू करें
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Community Stats Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-xl p-6 shadow-sm"
            >
              <h2 className="text-xl font-bold mb-6 flex items-center">
                <Trophy className="mr-3 text-orange-600" /> 
                समुदाय आँकड़े
              </h2>
              
              <div className="grid grid-cols-2 gap-4">
                {Object.entries(communityStats).slice(0, 4).map(([key, value]) => (
                  <motion.div 
                    key={key}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center"
                  >
                    <div className="bg-orange-50 p-3 rounded-lg mb-2">
                      {key === 'members' && <Users className="h-5 w-5 text-orange-600 mx-auto" />}
                      {key === 'discussions' && <MessageCircle className="h-5 w-5 text-orange-600 mx-auto" />}
                      {key === 'bookmarks' && <Bookmark className="h-5 w-5 text-orange-600 mx-auto" />}
                      {key === 'awards' && <Trophy className="h-5 w-5 text-orange-600 mx-auto" />}
                    </div>
                    <p className="font-semibold text-lg">{value.toLocaleString()}</p>
                    <p className="text-sm text-gray-600">
                      {key === 'members' && 'सदस्य'}
                      {key === 'discussions' && 'चर्चाएँ'}
                      {key === 'bookmarks' && 'बुकमार्क'}
                      {key === 'awards' && 'पुरस्कार'}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Trending Topics */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-xl p-6 shadow-sm"
            >
              <h2 className="text-xl font-bold mb-4 flex items-center">
                <TrendingUp className="mr-3 text-orange-600" />
                लोकप्रिय विषय
              </h2>
              <div className="space-y-4">
                {trendingTopics.map(topic => (
                  <div 
                    key={topic.id}
                    className="flex items-center justify-between p-3 bg-orange-50 rounded-lg hover:bg-orange-100 transition cursor-pointer"
                  >
                    <span className="font-medium">{topic.topic}</span>
                    <span className="text-orange-600 text-sm">{topic.count} चर्चाएँ</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Upcoming Events */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-xl p-6 shadow-sm"
            >
              <h2 className="text-xl font-bold mb-4 flex items-center">
                <Calendar className="mr-3 text-orange-600" />
                आगामी कार्यक्रम
              </h2>
              <div className="space-y-4">
                {events.map(event => (
                  <div 
                    key={event.id}
                    className="p-4 border border-orange-100 rounded-lg hover:border-orange-200 transition"
                  >
                    <h3 className="font-medium text-lg">{event.title}</h3>
                    <div className="flex justify-between items-center mt-2 text-sm text-gray-600">
                      <span className="flex items-center">
                        <Calendar className="w-4 h-4 mr-2" />
                        {event.date}
                      </span>
                      <span className="flex items-center">
                        <Users className="w-4 h-4 mr-2" />
                        {event.participants} प्रतिभागी
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Member Achievements */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-xl p-6 shadow-sm"
            >
              <h2 className="text-xl font-bold mb-4 flex items-center">
                <Award className="mr-3 text-orange-600" />
                सदस्य उपलब्धियाँ
              </h2>
              <div className="space-y-4">
                {communityStats.achievements.map(achievement => (
                  <div 
                    key={achievement.id}
                    className="flex items-center justify-between p-3 bg-orange-50 rounded-lg"
                  >
                    <span className="font-medium">{achievement.title}</span>
                    <span className="bg-white px-3 py-1 rounded-full text-orange-600 text-sm">
                      {achievement.count}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Floating Action Button for Quick Actions (Mobile) */}
      <div className="fixed bottom-6 right-6 lg:hidden">
        <AnimatePresence>
          {showQuickActions && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="absolute bottom-16 right-0 bg-white rounded-lg shadow-lg p-4 w-48"
            >
              <div className="space-y-2">
                <button className="w-full text-left px-4 py-2 hover:bg-orange-50 rounded-lg transition">
                  नई चर्चा
                </button>
                <button className="w-full text-left px-4 py-2 hover:bg-orange-50 rounded-lg transition">
                  आज की चर्चाएँ
                </button>
                <button className="w-full text-left px-4 py-2 hover:bg-orange-50 rounded-lg transition">
                  मेरी चर्चाएँ
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowQuickActions(!showQuickActions)}
          className="bg-orange-500 text-white p-4 rounded-full shadow-lg hover:bg-orange-600 transition"
        >
          {showQuickActions ? <X /> : <PlusCircle />}
        </motion.button>
      </div>
    </div>
  );
}