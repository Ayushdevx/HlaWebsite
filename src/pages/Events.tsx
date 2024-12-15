import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calendar, MapPin, Clock, Users, Info, ArrowRight, Heart, Share2, Star, Filter, Search, 
  X, ChevronLeft, ChevronRight, Menu, Plus, CheckCircle2, BookOpen, Award, ArrowUpRight,
  MapPinned, Clock3, Tag, User2
} from 'lucide-react';

const EventCard = ({ event, onSelect, onRegister, isLiked, onLike }) => (
  <motion.div
    layout
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all group"
  >
    <div className="relative">
      <img 
        src={event.image} 
        alt={event.title} 
        className="w-full h-48 sm:h-56 object-cover transition-transform duration-300 group-hover:scale-105"
      />
      <div className="absolute top-4 right-4 flex space-x-2">
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={(e) => {
            e.stopPropagation();
            onLike(event.id);
          }}
          className="bg-white/80 backdrop-blur-sm rounded-full p-2 hover:bg-white transition-colors"
        >
          <Heart className={`h-5 w-5 ${isLiked ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
        </motion.button>
        <div className="bg-white/80 backdrop-blur-sm rounded-full p-2">
          <Star className="h-5 w-5 text-orange-500" />
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
        <div className="flex items-center space-x-2 text-white text-sm">
          <Tag className="h-4 w-4" />
          <div className="flex gap-2">
            {event.tags.map((tag, index) => (
              <span key={index} className="bg-white/20 backdrop-blur-sm px-2 py-0.5 rounded-full">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
    
    <div className="p-6">
      <div className="mb-4">
        <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1">{event.title}</h3>
        <p className="text-sm text-gray-600">{event.subtitle}</p>
      </div>
      
      <div className="space-y-3 mb-4">
        <div className="flex items-center text-gray-600 text-sm">
          <Calendar className="h-4 w-4 mr-2 text-orange-600" />
          <span>{new Date(event.date).toLocaleDateString()}</span>
          <Clock3 className="h-4 w-4 ml-4 mr-2 text-orange-600" />
          <span>{event.time}</span>
        </div>
        
        <div className="flex items-center text-gray-600 text-sm">
          <MapPinned className="h-4 w-4 mr-2 text-orange-600" />
          <span>{event.location}</span>
        </div>
        
        <div className="flex items-center text-gray-600 text-sm">
          <User2 className="h-4 w-4 mr-2 text-orange-600" />
          <span>{event.currentRegistered}/{event.capacity} Registered</span>
        </div>
      </div>

      <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
        <div 
          className="bg-orange-600 h-2 rounded-full transition-all duration-500" 
          style={{ width: `${(event.currentRegistered / event.capacity) * 100}%` }}
        />
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <BookOpen className="h-4 w-4 mr-2 text-orange-600" />
          <span className="text-sm text-gray-700">{event.difficulty}</span>
          <span className="mx-2 text-gray-300">|</span>
          <span className="text-sm font-semibold text-gray-900">₹{event.price}</span>
        </div>
        
        <div className="flex space-x-2">
          <motion.button 
            whileTap={{ scale: 0.95 }}
            onClick={() => onSelect(event)}
            className="flex items-center text-orange-600 hover:text-orange-700 transition-colors text-sm font-medium"
          >
            Details <ArrowUpRight className="ml-1 h-4 w-4" />
          </motion.button>
          
          <motion.button 
            whileTap={{ scale: 0.95 }}
            onClick={() => onRegister(event.id)}
            className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors text-sm font-medium"
          >
            Register
          </motion.button>
        </div>
      </div>
    </div>
  </motion.div>
);

export default function AdvancedEventsManagement() {
  const [events, setEvents] = useState([
    {
      id: 1,
      title: "काव्य संध्या",
      subtitle: "Evening of Poetry and Passion",
      date: "2024-04-15",
      time: "6:00 PM",
      location: "दिल्ली साहित्य अकादमी",
      capacity: 100,
      currentRegistered: 78,
      image: "/api/placeholder/800/600",
      description: "A mesmerizing evening of poetic expressions, celebrating the rich tapestry of Hindi literature. Join us for an unforgettable journey through verses and rhythms that capture the essence of our cultural heritage.",
      tags: ["Poetry", "Culture", "Literature"],
      difficulty: "Beginner",
      speakers: [
        { name: "डॉ. रमेश कुमार", role: "Chief Poet", image: "/api/placeholder/100/100" },
        { name: "प्रोफ़. सुनीता शर्मा", role: "Literary Critic", image: "/api/placeholder/100/100" }
      ],
      price: 200,
      schedule: [
        { time: "6:00 PM", activity: "Opening Ceremony" },
        { time: "6:30 PM", activity: "Poetry Recitation" },
        { time: "7:30 PM", activity: "Interactive Session" },
        { time: "8:30 PM", activity: "Closing Ceremony" }
      ]
    },
    {
      id: 2,
      title: "लेखक मिलन समारोह",
      subtitle: "Writers' Confluence",
      date: "2024-04-20",
      time: "4:00 PM",
      location: "राजेंद्र भवन",
      capacity: 150,
      currentRegistered: 112,
      image: "/api/placeholder/800/600",
      description: "A grand gathering of renowned writers, promising an afternoon of intellectual discourse and literary exploration. Experience the magic of storytelling and the power of words.",
      tags: ["Writers", "Dialogue", "Literature"],
      difficulty: "Advanced",
      speakers: [
        { name: "विजय शेखर", role: "Award-Winning Author", image: "/api/placeholder/100/100" },
        { name: "आशा दीक्षित", role: "Renowned Journalist", image: "/api/placeholder/100/100" }
      ],
      price: 500,
      schedule: [
        { time: "4:00 PM", activity: "Welcome Address" },
        { time: "4:30 PM", activity: "Panel Discussion" },
        { time: "5:30 PM", activity: "Book Reading" },
        { time: "6:30 PM", activity: "Networking Session" }
      ]
    }
  ]);

  const [filters, setFilters] = useState({
    search: '',
    difficulty: '',
    tags: [],
    priceRange: [0, 1000],
    dateRange: null
  });

  const [selectedEvent, setSelectedEvent] = useState(null);
  const [liked, setLiked] = useState({});
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [view, setView] = useState('grid'); // 'grid' or 'list'
  const [sortBy, setSortBy] = useState('date'); // 'date', 'price', 'popularity'

  const filteredEvents = useMemo(() => {
    return events
      .filter(event => {
        const matchSearch = event.title.toLowerCase().includes(filters.search.toLowerCase()) ||
                          event.description.toLowerCase().includes(filters.search.toLowerCase());
        
        const matchDifficulty = !filters.difficulty || event.difficulty === filters.difficulty;
        
        const matchTags = filters.tags.length === 0 || 
                          filters.tags.some(tag => event.tags.includes(tag));
        
        const matchPrice = event.price >= filters.priceRange[0] && 
                          event.price <= filters.priceRange[1];
        
        return matchSearch && matchDifficulty && matchTags && matchPrice;
      })
      .sort((a, b) => {
        switch (sortBy) {
          case 'date':
            return new Date(a.date) - new Date(b.date);
          case 'price':
            return a.price - b.price;
          case 'popularity':
            return b.currentRegistered - a.currentRegistered;
          default:
            return 0;
        }
      });
  }, [events, filters, sortBy]);

  const handleRegister = (eventId) => {
    setEvents(events.map(event => 
      event.id === eventId 
        ? { ...event, currentRegistered: Math.min(event.currentRegistered + 1, event.capacity) }
        : event
    ));
  };

  const handleLike = (eventId) => {
    setLiked(prev => ({
      ...prev,
      [eventId]: !prev[eventId]
    }));
  };

  const clearFilters = () => {
    setFilters({
      search: '',
      difficulty: '',
      tags: [],
      priceRange: [0, 1000],
      dateRange: null
    });
  };

  const renderEventModal = () => {
    if (!selectedEvent) return null;

    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
        onClick={() => setSelectedEvent(null)}
      >
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="relative h-64 sm:h-96">
            <img 
              src={selectedEvent.image} 
              alt={selectedEvent.title} 
              className="w-full h-full object-cover"
            />
            <button 
              onClick={() => setSelectedEvent(null)}
              className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm rounded-full p-2 hover:bg-white transition-colors"
            >
              <X className="h-6 w-6 text-gray-600" />
            </button>
          </div>
          
          <div className="p-6 sm:p-8">
            <div className="max-w-3xl mx-auto">
              <div className="flex flex-wrap gap-2 mb-6">
                {selectedEvent.tags.map((tag, index) => (
                  <span 
                    key={index}
                    className="bg-orange-100 text-orange-800 text-sm px-3 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
                {selectedEvent.title}
              </h2>
              <p className="text-lg text-gray-600 mb-6">{selectedEvent.subtitle}</p>

              <div className="grid sm:grid-cols-2 gap-6 mb-8">
                <div className="space-y-4">
                  <div className="flex items-center">
                    <Calendar className="h-5 w-5 mr-3 text-orange-600" />
                    <div>
                      <p className="text-sm text-gray-500">Date & Time</p>
                      <p className="text-gray-900">
                        {new Date(selectedEvent.date).toLocaleDateString()} at {selectedEvent.time}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <MapPinned className="h-5 w-5 mr-3 text-orange-600" />
                    <div>
                      <p className="text-sm text-gray-500">Location</p>
                      <p className="text-gray-900">{selectedEvent.location}</p>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <Users className="h-5 w-5 mr-3 text-orange-600" />
                    <div>
                      <p className="text-sm text-gray-500">Capacity</p>
                      <p className="text-gray-900">
                        {selectedEvent.currentRegistered} / {selectedEvent.capacity} Registered
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center">
                    <BookOpen className="h-5 w-5 mr-3 text-orange-600" />
                    <div>
                      <p className="text-sm text-gray-500">Difficulty Level</p>
                      <p className="text-gray-900">{selectedEvent.difficulty}</p>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <Star className="h-5 w-5 mr-3 text-orange-600" />
                    <div>
                    <p className="text-gray-900">₹{selectedEvent.price}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">About the Event</h3>
                <p className="text-gray-700 leading-relaxed">{selectedEvent.description}</p>
              </div>

              <div className="mb-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Event Schedule</h3>
                <div className="space-y-4">
                  {selectedEvent.schedule.map((item, index) => (
                    <div 
                      key={index}
                      className="flex items-start space-x-4 p-4 rounded-lg bg-orange-50"
                    >
                      <Clock3 className="h-5 w-5 text-orange-600 mt-0.5" />
                      <div>
                        <p className="font-medium text-gray-900">{item.time}</p>
                        <p className="text-gray-600">{item.activity}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Speakers</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  {selectedEvent.speakers.map((speaker, index) => (
                    <div 
                      key={index}
                      className="flex items-center space-x-4 p-4 rounded-lg bg-gray-50"
                    >
                      <img 
                        src={speaker.image} 
                        alt={speaker.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div>
                        <p className="font-medium text-gray-900">{speaker.name}</p>
                        <p className="text-sm text-gray-600">{speaker.role}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap gap-4 items-center justify-between border-t pt-6">
                <div className="flex items-center space-x-4">
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleLike(selectedEvent.id);
                    }}
                    className="flex items-center space-x-2 text-gray-600 hover:text-red-500 transition-colors"
                  >
                    <Heart className={`h-5 w-5 ${liked[selectedEvent.id] ? 'fill-red-500 text-red-500' : ''}`} />
                    <span>Save</span>
                  </button>
                  <button 
                    onClick={(e) => e.stopPropagation()}
                    className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    <Share2 className="h-5 w-5" />
                    <span>Share</span>
                  </button>
                </div>
                
                <button 
                  onClick={() => handleRegister(selectedEvent.id)}
                  className="flex items-center bg-orange-600 text-white px-6 py-3 rounded-lg hover:bg-orange-700 transition-colors"
                >
                  Register Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    );
  };

  const renderFilterModal = () => {
    const allTags = [...new Set(events.flatMap(event => event.tags))];
    const difficulties = [...new Set(events.map(event => event.difficulty))];

    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 backdrop-blur-sm p-4"
        onClick={() => setIsFilterOpen(false)}
      >
        <motion.div 
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          className="bg-white rounded-t-2xl sm:rounded-2xl w-full max-w-lg max-h-[80vh] overflow-y-auto p-6"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Filter Events</h2>
            <button 
              onClick={() => setIsFilterOpen(false)}
              className="text-gray-400 hover:text-gray-500"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Difficulty Level
              </label>
              <div className="flex flex-wrap gap-2">
                {difficulties.map(diff => (
                  <button
                    key={diff}
                    onClick={() => setFilters(prev => ({
                      ...prev,
                      difficulty: prev.difficulty === diff ? '' : diff
                    }))}
                    className={`px-4 py-2 rounded-full text-sm transition-colors ${
                      filters.difficulty === diff 
                        ? 'bg-orange-600 text-white' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {diff}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tags
              </label>
              <div className="flex flex-wrap gap-2">
                {allTags.map(tag => (
                  <button
                    key={tag}
                    onClick={() => setFilters(prev => ({
                      ...prev,
                      tags: prev.tags.includes(tag)
                        ? prev.tags.filter(t => t !== tag)
                        : [...prev.tags, tag]
                    }))}
                    className={`px-3 py-1 rounded-full text-sm transition-colors ${
                      filters.tags.includes(tag)
                        ? 'bg-orange-600 text-white' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex justify-between pt-6 border-t">
              <button
                onClick={clearFilters}
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                Clear all
              </button>
              <button
                onClick={() => setIsFilterOpen(false)}
                className="bg-orange-600 text-white px-6 py-2 rounded-lg hover:bg-orange-700 transition-colors"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/30 backdrop-blur-md rounded-xl p-6 sm:p-8 mb-8 shadow-lg"
        >
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight">
                हिंदी साहित्य महोत्सव
                <span className="block text-lg mt-2 text-orange-600">
                  Hindi Literary Association Events
                </span>
              </h1>
            </div>
            
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto">
              <div className="relative flex-grow sm:flex-grow-0">
                <input 
                  type="text"
                  placeholder="Search events..."
                  value={filters.search}
                  onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
              
              <button 
                onClick={() => setIsFilterOpen(true)}
                className="flex items-center justify-center bg-orange-600 text-white px-4 py-2 rounded-full hover:bg-orange-700 transition-colors"
              >
                <Filter className="h-5 w-5 sm:mr-2" />
                <span className="hidden sm:inline">Filters</span>
              </button>
            </div>
          </div>
        </motion.div>

        {filteredEvents.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredEvents.map((event, index) => (
              <EventCard
                key={event.id}
                event={event}
                onSelect={setSelectedEvent}
                onRegister={handleRegister}
                isLiked={liked[event.id]}
                onLike={handleLike}
              />
            ))}
          </div>
        ) : (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-2xl text-gray-600">No events match your current filters</p>
            <button
              onClick={clearFilters}
              className="mt-4 text-orange-600 hover:text-orange-700 transition-colors"
            >
              Clear all filters
            </button>
          </motion.div>
        )}
      </div>

      <AnimatePresence>
        {isFilterOpen && renderFilterModal()}
        {selectedEvent && renderEventModal()}
      </AnimatePresence>
    </div>
  );
}