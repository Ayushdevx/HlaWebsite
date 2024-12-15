import React from 'react';
import { Link } from 'react-router-dom';

interface NavLinkProps {
  to: string;
  active: boolean;
  children: React.ReactNode;
}

export function NavLink({ to, active, children }: NavLinkProps) {
  return (
    <Link
      to={to}
      className={`${
        active ? 'text-orange-600' : 'text-gray-700'
      } hover:text-orange-600 transition-colors`}
    >
      {children}
    </Link>
  );
}

export function MobileNavLink({ to, active, children }: NavLinkProps) {
  return (
    <Link
      to={to}
      className={`block px-3 py-2 ${
        active ? 'text-orange-600' : 'text-gray-700'
      } hover:text-orange-600 transition-colors`}
    >
      {children}
    </Link>
  );
}