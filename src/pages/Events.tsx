import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calendar, MapPin, Clock, Users, Info, ArrowRight, Heart, Share2, Star, Filter, Search, 
  X, ChevronLeft, ChevronRight, Menu, Plus, CheckCircle2, BookOpen, Award 
} from 'lucide-react';

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
      image: "https://images.unsplash.com/photo-1511795409834-432f7b1728b2?auto=format&fit=crop&q=80",
      description: "A mesmerizing evening of poetic expressions, celebrating the rich tapestry of Hindi literature.",
      tags: ["Poetry", "Culture", "Literature"],
      difficulty: "Beginner",
      speakers: [
        { name: "डॉ. रमेश कुमार", role: "Chief Poet" },
        { name: "प्रोफ़. सुनीता शर्मा", role: "Literary Critic" }
      ],
      price: 200,
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
      image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80",
      description: "A grand gathering of renowned writers, promising an afternoon of intellectual discourse.",
      tags: ["Writers", "Dialogue", "Literature"],
      difficulty: "Advanced",
      speakers: [
        { name: "विजय शेखर", role: "Award-Winning Author" },
        { name: "आशा दीक्षित", role: "Renowned Journalist" }
      ],
      price: 500,
    }
  ]);

  const [filters, setFilters] = useState({
    search: '',
    difficulty: '',
    tags: []
  });

  const [selectedEvent, setSelectedEvent] = useState(null);
  const [liked, setLiked] = useState({});
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const filteredEvents = useMemo(() => {
    return events.filter(event => {
      const matchSearch = event.title.toLowerCase().includes(filters.search.toLowerCase()) ||
                          event.description.toLowerCase().includes(filters.search.toLowerCase());
      
      const matchDifficulty = !filters.difficulty || event.difficulty === filters.difficulty;
      
      const matchTags = filters.tags.length === 0 || 
                        filters.tags.some(tag => event.tags.includes(tag));
      
      return matchSearch && matchDifficulty && matchTags;
    });
  }, [events, filters]);

  const handleRegister = (eventId) => {
    setEvents(events.map(event => 
      event.id === eventId 
        ? { ...event, currentRegistered: Math.min(event.currentRegistered + 1, event.capacity) }
        : event
    ));
  };

  const renderFilterModal = () => {
    const allTags = [...new Set(events.flatMap(event => event.tags))];
    const difficulties = [...new Set(events.map(event => event.difficulty))];

    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
        onClick={() => setIsFilterOpen(false)}
      >
        <motion.div 
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          className="bg-white rounded-2xl w-full max-w-md max-h-[80vh] overflow-y-auto p-6"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Filter Events</h2>
            <button onClick={() => setIsFilterOpen(false)}>
              <X className="h-6 w-6 text-gray-600" />
            </button>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Difficulty</label>
            <div className="flex space-x-2">
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
                      : 'bg-gray-100 text-gray-700'
                  }`}
                >
                  {diff}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Tags</label>
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
                      : 'bg-gray-100 text-gray-700'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    );
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
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto grid md:grid-cols-2 shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="relative">
            <img 
              src={selectedEvent.image} 
              alt={selectedEvent.title} 
              className="w-full h-full object-cover rounded-l-2xl"
            />
            <div className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm rounded-full p-2">
              <Award className="h-6 w-6 text-orange-500" />
            </div>
          </div>
          
          <div className="p-8 space-y-4">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">{selectedEvent.title}</h2>
            <p className="text-gray-600 mb-4">{selectedEvent.subtitle}</p>
            
            <div className="flex items-center space-x-4 mb-4">
              <div className="flex items-center">
                <BookOpen className="h-5 w-5 mr-2 text-orange-600" />
                <span className="text-gray-700">{selectedEvent.difficulty} Level</span>
              </div>
              <div className="flex items-center">
                <Star className="h-5 w-5 mr-2 text-orange-600" />
                <span className="text-gray-700">₹{selectedEvent.price}</span>
              </div>
            </div>

            <p className="text-gray-700 mb-4">{selectedEvent.description}</p>

            <div className="mb-4">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Speakers</h3>
              {selectedEvent.speakers.map(speaker => (
                <div key={speaker.name} className="flex items-center mb-2">
                  <CheckCircle2 className="h-5 w-5 mr-2 text-orange-600" />
                  <div>
                    <p className="font-medium text-gray-800">{speaker.name}</p>
                    <p className="text-sm text-gray-600">{speaker.role}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-between items-center">
              <button 
                onClick={() => handleRegister(selectedEvent.id)}
                className="flex items-center bg-orange-600 text-white px-6 py-2 rounded-md hover:bg-orange-700 transition-colors"
              >
                Register Now <ArrowRight className="ml-2 h-5 w-5" />
              </button>
              <div className="flex items-center space-x-3">
                <button 
                  onClick={() => {}}
                  className="text-gray-600 hover:text-gray-900"
                >
                  <Share2 className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    );
  };

  return (
    <div className="pt-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-gradient-to-b from-orange-50 to-white min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/30 backdrop-blur-md rounded-xl p-8 mb-12 shadow-lg"
      >
        <div className="flex justify-between items-center mb-4">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 tracking-tight">
              हिंदी साहित्य महोत्सव
              <span className="block text-lg mt-2 text-orange-600">Hindi Literary Association Events</span>
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <input 
                type="text"
                placeholder="Search events..."
                value={filters.search}
                onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
            <button 
              onClick={() => setIsFilterOpen(true)}
              className="bg-orange-600 text-white p-2 rounded-full hover:bg-orange-700 transition-colors"
            >
              <Filter className="h-5 w-5" />
            </button>
          </div>
        </div>
      </motion.div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredEvents.map((event, index) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, x: index % 3 === 0 ? -20 : 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.2 }}
            className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all group"
          >
            <div className="relative">
              <img 
                src={event.image} 
                alt={event.title} 
                className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm rounded-full p-2">
                <Star className="h-6 w-6 text-orange-500" />
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">{event.title}</h3>
              <p className="text-gray-600 mb-4">{event.subtitle}</p>
              
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center text-gray-600">
                  <Calendar className="h-5 w-5 mr-2 text-orange-600" />
                  <span>{new Date(event.date).toLocaleDateString()}</span>
                </div>
                <div className="text-sm text-gray-500">
                  {event.currentRegistered}/{event.capacity} Registered
                </div>
              </div>

              <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
                <div 
                  className="bg-orange-600 h-2.5 rounded-full" 
                  style={{ width: `${(event.currentRegistered / event.capacity) * 100}%` }}
                ></div>
              </div>

              <div className="flex justify-between items-center">
                <button 
                  onClick={() => setSelectedEvent(event)}
                  className="flex items-center text-orange-600 hover:text-orange-700 transition-colors"
                >
                  View Details <Info className="ml-2 h-5 w-5" />
                </button>
                <button 
                  onClick={() => handleRegister(event.id)}
                  className="bg-orange-600 text-white px-4 py-2 rounded-md hover:bg-orange-700 transition-colors"
                >
                  Register
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {filteredEvents.length === 0 && (
        <div className="text-center py-12">
          <p className="text-2xl text-gray-600">No events match your current filters</p>
        </div>
      )}

<AnimatePresence>
        {isFilterOpen && renderFilterModal()}
        {selectedEvent && renderEventModal()}
      </AnimatePresence>
    </div>
  );
}