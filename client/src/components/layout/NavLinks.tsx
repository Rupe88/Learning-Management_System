import React from 'react';
import { Link } from 'react-router-dom';

interface NavLinksProps {
  mobile?: boolean;
}

const NavLinks: React.FC<NavLinksProps> = ({ mobile }) => {
  const baseClasses = mobile
    ? "text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
    : "text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400";

  return (
    <>
      <Link to="/courses" className={baseClasses}>Courses</Link>
      <Link to="/about" className={baseClasses}>About</Link>
      <Link to="/pro" className={baseClasses}>Pro</Link>
      <Link to="/blog" className={baseClasses}>Blog</Link>
    </>
  );
};

export default NavLinks;