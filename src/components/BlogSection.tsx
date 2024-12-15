import React from 'react';
import BlogCard from './BlogCard';

export default function BlogSection() {
  const blogs = [
    {
      title: "आधुनिक हिंदी कविता का विकास",
      author: "रमेश कुमार",
      excerpt: "आधुनिक हिंदी कविता में नई विचारधाराओं का समावेश और उनका प्रभाव...",
      image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80"
    },
    {
      title: "हिंदी साहित्य में नारी विमर्श",
      author: "सुनीता शर्मा",
      excerpt: "समकालीन हिंदी साहित्य में महिला लेखन की भूमिका और महत्व...",
      image: "https://images.unsplash.com/photo-1516414447565-b14be0adf13e?auto=format&fit=crop&q=80"
    },
    {
      title: "कहानी लेखन की कला",
      author: "अमित वर्मा",
      excerpt: "एक अच्छी कहानी कैसे लिखें? कहानी लेखन की मूल बातें...",
      image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&q=80"
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12">
          Featured Blogs
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog, index) => (
            <BlogCard key={index} {...blog} />
          ))}
        </div>
      </div>
    </section>
  );
}