import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, BookOpen, Users, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from './ui/Button';

export default function Hero() {
  const features = [
    {
      icon: <BookOpen className="h-8 w-8 text-orange-600" />,
      title: "Write & Share",
      description: "Share your literary creations with our vibrant community"
    },
    {
      icon: <Users className="h-8 w-8 text-orange-600" />,
      title: "Connect",
      description: "Join discussions with fellow Hindi literature enthusiasts"
    },
    {
      icon: <Calendar className="h-8 w-8 text-orange-600" />,
      title: "Events",
      description: "Participate in workshops, competitions, and literary discussions"
    }
  ];

  return (
    <div className="relative min-h-screen">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1585779034823-7e9ac8faec70?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-10"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            हिंदी साहित्य संघ
            <span className="block text-2xl md:text-3xl mt-2 text-orange-600">
              Hindi Literary Association
            </span>
          </h1>
          
          <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
            Celebrating the richness of Hindi literature through community, creativity, and cultural exchange.
          </p>

          <div className="mt-10 flex justify-center gap-4">
            <Link to="/join">
              <Button size="lg" className="transform hover:scale-105">
                Join Us <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/blogs">
              <Button variant="outline" size="lg" className="transform hover:scale-105">
                Explore Blogs
              </Button>
            </Link>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className="bg-white/80 backdrop-blur-sm p-6 rounded-lg shadow-md hover:shadow-lg transition-all"
            >
              <div className="flex flex-col items-center text-center">
                {feature.icon}
                <h3 className="mt-4 text-xl font-semibold text-gray-900">{feature.title}</h3>
                <p className="mt-2 text-gray-600">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}