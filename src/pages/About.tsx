import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BookOpen, Users, Award, Calendar, 
  ArrowRight, BookText, Globe, Quote, 
  Play, PauseIcon, Heart 
} from 'lucide-react';

export default function About() {
  const [activeTab, setActiveTab] = useState('mission');
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  const stats = [
    { icon: <Users className="h-6 w-6" />, value: '500+', label: 'Active Members' },
    { icon: <Calendar className="h-6 w-6" />, value: '50+', label: 'Events per Year' },
    { icon: <Award className="h-6 w-6" />, value: '10+', label: 'Years of Excellence' },
    { icon: <BookOpen className="h-6 w-6" />, value: '1000+', label: 'Literary Works' },
  ];

  const teamMembers = [
    {
      name: 'Dr. Pankaj Shukla',
      role: 'Faculty Advisor',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80',
      quote: 'Literature is the soul of cultural expression.'
    },
    {
      name: 'Ayush Upadhyay',
      role: 'Technical Lead',
      image: 'https://media.licdn.com/dms/image/v2/D5603AQFgVZrPnKX2yg/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1714299394862?e=1740009600&v=beta&t=tz0m7ei6HzSwcRFVDGQY86Yp_plC4ZnjzQo8EgjcB_Q',
      quote: 'Technology meets creativity in our literary journey.'
    },
    {
      name: 'Prem Patel',
      role: 'President',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80',
      quote: 'Every word is a bridge between cultures.'
    }
  ];

  const missionTabs = [
    {
      id: 'mission',
      icon: <BookText className="h-6 w-6" />,
      title: 'Our Mission',
      content: 'Promoting Hindi literature, fostering cultural understanding, and empowering students through linguistic creativity.'
    },
    {
      id: 'vision',
      icon: <Globe className="h-6 w-6" />,
      title: 'Our Vision',
      content: 'To become a premier platform for Hindi literary excellence, connecting students across diverse backgrounds.'
    },
    {
      id: 'values',
      icon: <Heart className="h-6 w-6" />,
      title: 'Our Values',
      content: 'Inclusivity, creativity, cultural respect, continuous learning, and passionate storytelling.'
    }
  ];

  return (
    <div className="bg-gradient-to-br from-orange-50 to-yellow-50 min-h-screen pt-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-red-600 mb-4">
          Hindi Literary Association
        </h1>
        <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
          Bridging cultures, celebrating language, and inspiring creativity through the power of Hindi literature.
          
        </p>
      </motion.div>

      {/* Stats Section */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ 
              delay: index * 0.2, 
              type: 'spring', 
              stiffness: 300 
            }}
            whileHover={{ scale: 1.05 }}
            className="bg-white/70 shadow-lg backdrop-blur-md rounded-2xl p-6 text-center hover:shadow-xl transition-all"
          >
            <div className="text-orange-600 flex justify-center mb-3">{stat.icon}</div>
            <div className="text-4xl font-bold text-orange-800">{stat.value}</div>
            <div className="text-gray-600 font-medium">{stat.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Mission & Vision Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-16"
      >
        <div className="flex justify-center space-x-4 mb-8">
          {missionTabs.map((tab) => (
            <motion.button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`
                flex items-center space-x-2 px-4 py-2 rounded-full transition-all
                ${activeTab === tab.id 
                  ? 'bg-orange-600 text-white' 
                  : 'bg-white text-gray-700 hover:bg-orange-100'
                }
              `}
            >
              {tab.icon}
              <span className="font-medium">{tab.title}</span>
            </motion.button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ duration: 0.3 }}
            className="bg-white/70 backdrop-blur-md rounded-2xl p-8 text-center"
          >
            <p className="text-xl text-gray-800">
              {missionTabs.find(tab => tab.id === activeTab)?.content}
            </p>
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {/* Team Section */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Our Inspiring Team</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                delay: index * 0.2, 
                type: 'spring', 
                stiffness: 200 
              }}
              whileHover={{ 
                scale: 1.05, 
                boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)' 
              }}
              className="bg-white/70 backdrop-blur-md rounded-2xl p-6 text-center group"
            >
              <div className="relative mx-auto w-40 h-40 mb-4">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full rounded-full object-cover border-4 border-orange-200 group-hover:border-orange-400 transition-all"
                />
                <motion.div
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 transition-opacity"
                >
                  <Quote className="text-white w-12 h-12" />
                </motion.div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900">{member.name}</h3>
              <p className="text-gray-600 mb-2">{member.role}</p>
              <p className="italic text-gray-500">"{member.quote}"</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Promotional Video Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/70 backdrop-blur-md rounded-2xl p-8 text-center"
      >
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Explore HLA</h2>
        <div className="relative max-w-4xl mx-auto aspect-video bg-gray-200 rounded-xl overflow-hidden">
          {!isVideoPlaying ? (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute inset-0 bg-black/30 flex items-center justify-center"
            >
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsVideoPlaying(true)}
                className="bg-orange-600 text-white p-4 rounded-full"
              >
                <Play className="w-12 h-12" />
              </motion.button>
              <p className="text-white absolute bottom-4">
                Watch HLA Promo Video
              </p>
            </motion.div>
          ) : (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute inset-0"
            >
              {/* Placeholder for actual video integration */}
              <div className="w-full h-full bg-gray-800 flex items-center justify-center text-white">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsVideoPlaying(false)}
                  className="absolute top-4 right-4 bg-white/20 p-2 rounded-full"
                >
                  <PauseIcon className="w-6 h-6 text-white" />
                </motion.button>
                Video Content Placeholder
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
}