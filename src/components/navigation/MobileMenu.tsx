import React from 'react';
import { MobileNavLink } from './NavLink';

interface MobileMenuProps {
  isActive: (path: string) => boolean;
}

export default function MobileMenu({ isActive }: MobileMenuProps) {
  return (
    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
      <MobileNavLink to="/" active={isActive('/')}>Home</MobileNavLink>
      <MobileNavLink to="/about" active={isActive('/about')}>About</MobileNavLink>
      <MobileNavLink to="/blogs" active={isActive('/blogs')}>Blogs</MobileNavLink>
      <MobileNavLink to="/events" active={isActive('/events')}>Events</MobileNavLink>
      <MobileNavLink to="/community" active={isActive('/community')}>Community</MobileNavLink>
      <MobileNavLink to="/join" active={isActive('/join')}>Join HLA</MobileNavLink>
    </div>
  );
}