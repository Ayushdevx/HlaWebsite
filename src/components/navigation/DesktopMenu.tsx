import React from 'react';
import { Link } from 'react-router-dom';
import { NavLink } from './NavLink';

interface DesktopMenuProps {
  isActive: (path: string) => boolean;
}

export default function DesktopMenu({ isActive }: DesktopMenuProps) {
  return (
    <div className="hidden md:flex items-center space-x-8">
      <NavLink to="/" active={isActive('/')}>Home</NavLink>
      <NavLink to="/about" active={isActive('/about')}>About</NavLink>
      <NavLink to="/blogs" active={isActive('/blogs')}>Blogs</NavLink>
      <NavLink to="/events" active={isActive('/events')}>Events</NavLink>
      <NavLink to="/community" active={isActive('/community')}>Community</NavLink>
      <Link 
        to="/join"
        className="bg-orange-600 text-white px-4 py-2 rounded-md hover:bg-orange-700 transition-colors"
      >
        Join HLA
      </Link>
    </div>
  );
}