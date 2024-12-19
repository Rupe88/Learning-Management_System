import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BookOpen, Facebook, Twitter, Instagram, Linkedin, Youtube } from 'lucide-react';
import type { FooterSection } from '../../types';

const footerSections: FooterSection[] = [
  {
    title: 'Company',
    links: [
      { title: 'About Us', href: '/about' },
      { title: 'Careers', href: '/careers' },
      { title: 'Blog', href: '/blog' },
      { title: 'Press', href: '/press' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { title: 'Documentation', href: '/docs' },
      { title: 'Help Center', href: '/help' },
      { title: 'Community', href: '/community' },
      { title: 'Partners', href: '/partners' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { title: 'Privacy Policy', href: '/privacy' },
      { title: 'Terms of Service', href: '/terms' },
      { title: 'Cookie Policy', href: '/cookies' },
      { title: 'Security', href: '/security' },
    ],
  },
];

const socialLinks = [
  { icon: Facebook, href: '#' },
  { icon: Twitter, href: '#' },
  { icon: Instagram, href: '#' },
  { icon: Linkedin, href: '#' },
  { icon: Youtube, href: '#' },
];

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-50 dark:bg-gray-900 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center space-x-2 mb-6">
              <BookOpen className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              <span className="text-xl font-bold text-gray-900 dark:text-white">DigiGurukul </span>
            </Link>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Empowering developers worldwide with high-quality education and practical skills for success in the tech industry.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={index}
                    href={social.href}
                    whileHover={{ y: -3 }}
                    className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
                  >
                    <Icon className="h-5 w-5" />
                  </motion.a>
                );
              })}
            </div>
          </div>

          {/* Links Sections */}
          {footerSections.map((section, index) => (
            <div key={index}>
              <h3 className="text-gray-900 dark:text-white font-semibold mb-4">
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link
                      to={link.href}
                      className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                    >
                      {link.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-200 dark:border-gray-700 pt-8">
          <p className="text-center text-gray-600 dark:text-gray-400">
            © {new Date().getFullYear()} DigiGurukul . All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;