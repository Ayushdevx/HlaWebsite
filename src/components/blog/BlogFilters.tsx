import React from 'react';
import { motion } from 'framer-motion';
import Badge from '../ui/Badge';

interface BlogFiltersProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

export default function BlogFilters({ selectedCategory, onCategoryChange }: BlogFiltersProps) {
  const categories = [
    'All',
    'Poetry',
    'Stories',
    'Essays',
    'Reviews',
    'Interviews'
  ];

  return (
    <div className="flex gap-2 overflow-x-auto pb-2">
      {categories.map((category, index) => (
        <motion.button
          key={category}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onCategoryChange(category)}
          className={`px-4 py-2 rounded-full transition-colors ${
            selectedCategory === category
              ? 'bg-orange-600 text-white'
              : 'bg-white/50 backdrop-blur-sm hover:bg-white/80'
          }`}
        >
          {category}
          {category !== 'All' && (
            <Badge variant="secondary" className="ml-2">
              {Math.floor(Math.random() * 20) + 1}
            </Badge>
          )}
        </motion.button>
      ))}
    </div>
  );
}